"use client";

import { getPrevMonths } from "@/Backend/Transaction";
import { getCategories } from "@/Backend/Category";
import { useState, useEffect, useCallback } from "react";
import styles from "./ExpPerCategory.module.css";
import ProgressBar from "@/components/ProgressBar";
import {
  filterCategories,
  calculateRoundedExpense,
  sortGastosWithCategories,
  extractSortedData,
} from "@/utils/ExpPerCategory_HelperFunctions";

// Define types and interfaces
type IncomeData = {
  User: number;
};

interface Category {
  id: number;
  name: string;
}

type PrevMonthsTransaction = {
  month: number;
  categoria: string;
  total_amount: number;
};

interface ExpectedData {
  expenses: number[];
  categories: String[];
  roundedTotal: number;
}

// Define weights for weighted moving average function
const WEIGHTS = [0.1, 0.2, 0.3, 0.4, 0.5];

// Calculate weighted moving average
function weightedMovingAverage(data: number[]) {
  const weightedSum = data.reduce(
    (acc, value, index) => acc + value * WEIGHTS[index],
    0
  );
  const totalWeight = WEIGHTS.reduce((acc, weight) => acc + weight, 0);

  return weightedSum / totalWeight;
}

// Main component function
export default function ExpPerCategoryExpected({ User }: IncomeData) {
  const [expectedData, setExpectedData] = useState<ExpectedData>({
    expenses: [],
    categories: [],
    roundedTotal: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);

  // Group transactions by category
  const groupTransactionsByCategory = (
    prevMonthsTransaction: PrevMonthsTransaction[]
  ) => {
    const multiArray: number[][] = Array.from({ length: 9 }, () => []);

    // Iterate over each transaction in the prevMonthsTransaction array
    prevMonthsTransaction.forEach((transaction) => {
      // Calculate the index based on the value of transaction.Categoria and subtract 2 (because our transaction.Categoria starts from 2, and out array index at 0)
      const index = Number(transaction.categoria) - 2;

      // Check if the calculated index is within the bounds of multiArray
      if (index >= 0 && index < multiArray.length) {
        // Push the total_amount of the transaction into the corresponding Category sub-index of multiArray
        multiArray[index].push(transaction.total_amount);
      }
    });

    // Returns a 2D array with the transaction total for the prev 5 months of each category
    return multiArray;
  };

  // Calculate expected expenses using weighted moving average for each category
  const calculateExpectedExpenses = (multiArray: number[][]) => {
    return multiArray.map((data) =>
      Math.abs(Math.ceil(weightedMovingAverage(data)))
    );
  };

  // Fetch data from backend when component mounts or User prop changes
  const fetchData = useCallback(async () => {
    try {
      // Fetch categories from backend
      const categories: Category[] = await getCategories();
      // Fetch previous months transactions from backend
      const prevMonthsTransaction: PrevMonthsTransaction[] =
        await getPrevMonths(User.toString());

      // Filter out 'Income' category
      const filteredCategories = filterCategories(categories);

      // Group transactions by category
      const multiArray = groupTransactionsByCategory(prevMonthsTransaction);

      // Calculate expected expenses using weighted moving average
      const gastosPrevistos = calculateExpectedExpenses(multiArray);

      // Calculate max value for the Progress Bar limit
      const roundedExpense = calculateRoundedExpense(gastosPrevistos);

      // Sort expenses with corresponding categories
      const sortedGastosWithCategories = sortGastosWithCategories(
        gastosPrevistos,
        filteredCategories
      );

      // Extract sorted expenses and categories
      const { gastosSorted, categoriesLabelsSorted } = extractSortedData(
        sortedGastosWithCategories
      );

      // Store fetched data
      setExpectedData({
        expenses: gastosSorted,
        categories: categoriesLabelsSorted,
        roundedTotal: roundedExpense,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [User]);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts or User prop changes
  }, [fetchData]);

  // Render UI
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
          {/* Render each category with its expected expense and progress bar */}
          {expectedData.categories.map((category, index) => (
            <div className={styles.goalInstance} key={index}>
              <div className={styles.goalTitle}>
                <p>{category}</p>
                <p>{expectedData.expenses[index].toString()} MXN</p>
              </div>

              <ProgressBar
                key={index}
                completed={(
                  (Number(expectedData.expenses[index]) /
                    Number(expectedData.roundedTotal)) *
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
