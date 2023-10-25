import Image from "next/image";
import totalSavingsIcon from "/public/assets/icons/totalSavingsIcon.png";
import { getTotalSavedGoals } from "@/Backend/Goal";
import styles from "./TopCard.module.css";

type incomeData = {
  User: number;
};

export default async function TotalSavingCard({ User }: incomeData) {
  const data = await getTotalSavedGoals(User);

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
            ${data.totalSaved || 0} of ${data.totalGoalsAmount || 0} MXN
          </p>
          <p>Total Savings for Goals</p>
        </div>
      </div>
    </>
  );
}
