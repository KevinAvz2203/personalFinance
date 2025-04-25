"use client";

import Image from "next/image";
import incomeIcon from "/public/assets/icons/incomes-black.png";
import expenseIcon from "/public/assets/icons/expenses-black.png";
import totalBalanceIcon from "/public/assets/icons/balance-black.png";
import savedGoalsIcon from "/public/assets/icons/piggy-bank.png";
import React, { useState, useEffect, useCallback } from "react";
import { getGeneralBalance } from "@/Backend/Transaction";
import styles from "./TopCard.module.css";

/* Types declaration */
type TotalAmountsType = {
  incomes: number;
  expenses: number;
};

type GoalsTotalSavedType = {
  totalGoalsAmount: number;
  totalSaved: number;
};
/* ================= */

const TopCardStadistics = ({ User }: { User: string }) => {
  /* State for setting total balances */
  const [totalAmounts, setTotalAmounts] = useState<TotalAmountsType>({
    incomes: 0,
    expenses: 0,
  });

  /* Using state useCallback to avoid unnecesary re-rendering */
  const fetchBalancesData = useCallback(async () => {
    try {
      /* Fetching all the necessary API calls */
      const [generalBalance] = await Promise.all([getGeneralBalance(User)]);

      /* Updating States with fetched data */
      setTotalAmounts({
        incomes: generalBalance.t_incomes,
        expenses: generalBalance.t_expenses,
      });
    } catch (error) {
      /* Future modification to add a UI update */
      console.error("Error fetching user income data:", error);
    }
  }, [User]);

  useEffect(() => {
    fetchBalancesData();
  }, [fetchBalancesData]);

  return (
    <>
      <div className={styles.container}>
        {[
          { icon: incomeIcon, amount: totalAmounts.incomes, label: "Incomes" },
          {
            icon: expenseIcon,
            amount: totalAmounts.expenses,
            label: "Expenses",
          },
        ].map(({ icon, amount, label }, index) => (
          <React.Fragment key={index}>
            <div className={`${styles.topCards} ${styles.topCardsStadistics}`}>
              <Image src={icon} alt={`${label} Icon`} width={50} height={50} />
              <div>
                <p>${amount.toFixed(2) || 0} MXN</p>
                <p>{label}</p>
              </div>
            </div>
            {index !== 1 && <span className={styles.separator} />}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default React.memo(TopCardStadistics);
