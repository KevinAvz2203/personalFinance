import Image from "next/image";
import IncomeCard from "../../components/IncomeCard";
import ExpenseCard from "../../components/ExpenseCard";
import TotalBalanceCard from "../../components/TotalBalanceCard";
import TotalSavingCard from "../../components/TotalSavingCard";
import MonthSummary from "../../components/MonthSummary";
import MonthCashFlow from "../../components/MonthCashFlow";
import Calendar from "../../components/Calendar";

export default function Home() {
  return (
    <>
      <header className="flex items-center">
        <h1>Welcome back, Nombre Apellido!</h1>
        <h3 className="absolute right-8">Month,2023</h3>
      </header>

      <section className="cool">
        {/* Componente Incomes */}
        <IncomeCard />

        {/* Componente Expenses */}
        <ExpenseCard />

        {/* Componente Total Balance */}
        <TotalBalanceCard />

        {/* Componente Total Saving Goals */}
        <TotalSavingCard />
      </section>

      <section className="flex pt-5 justify-between">
        {/* Componente grafica PIE summary Month */}
        <MonthSummary />

        {/* Componente grafica Curva summary Month */}
        <MonthCashFlow />

        {/* Componente Calendario Month */}
        <Calendar />
      </section>

      <section className="flex pt-5 justify-between">
        {/* Componente grafica PIE summary Month */}
        <div className="provisionalComp">Recent Activity</div>

        {/* Componente grafica Curva summary Month */}
        <div className="provisionalComp">Saving Goals</div>

        {/* Componente Calendario Month */}
        <div className="provisionalComp">Card</div>
      </section>
    </>
  );
}
