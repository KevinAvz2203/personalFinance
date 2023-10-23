"use client";

import Image from "next/image";
import ChargeActivity from "./ChargeActivity";
import addChargeIcon from "/public/assets/icons/addChargeIcon.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getPerUser } from "@/Backend/Transaction";

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

export default function RecentActivity({ User }: IncomeData) {
  const [userTransactions, setUserTransactions] = useState<TransactionsData[]>(
    []
  );
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;
  let dates: string[] = [];
  let hours: string[] = [];

  useEffect(() => {
    async function getUserTransactions() {
      const [userTrans]: any[] = await Promise.all([getPerUser(User)]);
      setUserTransactions(userTrans);
    }

    getUserTransactions();
  }, [User]);

  for (let i = 0; i < userTransactions.length; i++) {
    const singleDate = userTransactions[i].createdAt;
    const d = new Date(singleDate);

    dates.push(d.toLocaleDateString(undefined, options));
    hours.push(d.toLocaleTimeString("en-US"));
  }

  // Elimino los elementos duplicados del arreglo dates
  dates = dates.filter((value, index, array) => array.indexOf(value) === index);
  let currDay = new Date().toLocaleDateString(undefined, options);

  return (
    <>
      <div className="recentAct">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Recent Activity</h1>
          <Link href={"/addTransaction"}>
            <Image src={addChargeIcon} alt="add charge icon" />
          </Link>
        </div>

        <div className="scrollingClass">
          {dates.map(
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
    </>
  );
}
