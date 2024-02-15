import Image from "next/image";
import incomeIcon from "/public/assets/icons/incomes-black.png";
import expenseIcon from "/public/assets/icons/expenses-black.png";
import totalBalanceIcon from "/public/assets/icons/balance-black.png";
import savedGoalsIcon from "/public/assets/icons/piggy-bank.png";
import { useState, useEffect } from "react";
import React from "react";
import {
  getIncomes,
  getExpenses,
  getTotalBalance,
} from "@/Backend/Transaction";
import { getTotalSavedGoals } from "@/Backend/Goal";
import styles from "./TopCard.module.css";

export default function TopCard({ User }: { User: number }) {
  const [totalAmounts, setTotalAmounts] = useState({
    incomes: 0,
    expenses: 0,
    totalBalance: 0,
  });

  const [goalsTotalSaved, setGoalsTotalSaved] = useState({
    totalGoalsAmount: 0,
    totalSaved: 0,
  });

  useEffect(() => {
    async function getUserIncomeData() {
      const [incomeTotal, expenseTotal, balanceTotal, savingTotal] =
        await Promise.all([
          getIncomes(User),
          getExpenses(User),
          getTotalBalance(User),
          getTotalSavedGoals(User),
        ]);

      setTotalAmounts({
        incomes: incomeTotal.amount,
        expenses: expenseTotal.amount,
        totalBalance: balanceTotal.amount,
      });

      setGoalsTotalSaved(savingTotal);
    }

    getUserIncomeData();
  }, [User]);

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
            {index !== 3 && (
              <span
                style={{
                  height: 60,
                  border: "1px #8DA9C4 solid",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
