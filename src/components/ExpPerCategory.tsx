import { getTotalPerCategory } from "@/Backend/Transaction";
import { getCategories } from "@/Backend/Category";
import { useState, useEffect, useCallback } from "react";
import ProgressBar from "@/components/ProgressBar";
import styles from "./ExpPerCategory.module.css";
import {
  filterCategories,
  calculateRoundedExpense,
  sortGastosWithCategories,
  extractSortedData,
} from "@/utils/ExpPerCategory_HelperFunctions";

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

interface ExpenseData {
  expenses: number[];
  categories: String[];
  roundedTotal: number;
}

export default function ExpPerCategory({ User }: IncomeData) {
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    expenses: [],
    categories: [],
    roundedTotal: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);

  const getGastosUnsorted = (
    filteredCategories: Category[],
    transPerCat: TotalPerCategory[]
  ) => {
    const gastos: number[] = filteredCategories.map((category) => {
      const total = transPerCat.find(
        (trans) => trans.categoryId === category.id
      );
      return total ? Math.abs(total._sum.amount) : 0;
    });

    return gastos;
  };

  const getCateMonthSummary = useCallback(async () => {
    try {
      // Fetch categories and totals
      const categories: Category[] = await getCategories();
      // Fetch Total per Category from backend
      const transPerCat: TotalPerCategory[] = await getTotalPerCategory(
        User,
        "Monthly"
      );

      // Filter out 'Income' category
      const filteredCategories = filterCategories(categories);

      // Creates an array of Unsorted gastos
      const gastos = getGastosUnsorted(filteredCategories, transPerCat);

      // Calculate max value for the Progress Bar limit
      const roundedExpense = calculateRoundedExpense(gastos);

      // Sort expenses with corresponding categories
      const sortedGastosWithCategories = sortGastosWithCategories(
        gastos,
        filteredCategories
      );

      // Extract sorted expenses and categories
      const { gastosSorted, categoriesLabelsSorted } = extractSortedData(
        sortedGastosWithCategories
      );

      setExpenseData({
        expenses: gastosSorted,
        categories: categoriesLabelsSorted,
        roundedTotal: roundedExpense,
      });
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
        </div>
        <div className={styles.barChart}>
          {expenseData.categories.map((category, index) => (
            <div className={styles.goalInstance} key={index}>
              <div className={styles.goalTitle}>
                <p>{category} </p>
                <p>{expenseData.expenses[index].toString()} MXN</p>
              </div>

              <ProgressBar
                key={index}
                completed={(
                  (Number(expenseData.expenses[index]) /
                    Number(expenseData.roundedTotal)) *
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
