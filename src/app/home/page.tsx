"use client";

import TopCard from "@/components/TopCard";
import TotalSavingCard from "@/components/TotalSavingCard";
import MonthSummary from "@/components/MonthSummary";
import MonthCashFlow from "@/components/MonthCashFlow";
import Calendar from "@/components/Calendar";
import RecentActivity from "@/components/RecentActivity";
import SavingGoals from "@/components/SavingGoals";
import Card from "@/components/Card";
import { getUserData } from "@/Backend/User";

export default async function Home() {
  const [userData] = await Promise.all([getUserData(1)]);
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
          {/* Incomes Card */}
          <TopCard User={userData.id} cardType={0} />

          {/* Expenses Card */}
          <TopCard User={userData.id} cardType={1} />

          {/* Total Balance Card */}
          <TopCard User={userData.id} cardType={2} />

          {/* Componente Total Saving Goals */}
          <TotalSavingCard User={userData.id} />
        </section>

        <section className="genSummary">
          {/* Componente grafica PIE summary Month */}
          <MonthSummary User={userData.id} />

          {/* Componente grafica Curva summary Month */}
          <MonthCashFlow User={userData.id} />

          {/* Componente Calendario Month */}
          {/* <Calendar /> */}
        </section>

        <section className="genSummary">
          {/* Componente grafica PIE summary Month */}
          <RecentActivity User={userData.id} />

          {/* Componente grafica Curva summary Month */}
          <SavingGoals />

          {/* Componente Calendario Month */}
          <Card />
        </section>
      </div>
    </>
  );
}
