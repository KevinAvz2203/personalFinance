"use client";

import { getUserGoals } from "@/Backend/Goal";
import ProgressBar from "@/components/ProgressBar";
import { useState, useEffect } from "react";

export default function GoalsTable({ User }) {
  const [userGoals, setUserGoals] = useState([]);

  useEffect(() => {
    async function getSingleUserGoals() {
      const [existingGoals] = await Promise.all([getUserGoals(User)]);
      setUserGoals(existingGoals);
    }

    getSingleUserGoals();
  }, [User]);

  return (
    <>
      <div className="tableBox">
        <div className="goalsTable pt-4">
          {userGoals.map((goal, index) => (
            <div className="goalInstance" key={index}>
              <div className="goalTitle">
                <p>{goal.name}</p>
                <p>
                  ${goal.currentAmount} of ${goal.totalAmount} MXN
                </p>
              </div>

              <ProgressBar
                key={goal.id}
                completed={(
                  (Number(goal.currentAmount) / Number(goal.totalAmount)) *
                  100
                ).toFixed(1)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
