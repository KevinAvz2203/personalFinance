"use client";

import ChargeActivity from "./ChargeActivity";
import { useState, useEffect, useMemo, useCallback } from "react";
import { getHistoricPerUser } from "@/Backend/Transaction";
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

type DataState = {
  Weekly: TransactionsData[] | null;
  Monthly: TransactionsData[] | null;
  Yearly: TransactionsData[] | null;
};

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;

export default function HistoricActivity({ User }: IncomeData) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState<
    "Weekly" | "Monthly" | "Yearly"
  >("Weekly");

  const [data, setData] = useState<DataState>({
    Weekly: null,
    Monthly: null,
    Yearly: null,
  });

  const handleClick = useCallback((button: "Weekly" | "Monthly" | "Yearly") => {
    setActiveButton(button);
  }, []);

  useEffect(() => {
    async function getUserTransactions(
      period: "Weekly" | "Monthly" | "Yearly"
    ) {
      setIsLoading(true);
      const userTrans: TransactionsData[] = await getHistoricPerUser(
        User,
        period
      );
      setData((prevData) => ({ ...prevData, [period]: userTrans }));
      setIsLoading(false);
    }

    if (!data[activeButton]) {
      getUserTransactions(activeButton);
    }
  }, [User, activeButton, data]);

  const dates = useMemo(
    () =>
      data[activeButton]?.map((transaction) => {
        const d = new Date(transaction.createdAt);
        return d.toLocaleDateString(undefined, options);
      }),
    [data, activeButton]
  );

  const hours = useMemo(
    () =>
      data[activeButton]?.map((transaction) => {
        const d = new Date(transaction.createdAt);
        return d.toLocaleTimeString("en-US");
      }),
    [data, activeButton]
  );

  // Creo un arreglo en date al Set(dates), solo guardando los valores unicos dentro de dates
  const uniqueDates = useMemo(() => Array.from(new Set(dates)), [dates]);
  const currDay = useMemo(
    () => new Date().toLocaleDateString(undefined, options),
    []
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p>Transactions</p>
            <h2>Complete History</h2>
          </div>
          <div className={styles.buttons}>
            <button
              className={activeButton === "Weekly" ? styles.active : ""}
              onClick={() => handleClick("Weekly")}
            >
              Weekly
            </button>
            <button
              className={activeButton === "Monthly" ? styles.active : ""}
              onClick={() => handleClick("Monthly")}
            >
              Monthly
            </button>
            <button
              className={activeButton === "Yearly" ? styles.active : ""}
              onClick={() => handleClick("Yearly")}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className={styles.scrollingClass}>
          {uniqueDates.map((fecha, dtindex) => (
            <div className="mb-10" key={dtindex}>
              <div className={styles.date}>
                {fecha == currDay ? <p>Today</p> : <p>{fecha}</p>}
              </div>

              {data[activeButton] &&
                data[activeButton]?.map(
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

        <div className={styles.footer}>
          <div className={styles.newTransactionButton}>
            <button className={styles.active}>New Transaction</button>
          </div>
        </div>
      </div>
    </>
  );
}
