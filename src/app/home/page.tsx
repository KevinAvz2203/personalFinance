"use client";

import TopCard from "@/components/TopCard";
import TotalSavingCard from "@/components/TotalSavingCard";
import MonthSummary from "@/components/MonthSummary";
import HistoricActivity from "@/components/HistoricActivity";
import MonthCashFlow from "@/components/MonthCashFlow";
import SavingGoals from "@/components/SavingGoals";
import styles from "./home.module.css";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";

export default function Home() {
  const { data: session } = useSession();

  let UserID: number = 0;

  if (session?.user) {
    UserID = session.user.id || 0;
  }

  return (
    <>
      <Header />

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
