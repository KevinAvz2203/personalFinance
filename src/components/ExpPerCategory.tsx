import { getTotalPerCategory } from "@/Backend/Transaction";
import { getCategories } from "@/Backend/Category";
import { useState, useEffect, useCallback } from "react";
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
    backgroundColor: string;
    borderColor: string;
    hoverBackgroundColor: string;
    borderRadius: { topRight: number; topLeft: number };
  }[];
}

export default function ExpPerCategory({ User }: IncomeData) {
  const [barChartData, setBarChartData] = useState<BarChartData>({
    labels: [],
    datasets: [],
  });

  /* ===================== */
  let delayed: any;
  const options = {
    responsive: true,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context: any) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          callback: function (value: any, index: any, values: any) {
            return value / 1000 + "K";
          },
        },
        border: {
          dash: [10, 5],
        },
      },
    },
    plugins: {
      tooltip: {
        yAlign: "bottom",
      },
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  } as const;

  /* ===================== */
  const getCateMonthSummary = useCallback(async (): Promise<void> => {
    try {
      // Fetch categories and totals
      const categories: Category[] = await getCategories();
      const transPerCat: TotalPerCategory[] = await getTotalPerCategory(User);

      const filteredCategories = categories.filter(
        (cate) => cate.name !== "Income"
      );
      const labels = filteredCategories.map((cate) => cate.name);

      const gastos: number[] = filteredCategories.map((category) => {
        const total = transPerCat.find(
          (trans) => trans.categoryId === category.id
        );
        return total ? Math.abs(total._sum.amount) : 0;
      });

      setBarChartData({
        labels: labels,
        datasets: [
          {
            label: "Total",
            data: gastos,
            borderColor: "rgba(141, 169, 196, 0.4)",
            backgroundColor: "#8DA9C4",
            hoverBackgroundColor: "#134074",
            borderRadius: { topRight: 10, topLeft: 10 },
          },
        ],
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
          <div className={styles.buttons}>
            <button className={styles.active}>Monthly</button>
            <button>Yearly</button>
          </div>
        </div>
        <div className={styles.barChart}>
          <Bar options={options} data={barChartData} />
        </div>
      </div>
    </>
  );
}
