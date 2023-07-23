import Image from "next/image";
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

export default function Home() {
  return (
    <>
      <div>
        <header className="flex items-center">
          <h1>Welcome back, Nombre Apellido!</h1>
          <h3 className="absolute right-8">Month,2023</h3>
        </header>

        <div>
          <section className="genSummary">
            {/* Componente Incomes */}
            <IncomeCard />

            {/* Componente Expenses */}
            <ExpenseCard />

            {/* Componente Total Balance */}
            <TotalBalanceCard />

            {/* Componente Total Saving Goals */}
            <TotalSavingCard />
          </section>

          <section className="genSummary">
            {/* Componente grafica PIE summary Month */}
            <MonthSummary />

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
      </div>
    </>
  );
}
