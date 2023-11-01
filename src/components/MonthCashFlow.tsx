"use client";

import { getPerDate } from "@/Backend/Transaction";
import styles from "./Month.module.css";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type IncomeData = {
  User: number;
};

interface TransactionsByDate {
  createdAt: Date;
  typeId: number;
  amount: number;
}

interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

const labels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function MonthCashFlow({ User }: IncomeData) {
  const [lineChartData, setLineChartData] = useState<LineChartData>({
    labels: [],
    datasets: [],
  });
  const currMonth = new Date().toLocaleString([], { month: "long" });
  const monthNum = new Date().getMonth();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    maintainAspectRatio: true,
  } as const;

  useEffect(() => {
    async function getMonthCashflow() {
      let expenses = [0, 0, 0, 0, 0, 0, 0];
      let incomes = [0, 0, 0, 0, 0, 0, 0];

      const perDate: TransactionsByDate[] = await getPerDate(User);

      for (let i = 0; i < perDate.length; i++) {
        const d = new Date(perDate[i].createdAt);
        const dayOfWeekDigit: number = d.getDay();
        const isCurrentMonth: boolean = monthNum == d.getMonth();

        if (isCurrentMonth) {
          const amountToAdd =
            perDate[i].typeId == 1
              ? perDate[i].amount
              : Math.abs(perDate[i].amount);

          if (perDate[i].typeId == 1) {
            incomes[dayOfWeekDigit] += amountToAdd;
          } else {
            expenses[dayOfWeekDigit] += amountToAdd;
          }
        }
      }

      setLineChartData({
        labels: labels,
        datasets: [
          {
            label: "Incomes",
            data: incomes.map((income) => income),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          {
            label: "Expenses",
            data: expenses.map((expense) => expense),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    }

    getMonthCashflow();
  }, [User, monthNum]);

  return (
    <>
      <div className={styles.cashFlow}>
        <h1 className="text-2xl p-2" suppressHydrationWarning={true}>
          My Cashflow of {currMonth}
        </h1>
        <div style={{ width: "100%", height: "100%" }}>
          <Line options={options} data={lineChartData} />
        </div>
      </div>
    </>
  );
}
