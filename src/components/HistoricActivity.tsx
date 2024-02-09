"use client";

import ChargeActivity from "./ChargeActivity";
import { useState, useEffect, useMemo } from "react";
import { getPerUser } from "@/Backend/Transaction";
import styles from "./HistoricActivity.module.css";

type IncomeData = {
  User: number;
};

type TransactionsData = {
  id: number;
  description: string;
  amount: number;
  createdAt: Date;
  category: {
    name: string;
  };
};

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;

export default function HistoricActivity({ User }: IncomeData) {
  const [userTransactions, setUserTransactions] = useState<TransactionsData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUserTransactions() {
      setIsLoading(true);
      const userTrans = await getPerUser(User);
      setUserTransactions(userTrans);
      setIsLoading(false);
    }

    getUserTransactions();
  }, [User]);

  const dates = useMemo(
    () =>
      userTransactions.map((transaction) => {
        const d = new Date(transaction.createdAt);
        return d.toLocaleDateString(undefined, options);
      }),
    [userTransactions]
  );

  const hours = useMemo(
    () =>
      userTransactions.map((transaction) => {
        const d = new Date(transaction.createdAt);
        return d.toLocaleTimeString("en-US");
      }),
    [userTransactions]
  );

  // Creo un arreglo en date al Set(dates), solo guardando los valores unicos dentro de dates
  const uniqueDates = useMemo(() => Array.from(new Set(dates)), [dates]);
  const currDay = useMemo(
    () => new Date().toLocaleDateString(undefined, options),
    []
  );

  if (isLoading) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return (
    <>
      <div className={`${styles.cashFlow} testing`}>
        <div className={styles.header}>
          <div>
            <p>Transactions</p>
            <h2>Complete History</h2>
          </div>
          <div className={styles.buttons}>
            <button className={styles.active}>Weekly</button>
            <button>Monthly</button>
            <button>All Time</button>
          </div>
        </div>

        <div className={`${styles.scrollingClass} testing`}>
          {uniqueDates.map((fecha, dtindex) => (
            <div className="mb-10" key={dtindex}>
              <div className={styles.date}>
                {fecha == currDay ? <p>Today</p> : <p>{fecha}</p>}
              </div>

              {userTransactions.map(
                (transaction, transId) =>
                  fecha ==
                    new Date(transaction.createdAt).toLocaleDateString(
                      undefined,
                      options
                    ) && (
                    <ChargeActivity
                      key={transaction.id}
                      Name={transaction.description}
                      Time={hours[transId]}
                      Category={transaction.category.name}
                      Amount={transaction.amount}
                    />
                  )
              )}
            </div>
          ))}
        </div>

        <div className={`${styles.footer} testing`}>
          <div className={styles.buttons}>
            <button className={styles.active}>New Transaction</button>
          </div>
        </div>
      </div>
    </>
  );
}
