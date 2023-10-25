import TopCard from "@/components/TopCard";
import TotalSavingCard from "@/components/TotalSavingCard";
import MonthSummary from "@/components/MonthSummary";
import HistoricActivity from "@/components/HistoricActivity";
import MonthCashFlow from "@/components/MonthCashFlow";
import SavingGoals from "@/components/SavingGoals";
import { getUserData } from "@/Backend/User";
import styles from "./home.module.css";

export default async function Home() {
  const userData = await getUserData(1); // Editar ya que regresa toda la info
  const currMonth = new Date().toLocaleString([], { month: "long" });
  const currYear = new Date().getFullYear();

  return (
    <>
      <header className="flex items-center">
        <h1>
          Welcome back, {userData.firstName} {userData.lastName}!
        </h1>
        <h3 className="absolute right-8" suppressHydrationWarning={true}>
          {currMonth}, {currYear}
        </h3>
      </header>

      <div>
        <section className={styles.genSummary}>
          {/* Incomes Card */}
          <TopCard User={userData.id} cardType={0} />

          {/* Expenses Card */}
          <TopCard User={userData.id} cardType={1} />

          {/* Total Balance Card */}
          <TopCard User={userData.id} cardType={2} />

          {/* Componente Total Saving Goals */}
          <TotalSavingCard User={userData.id} />
        </section>

        <section className={styles.genSummary}>
          {/* Componente grafica PIE summary Month */}
          <MonthSummary User={userData.id} />

          {/* Componente grafica Curva summary Month */}
          <MonthCashFlow User={userData.id} />
        </section>

        <section className={styles.genSummary}>
          {/* Componente grafica PIE summary Month */}
          <HistoricActivity User={userData.id} HistoryType={0} />

          {/* Componente grafica Curva summary Month */}
          <SavingGoals User={userData.id} />
        </section>
      </div>
    </>
  );
}
