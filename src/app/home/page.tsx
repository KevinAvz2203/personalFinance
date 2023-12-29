"use client";

import TopCard from "@/components/TopCard";
import TotalSavingCard from "@/components/TotalSavingCard";
import MonthSummary from "@/components/MonthSummary";
import HistoricActivity from "@/components/HistoricActivity";
import MonthCashFlow from "@/components/MonthCashFlow";
import SavingGoals from "@/components/SavingGoals";
import styles from "./home.module.css";
import { useSession } from "next-auth/react";

export default function Home() {
  const currMonth = new Date().toLocaleString([], { month: "long" });
  const currYear = new Date().getFullYear();
  const { data: session } = useSession();

  let UserID: number = 0;
  let UserName = "";

  if (session?.user) {
    UserID = session.user.id || 0;
    UserName = session.user.name;
  }

  return (
    <>
      <header className="flex items-center">
        <h1>Welcome back, {UserName}</h1>
        <h3 className="absolute right-8" suppressHydrationWarning={true}>
          {currMonth}, {currYear}
        </h3>
      </header>

      <div>
        <section className={styles.genSummary}>
          {/* Incomes Card */}
          <TopCard User={UserID} cardType={0} />

          {/* Expenses Card */}
          <TopCard User={UserID} cardType={1} />

          {/* Total Balance Card */}
          <TopCard User={UserID} cardType={2} />

          {/* Componente Total Saving Goals */}
          <TotalSavingCard User={UserID} />
        </section>

        <section className={styles.genSummary}>
          {/* Componente grafica PIE summary Month */}
          <MonthSummary User={UserID} />

          {/* Componente grafica Curva summary Month */}
          <MonthCashFlow User={UserID} />
        </section>

        <section className={styles.genSummary}>
          {/* Componente grafica PIE summary Month */}
          <HistoricActivity User={UserID} HistoryType={0} />

          {/* Componente grafica Curva summary Month */}
          <SavingGoals User={UserID} />
        </section>
      </div>
    </>
  );
}
