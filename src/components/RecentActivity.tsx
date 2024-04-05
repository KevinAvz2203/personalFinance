import ChargeActivity from "./ChargeActivity";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { getRecentPerUser } from "@/Backend/Transaction";
import styles from "./RecentActivity.module.css";

/* Types declaration */
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
/* ================= */

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;

const RecentActivity = ({ User }: IncomeData) => {
  /* State declarations */
  const [userTransactions, setUserTransactions] = useState<TransactionsData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const getUserTransactions = useCallback(async () => {
    setIsLoading(true);
    const userTrans = await getRecentPerUser(User);
    setUserTransactions(userTrans);
    setIsLoading(false);
  }, [User]);
  /* ================== */

  useEffect(() => {
    getUserTransactions();
  }, [getUserTransactions]);

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

  return (
    <>
      <div className={styles.cashFlow}>
        <div className={styles.header}>
          <div>
            <p>Transactions</p>
            <h2>Recent Activity</h2>
          </div>
        </div>

        <div className={styles.scrollingClass}>
          {isLoading ? (
            <>
              <div>Loading...</div>
            </>
          ) : (
            <></>
          )}
          {uniqueDates.length === 0 && !isLoading ? (
            <>
              <div>No recent transactions to show</div>
            </>
          ) : (
            <></>
          )}
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
      </div>
    </>
  );
};

export default React.memo(RecentActivity);
