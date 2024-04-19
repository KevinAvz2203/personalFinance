"use client";

import FavGoals from "@/components/FavGoals";
import GoalsTable from "@/components/GoalsTable";
/* import TotalSavingCard from "@/components/TotalSavingCard"; */
import Header from "@/components/Header";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "./goals.module.css";

export default function Goals() {
  const { data: session } = useSession();

  /* Mientras no se encuentra una session activa, se muestra la pantalla de carga */
  /* Reemplazar mas adelante con el component para la pagina */
  while (!session) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  const UserID: number = session.user.id;

  return (
    <>
      <Header />

      <div className="content">
        <div className={styles.goalsFavorite}>
          <FavGoals User={UserID} />
        </div>

        <section>
          <GoalsTable User={UserID} />
        </section>
      </div>

      {/* <div className="pt-4">
        <div className="flex justify-end pr-8">
          <Link href={"/addGoal"}>
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
            >
              Add New Goal
            </button>
          </Link>
        </div>
      </div> */}
    </>
  );
}
