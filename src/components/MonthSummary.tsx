/* import { getCategories } from "@/Backend/Category"; */
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

const cateNames = [
  "Home",
  "Food",
  "Services",
  "Health",
  "Pets",
  "Transportation",
  "Entertainment",
  "Personal",
  "Other",
];

export default function MonthSummary({ User }: IncomeData) {
  const [pieChartData, setPieChartData] = useState<PieChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function fetchCategoryMonthSummary() {
      try {
        const transPerCat: TotalPerCategory[] = await getTotalPerCategory(User);
        let gastos: number[] = new Array(cateNames.length).fill(0);

        transPerCat.forEach((transaction) => {
          let index = transaction.categoryId - 2;
          let amount = Math.abs(transaction._sum.amount);
          gastos[index] = amount;
        });

        setPieChartData({
          labels: cateNames,
          datasets: [
            {
              label: "Total spend",
              data: gastos,
              backgroundColor: [
                "rgba(19, 64, 116, 1)",
                "rgba(19, 49, 92, 1)",
                "rgba(11, 37, 69, 1)",
                "rgba(141, 169, 196, 1)",
                "rgba(238, 244, 237, 1)",
                "rgba(241, 255, 235, 1)",
                "rgba(240, 235, 216, 1)",
                "rgba(201, 232, 196, 1)",
                "rgba(203, 207, 201, 1)",
              ],
              borderColor: [
                "rgba(19, 64, 116, 0.2)",
                "rgba(19, 49, 92, 0.2)",
                "rgba(11, 37, 69, 0.2)",
                "rgba(141, 169, 196, 0.2)",
                "rgba(238, 244, 237, 0.2)",
                "rgba(241, 255, 235, 0.2)",
                "rgba(240, 235, 216, 0.2)",
                "rgba(201, 232, 196, 0.2)",
                "rgba(203, 207, 201, 0.2)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching category month summary:", error);
        // Handle error gracefully, e.g., show a message to the user
      }
    }

    fetchCategoryMonthSummary();
  }, [User]);

  return (
    <>
      <div className={styles.monthGraphs}>
        <div className={styles.header}>
          <div>
            <p>Transactions</p>
            <h2>Per Category</h2>
          </div>
          <div className={styles.buttons}>
            <button className={styles.active}>Weekly</button>
            <button>Monthly</button>
          </div>
        </div>
        <div className={styles.pieChart}>
          <Doughnut
            data={pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right",
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </>
  );
}
