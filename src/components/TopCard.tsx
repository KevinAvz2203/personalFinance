import Image from "next/image";
import incomeIcon from "/public/assets/icons/incomes-black.png";
import expenseIcon from "/public/assets/icons/expenses-black.png";
import totalBalanceIcon from "/public/assets/icons/balance-black.png";
import savedGoalsIcon from "/public/assets/icons/piggy-bank.png";
import React, { useState, useEffect, useCallback } from "react";
import {
  getIncomes, // Borrar API
  getExpenses, // Borrar API
  getTotalBalance,
  getMonthlyGeneralBalance,
} from "@/Backend/Transaction";
import { getTotalSavedGoals } from "@/Backend/Goal";
import styles from "./TopCard.module.css";

/* Types declaration */
type TotalAmountsType = {
  incomes: number;
  expenses: number;
  totalBalance: number;
};

type GoalsTotalSavedType = {
  totalGoalsAmount: number;
  totalSaved: number;
};
/* ================= */

const TopCard = ({ User }: { User: number }) => {
  /* State for setting total balances */
  const [totalAmounts, setTotalAmounts] = useState<TotalAmountsType>({
    incomes: 0,
    expenses: 0,
    totalBalance: 0,
  });

  /* State that saves the goals data */
  const [goalsTotalSaved, setGoalsTotalSaved] = useState<GoalsTotalSavedType>({
    totalGoalsAmount: 0,
    totalSaved: 0,
  });

  /* Using state useCallback to avoid unnecesary re-rendering */
  const fetchBalancesData = useCallback(async () => {
    try {
      /* Fetching all the necessary API calls */
      const [balanceTotal, savingTotal, generalBalance] = await Promise.all([
        getTotalBalance(User),
        getTotalSavedGoals(User),
        getMonthlyGeneralBalance(User),
      ]);

      /* Updating States with fetched data */
      setTotalAmounts({
        incomes: generalBalance.t_incomes,
        expenses: generalBalance.t_expenses,
        totalBalance: balanceTotal.amount,
      });
      setGoalsTotalSaved(savingTotal);
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
          {
            icon: totalBalanceIcon,
            amount: totalAmounts.totalBalance,
            label: "Total Balance",
          },
          {
            icon: savedGoalsIcon,
            amount: goalsTotalSaved.totalSaved,
            total: goalsTotalSaved.totalGoalsAmount,
            label: "Total Savings - MXN",
          },
        ].map(({ icon, amount, total, label }, index) => (
          <React.Fragment key={index}>
            <div className={`${styles.topCards}`}>
              <Image src={icon} alt={`${label} Icon`} width={50} height={50} />
              <div>
                {icon === savedGoalsIcon ? (
                  <p>
                    ${amount || 0} of ${total || 0}
                  </p>
                ) : (
                  <p>${amount || 0} MXN</p>
                )}
                <p>{label}</p>
              </div>
            </div>
            {index !== 3 && <span className={styles.separator} />}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default React.memo(TopCard);
