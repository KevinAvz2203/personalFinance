"use client";

import { getCategories } from "@/Backend/Category";
import { getTotalPerCategory } from "@/Backend/Transaction";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import styles from "./Month.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

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

interface PieChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export default function MonthSummary({ User }: IncomeData) {
  const [pieChartData, setPieChartData] = useState<PieChartData>({
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

      setPieChartData({
        labels: labels,
        datasets: [
          {
            label: "Total spend",
            data: gastos,
            backgroundColor: [
              "rgba(255, 228, 196, 0.2)",
              "rgba(255, 160, 122, 0.2)",
              "rgba(0, 128, 128, 0.2)",
              "rgba(255, 0, 0, 0.2)",
              "rgba(139, 69, 19, 0.2)",
              "rgba(0, 0, 0, 0.2)",
              "rgba(255, 215, 0, 0.2)",
              "rgba(255, 255, 255, 0.2)",
              "rgba(128, 128, 128, 0.2)",
            ],
            borderColor: [
              "rgba(255, 228, 196, 1)",
              "rgba(255, 160, 122, 1)",
              "rgba(0, 128, 128, 1)",
              "rgba(255, 0, 0, 1)",
              "rgba(139, 69, 19, 1)",
              "rgba(0, 0, 0, 1)",
              "rgba(255, 215, 0, 1)",
              "rgba(255, 255, 255, 1)",
              "rgba(128, 128, 128, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }

    getCateMonthSummary();
  }, [User]);

  return (
    <>
      <div className={styles.monthGraphs}>
        <h1 className="text-2xl p-2" suppressHydrationWarning={true}>
          Expenses from {currMonth}
        </h1>
        <div className="w-full h-full">
          <Doughnut
            data={pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right",
                },
              },
              maintainAspectRatio: true,
            }}
          />
        </div>
      </div>
    </>
  );
}
