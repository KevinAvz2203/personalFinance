"use client";

import ExpPerCategory from "@/components/ExpPerCategory";
import ExpPerCategoryExpected from "@/components/ExpPerCategoryExpected";
import HistoricActivity from "@/components/HistoricActivity";
import styles from "./data.module.css";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Loading from "./loading";

export default function Stadistics() {
  const { data: session } = useSession();

  /* Mientras no se encuentra una session activa, se muestra la pantalla de carga */
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

      <div className="content">
        <div className={styles.container}>
          <div className={styles.dataGraphs}>
            <ExpPerCategory User={UserID} />

            {/* <ExpPerCategoryExpected User={UserID} /> */}
          </div>
          <div className={styles.dataActivity}>
            {/* <HistoricActivity User={UserID} /> */}
            <ExpPerCategoryExpected User={UserID} />
          </div>
        </div>
      </div>
    </>
  );
}
