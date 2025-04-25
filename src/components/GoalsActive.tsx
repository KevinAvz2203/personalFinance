"use client";

import { useState, useEffect } from "react";
import { getUserGoals } from "@/Backend/Goal";
import styles from "./TopCard.module.css";

type IncomeData = {
  User: number;
};

interface UserGoals {
  id: number;
  name: string;
  totalAmount: number;
  currentAmount: number | null;
  isComplete: boolean;
  isFavorite: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

export default function GoalsActive({ User }: IncomeData) {
  const [userGoals, setUserGoals] = useState<UserGoals[]>([]);
  let activeGoals = 0;

  useEffect(() => {
    async function getCompletedGoals() {
      const [existingGoals]: any[] = await Promise.all([
        getUserGoals(User.toString()),
      ]);
      setUserGoals(existingGoals);
    }

    getCompletedGoals();
  }, [User]);

  for (let i = 0; i < userGoals.length; i++) {
    if (userGoals[i].isComplete === false) {
      activeGoals++;
    }
  }

  return (
    <>
      <div className={`${styles.topCards} bg-amber-300`}>
        <div>
          <p>Active Goals: {activeGoals}</p>
          <p></p>
        </div>
      </div>
    </>
  );
}
