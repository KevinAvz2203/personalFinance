"use client";

import IncomeCard from "@/components/IncomeCard";
import ExpenseCard from "@/components/ExpenseCard";
import TotalBalanceCard from "@/components/TotalBalanceCard";
import TotalSavingCard from "@/components/TotalSavingCard";
import MonthSummary from "@/components/MonthSummary";
import MonthCashFlow from "@/components/MonthCashFlow";
import Calendar from "@/components/Calendar";
import RecentActivity from "@/components/RecentActivity";
import SavingGoals from "@/components/SavingGoals";
import Card from "@/components/Card";
import { getUserData } from "@/Backend/User";

export default async function Home() {
  const [userData] = await Promise.all([getUserData(2)]);
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
        <section className="genSummary">
          {/* Los primeros 3 hay que hacerlos 1 solo */}
          {/* Componente Incomes */}
          <IncomeCard User={userData.id} />
          {/* Componente Expenses */}
          <ExpenseCard User={userData.id} />
          {/* Componente Total Balance */}
          <TotalBalanceCard User={userData.id} />
          {/* Componente Total Saving Goals */}
          <TotalSavingCard User={userData.id} />
        </section>

        <section className="genSummary">
          {/* Componente grafica PIE summary Month */}
          <MonthSummary User={userData.id} />

          {/* Componente grafica Curva summary Month */}
          <MonthCashFlow />

          {/* Componente Calendario Month */}
          <Calendar />
        </section>

        <section className="genSummary">
          {/* Componente grafica PIE summary Month */}
          <RecentActivity />

          {/* Componente grafica Curva summary Month */}
          <SavingGoals />

          {/* Componente Calendario Month */}
          <Card />
        </section>
      </div>
    </>
  );
}
