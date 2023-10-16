"use client";

import { useState, useEffect } from "react";
import { getUserGoals } from "@/Backend/Goal";

export default function GoalsActive({ User }) {
  const [userGoals, setUserGoals] = useState([]);
  let activeGoals = 0;

  useEffect(() => {
    async function getCompletedGoals() {
      const [existingGoals] = await Promise.all([getUserGoals(User)]);
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
      <div className="topCards bg-amber-300	">
        <div>
          <p>Active Goals: {activeGoals}</p>
          <p></p>
        </div>
      </div>
    </>
  );
}
