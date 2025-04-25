import { getUserGoals } from "@/Backend/Goal";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getTotalSavedGoals } from "@/Backend/Goal";
import styles from "./Goals.module.css";

type IncomeData = {
  User: number;
};

type GoalsTotalSavedType = {
  totalGoalsAmount: number;
  totalSaved: number;
};

interface GoalData {
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

export default function GoalsTable({ User }: IncomeData) {
  const [userGoals, setUserGoals] = useState<GoalData[]>([]);

  /* State that saves the goals data */
  const [goalsTotalSaved, setGoalsTotalSaved] = useState<GoalsTotalSavedType>({
    totalGoalsAmount: 0,
    totalSaved: 0,
  });

  useEffect(() => {
    async function getSingleUserGoals() {
      const [existingGoals, savingTotal] = await Promise.all([
        getUserGoals(User.toString()),
        getTotalSavedGoals(User),
      ]);
      setUserGoals(existingGoals);
      setGoalsTotalSaved(savingTotal);
    }

    getSingleUserGoals();
  }, [User]);

  return (
    <>
      <div className={styles.goalsContainer}>
        <div className={styles.header}>
          <div>
            <p>Goals</p>
            <h2>Active Goals</h2>
          </div>
          <div>
            <p>Saved - MXN</p>
            <h2>
              ${goalsTotalSaved.totalSaved} of $
              {goalsTotalSaved.totalGoalsAmount}
            </h2>
          </div>
        </div>

        <div className={styles.goalsTable}>
          {userGoals.map(
            (goal) =>
              goal.isComplete == false && (
                <div className={styles.goalInstance} key={goal.id}>
                  <div className={styles.goalTitle}>
                    <p>
                      {goal.name}{" "}
                      <Link href={"/addGoal/" + goal.id}>
                        <button> - edit</button>
                      </Link>
                    </p>
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
              )
          )}
        </div>
      </div>
    </>
  );
}
