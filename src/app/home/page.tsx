"use client";

import TopCard from "@/components/TopCard";
import MonthSummary from "@/components/MonthSummary";
import HistoricActivity from "@/components/HistoricActivity";
import MonthCashFlow from "@/components/MonthCashFlow";
import styles from "./home.module.css";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Loading from "./loading";

export default function Home() {
  const { data: session } = useSession();

  while (!session) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const UserID: number = session.user.id;

  return (
    <>
      <Header />

      <div>
        {/* Top Cards */}
        <section className={styles.genSummary}>
          <TopCard User={UserID} />
        </section>

        <section className={styles.genSummary}>
          {/* Componente grafica Curva summary Month */}
          <MonthCashFlow User={UserID} />

          {/* Componente grafica PIE summary Month */}
          {/* <MonthSummary User={UserID} /> */}
        </section>

        <section className={styles.genSummary}>
          {/* Componente grafica PIE summary Month */}
          {/* <HistoricActivity User={UserID} HistoryType={0} /> */}

        </section>
      </div>
    </>
  );
}
