"use client";

import { getPrevMonths } from "@/Backend/Transaction";
import { getCategories } from "@/Backend/Category";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import styles from "./ExpPerCategory.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

export default function ExpPerCategoryExpected({ User }: IncomeData) {
  const [barChartData, setBarChartData] = useState<BarChartData>({
    labels: [],
    datasets: [],
  });

  function weightedMovingAverage(data: number[], weights: number[]) {
    let weightedSum = 0;
    let totalWeight = 0;

    for (let i = 0; i < data.length; i++) {
      weightedSum += data[i] * weights[i];
      totalWeight += weights[i];
    }

    return weightedSum / totalWeight;
  }

  useEffect(() => {
    async function fetchData() {
      const categories: Category[] = await getCategories();
      const prevMonthsTransaction: PrevMonthsTransaction[] =
        await getPrevMonths(User);

      const filteredCategories = categories.filter(
        (cate) => cate.name !== "Income"
      );

      const multiArray: number[][] = [[], [], []];
      for (let j = 0; j < prevMonthsTransaction.length; j++) {
        multiArray[Number(prevMonthsTransaction[j].Categoria) - 2].push(
          prevMonthsTransaction[j].total_amount
        );
      }

      const weights = [0.1, 0.2, 0.3, 0.4, 0.5];
      const gastosPrevistos = multiArray.map((data) => {
        const weightedAverage = weightedMovingAverage(data, weights);
        return Math.abs(weightedAverage);
      });

      const labels = filteredCategories.map((cate) => cate.name);

      setBarChartData({
        labels: labels,
        datasets: [
          {
            label: "Total spend",
            data: gastosPrevistos,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });
    }

    fetchData();
  }, [User]);

  return (
    <>
      <div className={styles.catPerMonth}>
        <h1 className="text-2xl p-2">Expected expenses for next Month</h1>
        <div className="w-full h-full">
          <Bar
            options={{
              indexAxis: "y",
              elements: {
                bar: {
                  borderWidth: 2,
                },
              },
              responsive: true,
              maintainAspectRatio: true,
            }}
            data={barChartData}
          />
        </div>
      </div>
    </>
  );
}
