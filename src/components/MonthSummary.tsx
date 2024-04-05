import { getTotalPerCategory } from "@/Backend/Transaction";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useState, useEffect, useCallback } from "react";
import { Doughnut } from "react-chartjs-2";
import styles from "./Month.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

/* Types declaration */
type IncomeData = {
  User: number;
};

interface TotalPerCategory {
  _sum: {
    amount: number;
  };
  categoryId: number;
}

type DataState = {
  Weekly: TotalPerCategory[] | null;
  Monthly: TotalPerCategory[] | null;
};
/* ================= */

/* Existing categories */
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

const MonthSummary = ({ User }: IncomeData) => {
  /* States declarations */
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState<"Weekly" | "Monthly">(
    "Weekly"
  );

  /* State that stores the total amount expend with its corresponding weekDays */
  const [data, setData] = useState<DataState>({
    Weekly: null,
    Monthly: null,
  });

  const handleClick = useCallback((button: "Weekly" | "Monthly") => {
    setActiveButton(button);
  }, []);

  const fetchCategoryMonthSummary = useCallback(
    async (period: "Weekly" | "Monthly") => {
      try {
        /* Fetching transactions from backend based on the period specified */
        const transPerCat: TotalPerCategory[] = await getTotalPerCategory(
          User,
          period
        );
        let gastos: number[] = new Array(cateNames.length).fill(0);

        transPerCat.forEach((transaction) => {
          let index = transaction.categoryId - 2;
          let amount = Math.abs(transaction._sum.amount);
          gastos[index] = amount;
        });

        /* Update data with corresponding transactions */
        setData((prevData) => ({ ...prevData, [period]: gastos }));
        setIsLoading(false);
      } catch (error) {
        /* Future modification to add a UI update */
        console.error("Error fetching category month summary:", error);
      }
    },
    [User]
  );

  useEffect(() => {
    /* Fetch data ccorresponding on which button is pressed
    and if it hasn't been pressed before */
    if (!data[activeButton]) {
      fetchCategoryMonthSummary(activeButton);
    }
  }, [fetchCategoryMonthSummary, activeButton, data]);

  return (
    <>
      <div className={styles.monthGraphs}>
        <div className={styles.header}>
          <div>
            <p>Transactions</p>
            <h2>Per Category</h2>
          </div>
          <div className={styles.buttons}>
            {["Weekly", "Monthly"].map((button) => (
              <button
                key={button}
                className={activeButton === button ? styles.active : ""}
                onClick={() => handleClick(button as "Weekly" | "Monthly")}
              >
                {button}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.pieChart}>
          {data[activeButton] && (
            <Doughnut
              data={{
                labels: cateNames,
                datasets: [
                  {
                    label: "Total spend",
                    data: data[activeButton]?.map((expense) => expense),
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
              }}
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
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(MonthSummary);
