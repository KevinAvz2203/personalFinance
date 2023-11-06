"use client";

import ExpPerCategory from "@/components/ExpPerCategory";
import ExpPerCategoryExpected from "@/components/ExpPerCategoryExpected";
import HistoricActivity from "@/components/HistoricActivity";
import styles from "./data.module.css";
import { useSession } from "next-auth/react";

export default function Data() {
  const currMonth = new Date().toLocaleString([], { month: "long" });
  const currYear = new Date().getFullYear();
  const { data: session } = useSession();

  let UserID: number = 0;

  if (session?.user) {
    UserID = session.user.id || 0;
  }

  return (
    <>
      <div>
        <header className="flex items-center">
          <h1>Here is the Complete Summary of your Activities</h1>
          <h3 className="absolute right-8" suppressHydrationWarning={true}>
            {currMonth}, {currYear}
          </h3>
        </header>

        <div className="flex">
          <div className={styles.dataGraphs}>
            <ExpPerCategory User={UserID} />

            <ExpPerCategoryExpected User={UserID} />
          </div>
          <div className={styles.dataActivity}>
            <HistoricActivity User={UserID} HistoryType={1} />
          </div>
        </div>
      </div>
    </>
  );
}
