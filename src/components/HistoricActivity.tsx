"use client";

import ChargeActivity from "./ChargeActivity";
import { useState, useEffect, useMemo, useCallback } from "react";
import { getHistoricPerUser } from "@/Backend/Transaction";
import styles from "./HistoricActivity.module.css";

import Link from "next/link";

type IncomeData = {
  User: string;
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

  // Creo un arreglo en date al Set(dates), solo guardando los valores unicos dentro de dates
  const uniqueDates = useMemo(
    () =>
      Array.from(
        new Set(
          data[activeButton]?.map((transaction) =>
            new Date(transaction.createdAt).toLocaleDateString(
              undefined,
              options
            )
          )
        )
      ),
    [data, activeButton]
  );

  const currDay = useMemo(
    () => new Date().toLocaleDateString(undefined, options),
    []
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p>Transactions</p>
            <h2>Complete History</h2>
          </div>
          <div className={styles.buttons}>
            {["Weekly", "Monthly", "Yearly"].map((button) => (
              <button
                key={button}
                className={activeButton === button ? styles.active : ""}
                onClick={() =>
                  handleClick(button as "Weekly" | "Monthly" | "Yearly")
                }
              >
                {button}
              </button>
            ))}
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
                <p>{fecha === currDay ? "Today" : fecha}</p>
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
                        Time={new Date(
                          transaction.createdAt
                        ).toLocaleTimeString("en-US")}
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
            <Link href="/addTransaction">
              <button className={styles.active}>New Transaction</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
