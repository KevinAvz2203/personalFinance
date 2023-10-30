"use client";

import { getTotalPerCategory } from "@/Backend/Transaction";
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

interface TotalPerCategory {
  _sum: {
    amount: number;
  };
  categoryId: number;
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

export default function ExpPerCategory({ User }: IncomeData) {
  const [barChartData, setBarChartData] = useState<BarChartData>({
    labels: [],
    datasets: [],
  });
  const currMonth = new Date().toLocaleString([], { month: "long" });

  useEffect(() => {
    async function getCateMonthSummary() {
      const categories: Category[] = await getCategories();
      const transPerCat: TotalPerCategory[] = await getTotalPerCategory(User);

      const filteredCategories = categories.filter(
        (cate) => cate.name !== "Income"
      );
      const labels = filteredCategories.map((cate) => cate.name);

      let gastos: number[] = new Array(labels.length).fill(0);

      for (let j = 0; j < transPerCat.length; j++) {
        gastos[transPerCat[j].categoryId - 2] = Math.abs(
          transPerCat[j]._sum.amount
        );
      }

      setBarChartData({
        labels: labels,
        datasets: [
          {
            label: "Total spend",
            data: gastos,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });
    }

    getCateMonthSummary();
  }, [User]);

  return (
    <>
      <div className={styles.catPerMonth}>
        <h1 className="text-2xl p-2" suppressHydrationWarning={true}>
          Expenses per Categories for {currMonth}
        </h1>
        <div className="w-full h-full">
          <Bar
            options={{
              responsive: true,
              indexAxis: "y",
              elements: {
                bar: {
                  borderWidth: 2,
                },
              },
              maintainAspectRatio: true,
            }}
            data={barChartData}
          />
        </div>
      </div>
    </>
  );
}
