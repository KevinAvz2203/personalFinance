"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import { getUserFavoriteGoals } from "@/Backend/Goal";
import styles from "./FavGoals.module.css";

Chart.register(ArcElement, Tooltip, Legend);

type IncomeData = {
  User: number;
};

type FavoriteGoals = {
  id: number;
  name: string;
  totalAmount: number;
  currentAmount: number;
};

export default function FavGoals({ User }: IncomeData) {
  const [userGoals, setUserGoals] = useState<FavoriteGoals[]>([]);

  useEffect(() => {
    async function getFavoriteGoalsProgress() {
      const existingGoals = await getUserFavoriteGoals(User);
      setUserGoals(existingGoals);
    }

    getFavoriteGoalsProgress();
  }, [User]);

  return (
    <>
      <div className={styles.mainGoals}>
        {userGoals.map((goal) => (
          <div key={goal.id}>
            <Doughnut
              data={{
                labels: ["Saved", "Remaining"],
                datasets: [
                  {
                    data: [
                      goal.currentAmount,
                      goal.totalAmount - goal.currentAmount,
                    ],
                    backgroundColor: ["#336699", "#99CCFF"],
                    borderColor: "#D1D6DC",
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
                rotation: -90,
                circumference: 180,
                cutout: "60%",
                maintainAspectRatio: false,
                responsive: true,
              }}
            />
            <p className="text-center text-2xl">{goal.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/* import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const MainGoals = () => (
  <>
    <div className="header">
      <h1 className="title">Half Doughnut Chart</h1>
    </div>
    <Doughnut
      data={data}
      options={{ rotation: 0.5 * Math.PI, circumference: 1 * Math.PI }}
    />
  </>
);

export default MainGoals; */
