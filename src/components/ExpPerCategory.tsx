import { getTotalPerCategory } from "@/Backend/Transaction";
import { getCategories } from "@/Backend/Category";
import { useState, useEffect, useCallback } from "react";
import ProgressBar from "@/components/ProgressBar";
import styles from "./ExpPerCategory.module.css";

type IncomeData = {
  User: number;
};

interface Category {
  id: number;
  name: string;
}

interface TotalPerCategory {
  _sum: {
    amount: number;
  };
  categoryId: number;
}

let roundedExpense: number = 0;

export default function ExpPerCategory({ User }: IncomeData) {
  const [expensesData, setExpensesData] = useState<number[]>([]);
  const [categoriesLabels, setCategoriesLabels] = useState<String[]>([]);

  /* ===================== */
  const getCateMonthSummary = useCallback(async (): Promise<void> => {
    try {
      // Fetch categories and totals
      const categories: Category[] = await getCategories();
      const transPerCat: TotalPerCategory[] = await getTotalPerCategory(User);

      const filteredCategories = categories.filter(
        (cate) => cate.name !== "Income"
      );

      const gastos: number[] = filteredCategories.map((category) => {
        const total = transPerCat.find(
          (trans) => trans.categoryId === category.id
        );
        return total ? Math.abs(total._sum.amount) : 0;
      });

      const maxExpense: number = Math.max(...gastos);
      roundedExpense = Math.ceil(maxExpense / 1000) * 1000;

      // Sort gastos with their corresponding categories:
      const sortedGastosWithCategories = gastos
        .map((gasto, index) => ({
          gasto,
          category: filteredCategories[index],
        }))
        .sort((a, b) => b.gasto - a.gasto);

      const gastosSorted = sortedGastosWithCategories.map(({ gasto }) => gasto);
      const categoriesLabelsSorted = sortedGastosWithCategories.map(
        ({ category }) => category.name
      );

      setExpensesData(gastosSorted);
      setCategoriesLabels(categoriesLabelsSorted);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., show a message to the user
    }
  }, [User]);

  useEffect(() => {
    getCateMonthSummary();
  }, [getCateMonthSummary]);

  return (
    <>
      <div className={styles.cashFlow}>
        <div className={styles.header}>
          <div>
            <p>Stadistics</p>
            <h2>Current Month</h2>
          </div>
          <div className={styles.buttons}>
            <button className={styles.active}>Monthly</button>
            <button>Yearly</button>
          </div>
        </div>
        <div className={styles.barChart}>
          {categoriesLabels.map((category, index) => (
            <div className={styles.goalInstance} key={index}>
              <div className={styles.goalTitle}>
                <p>{category} </p>
                <p>{expensesData[index].toString()} MXN</p>
              </div>

              <ProgressBar
                key={index}
                completed={(
                  (Number(expensesData[index]) / Number(roundedExpense)) *
                  100
                ).toString()}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
