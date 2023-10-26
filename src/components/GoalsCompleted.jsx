"use client";

import { useState, useEffect } from "react";
import { getUserGoals } from "@/Backend/Goal";
import styles from "./TopCard.module.css";

export default function GoalsCompleted({ User }) {
  const [userGoals, setUserGoals] = useState([]);
  let completedGoals = 0;

  useEffect(() => {
    async function getCompletedGoals() {
      const [existingGoals] = await Promise.all([getUserGoals(User)]);
      setUserGoals(existingGoals);
    }

    getCompletedGoals();
  }, [User]);

  for (let i = 0; i < userGoals.length; i++) {
    if (userGoals[i].isComplete === true) {
      completedGoals++;
    }
  }

  return (
    <>
      <div className={`${styles.topCards} bg-amber-300`}>
        <div>
          <p>Completed Goals: {completedGoals}</p>
          <p></p>
        </div>
      </div>
    </>
  );
}
