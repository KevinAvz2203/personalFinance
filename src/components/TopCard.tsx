import Image from "next/image";
import incomeIcon from "/public/assets/icons/incomes-black.png";
import expenseIcon from "/public/assets/icons/expenses-black.png";
import totalBalanceIcon from "/public/assets/icons/balance-black.png";
import savedGoalsIcon from "/public/assets/icons/piggy-bank.png";
import { useState, useEffect } from "react";
import {
  getIncomes,
  getExpenses,
  getTotalBalance,
} from "@/Backend/Transaction";
import { getTotalSavedGoals } from "@/Backend/Goal";
import styles from "./TopCard.module.css";

type incomeData = {
  User: number;
};

type userSumGoals = {
  totalSaved: number;
  totalGoalsAmount: number;
};

type TotalAmountType = {
  incomes: number;
  expenses: number;
  totalBalance: number;
};

export default function TopCard({ User }: incomeData) {
  const [totalAmounts, setTotalAmounts] = useState<TotalAmountType>({
    incomes: 0,
    expenses: 0,
    totalBalance: 0,
  });

  const [goalsTotalSaved, setGoalsTotalSaved] = useState<userSumGoals>({
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
        <div className={`${styles.topCards}`}>
          <Image src={incomeIcon} alt="Income Icon" width={50} height={50} />
          <div>
            <p>${totalAmounts.incomes | 0} MXN</p>
            <p>Incomes</p>
          </div>
        </div>
        <span
          style={{
            height: 60,
            border: "1px #8DA9C4 solid",
          }}
        />
        <div className={`${styles.topCards}`}>
          <Image src={expenseIcon} alt="Expense Icon" width={50} height={50} />
          <div>
            <p>${totalAmounts.expenses | 0} MXN</p>
            <p>Expenses</p>
          </div>
        </div>
        <span
          style={{
            height: 60,
            border: "1px #8DA9C4 solid",
          }}
        />
        <div className={`${styles.topCards}`}>
          <Image
            src={totalBalanceIcon}
            alt="TotalBalance Icon"
            width={50}
            height={50}
          />
          <div>
            <p>${totalAmounts.totalBalance | 0} MXN</p>
            <p>Total Balance</p>
          </div>
        </div>
        <span
          style={{
            height: 60,
            border: "1px #8DA9C4 solid",
          }}
        />
        <div className={`${styles.topCards}`}>
          <Image
            src={savedGoalsIcon}
            alt="savedGoals Icon"
            width={50}
            height={50}
          />
          <div>
            <p>
              ${goalsTotalSaved.totalSaved || 0} of $
              {goalsTotalSaved.totalGoalsAmount || 0}
            </p>
            <p>Total Savings - MXN</p>
          </div>
        </div>
      </div>
    </>
  );
}
