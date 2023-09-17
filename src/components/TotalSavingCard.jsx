"use client";

import Image from "next/image";
import totalSavingsIcon from "/public/assets/icons/totalSavingsIcon.png";
import { useState, useMemo } from "react";
import { getGoals } from "@/Backend/Goal";

export default function TotalSavingCard({ User }) {
  const [totalSaved, setTotalSaved] = useState(0);
  const [totalGoal, setTotalGoal] = useState(0);

  async function getUserData() {
    const [data] = await Promise.all([getGoals(User)]);
    console.log(data);
  }

  useMemo(getUserData, [User]);

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
          <p>$15000 of 150000 MXN</p>
          <p>Total Savings for Goals</p>
        </div>
      </div>
    </>
  );
}
