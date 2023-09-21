import Image from "next/image";
import totalSavingsIcon from "/public/assets/icons/totalSavingsIcon.png";
import { useState, useMemo, useEffect } from "react";
import { getTotalSavedGoals } from "@/Backend/Goal";

export default function TotalSavingCard({ User }) {
  const [totalSaved, setTotalSaved] = useState(0);
  const [totalGoal, setTotalGoal] = useState(0);

  useEffect(() => {
    async function getUserData() {
      const [data] = await Promise.all([getTotalSavedGoals(User)]);
      setTotalSaved(data.totalSaved);
      setTotalGoal(data.totalGoalsAmount);
    }
    getUserData();
  }, [User]);

  return (
    <>
      <div className="topCards bg-amber-300	">
        <Image
          src={totalSavingsIcon}
          alt="T Savings Icon Icon"
          width={50}
          height={50}
        />
        <div>
          <p>
            ${totalSaved || 0} of ${totalGoal || 0} MXN
          </p>
          <p>Total Savings for Goals</p>
        </div>
      </div>
    </>
  );
}
