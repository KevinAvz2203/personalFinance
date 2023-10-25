"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import { getUserFavoriteGoals } from "@/Backend/Goal";

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

export default function MainGoals({ User }: IncomeData) {
  const [userGoals, setUserGoals] = useState<FavoriteGoals[]>([]);

  useEffect(() => {
    async function getFavoriteGoalsProgress() {
      const [existingGoals]: any[] = await Promise.all([
        getUserFavoriteGoals(User),
      ]);
      setUserGoals(existingGoals);
    }

    getFavoriteGoalsProgress();
  }, [User]);

  return (
    <>
      <div className="mainGoals">
        {userGoals.map((goal) => (
          <div key={goal.id}>
            <Doughnut
              className=""
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
