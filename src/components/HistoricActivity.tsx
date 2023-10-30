"use client";

import Image from "next/image";
import ChargeActivity from "./ChargeActivity";
import addChargeIcon from "/public/assets/icons/addChargeIcon.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getPerUser } from "@/Backend/Transaction";
import styles from "./HistoricActivity.module.css";

type IncomeData = {
  User: number;
  HistoryType: number;
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

export default function HistoricActivity({ User, HistoryType }: IncomeData) {
  const [userTransactions, setUserTransactions] = useState<TransactionsData[]>(
    []
  );

  useEffect(() => {
    async function getUserTransactions() {
      const userTrans = await getPerUser(User);
      setUserTransactions(userTrans);
    }

    getUserTransactions();
  }, [User]);

  const dates = userTransactions.map((transaction) => {
    const d = new Date(transaction.createdAt);
    return d.toLocaleDateString(undefined, options);
  });

  const hours = userTransactions.map((transaction) => {
    const d = new Date(transaction.createdAt);
    return d.toLocaleTimeString("en-US");
  });

  // Creo un arreglo en date al Set(dates), solo guardando los valores unicos dentro de dates
  const uniqueDates = Array.from(new Set(dates));
  let currDay = new Date().toLocaleDateString(undefined, options);

  return (
    <>
      {HistoryType === 0 ? (
        <div className={styles.recentAct}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">Recent Activity</h1>
            <Link href={"/addTransaction"}>
              <Image src={addChargeIcon} alt="add charge icon" />
            </Link>
          </div>

          <div className={styles.scrollingClass}>
            {uniqueDates.map(
              (fecha, dtindex) =>
                dtindex < 3 && (
                  <div className="mb-10" key={dtindex}>
                    {fecha == currDay ? <h4>Today</h4> : <h4>{fecha}</h4>}
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
                )
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      {HistoryType === 1 ? (
        <div className={styles.actHistory}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">Activity History</h1>
            <Link href={"/addTransaction"}>
              <Image src={addChargeIcon} alt="add charge icon" />
            </Link>
          </div>

          {dates.map((fecha, dtindex) => (
            <div className="mb-10" key={dtindex}>
              {fecha == currDay ? <h4>Today</h4> : <h4>{fecha}</h4>}
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
      ) : (
        <></>
      )}
    </>
  );
}
