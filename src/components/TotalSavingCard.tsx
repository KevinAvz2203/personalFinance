"use client";

import Image from "next/image";
import totalSavingsIcon from "/public/assets/icons/totalSavingsIcon.png";
import { getTotalSavedGoals } from "@/Backend/Goal";
import { useEffect, useState } from "react";
import styles from "./TopCard.module.css";

type incomeData = {
  User: number;
};

interface userSumGoals {
  totalSaved: number;
  totalGoalsAmount: number;
}

export default function TotalSavingCard({ User }: incomeData) {
  const [goalsTotalSaved, setGoalsTotalSaved] = useState<userSumGoals>({
    totalGoalsAmount: 0,
    totalSaved: 0,
  });

  useEffect(() => {
    async function fetchGoalsData() {
      const data = await getTotalSavedGoals(User);
      setGoalsTotalSaved(data);
    }

    fetchGoalsData();
  }, [User]);

  return (
    <>
      <div className={`${styles.topCards} bg-amber-300`}>
        <Image
          src={totalSavingsIcon}
          alt="T Savings Icon Icon"
          width={50}
          height={50}
        />
        <div>
          <p>
            ${goalsTotalSaved.totalSaved || 0} of $
            {goalsTotalSaved.totalGoalsAmount || 0} MXN
          </p>
          <p>Total Savings for Goals</p>
        </div>
      </div>
    </>
  );
}
