import { getPrevMonths } from "@/Backend/Transaction";
import { getCategories } from "@/Backend/Category";
import { useState, useEffect, useCallback } from "react";
import styles from "./ExpPerCategory.module.css";
import ProgressBar from "@/components/ProgressBar";

type IncomeData = {
  User: number;
};

interface Category {
  id: number;
  name: string;
}

interface PrevMonthsTransaction {
  month: number;
  Categoria: string;
  total_amount: number;
}

let roundedExpense: number = 0;

const WEIGHTS = [0.1, 0.2, 0.3, 0.4, 0.5];

function weightedMovingAverage(data: number[], weights: number[]) {
  const weightedSum = data.reduce(
    (acc, value, index) => acc + value * weights[index],
    0
  );
  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);

  return weightedSum / totalWeight;
}

export default function ExpPerCategoryExpected({ User }: IncomeData) {
  const [categoriesLabels, setCategoriesLabels] = useState<string[]>([]);
  const [gastosPrevistos, setGastosPrevistos] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      // Fetch categories
      const categories: Category[] = await getCategories();
      const prevMonthsTransaction: PrevMonthsTransaction[] =
        await getPrevMonths(User);

      const filteredCategories = categories.filter(
        (cate) => cate.name !== "Income"
      );

      const multiArray: number[][] = Array.from({ length: 9 }, () => []);

      prevMonthsTransaction.forEach((transaction) => {
        const index = Number(transaction.Categoria) - 2;
        if (index >= 0 && index < multiArray.length) {
          multiArray[index].push(transaction.total_amount);
        }
      });

      const gastosPrevistos = multiArray.map((data) =>
        Math.abs(Math.ceil(weightedMovingAverage(data, WEIGHTS)))
      );

      const maxExpense: number = Math.max(...gastosPrevistos);
      roundedExpense = Math.ceil(maxExpense / 1000) * 1000;

      // Sort gastos with their corresponding categories:
      const sortedGastosWithCategories = gastosPrevistos
        .map((gasto, index) => ({
          gasto,
          category: filteredCategories[index],
        }))
        .sort((a, b) => b.gasto - a.gasto);

      const gastosSorted = sortedGastosWithCategories.map(({ gasto }) => gasto);
      const categoriesLabelsSorted = sortedGastosWithCategories.map(
        ({ category }) => category.name
      );

      setCategoriesLabels(categoriesLabelsSorted);
      setGastosPrevistos(gastosSorted);
      setLoading(false);
    } catch (error) {
      setError("Error feching data");
      setLoading(false);
    }
  }, [User]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className={styles.cashFlow}>
        <div className={styles.header}>
          <div>
            <p>Stadistics</p>
            <h2>Upcoming Month Expectation</h2>
          </div>
        </div>
        <div className={styles.barChart}>
          {categoriesLabels.map((category, index) => (
            <div className={styles.goalInstance} key={index}>
              <div className={styles.goalTitle}>
                <p>{category}</p>
                <p>{gastosPrevistos[index].toString()} MXN</p>
              </div>

              <ProgressBar
                key={index}
                completed={(
                  (Number(gastosPrevistos[index]) / Number(roundedExpense)) *
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
