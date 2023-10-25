import MainGoals from "@/components/MainGoals";
import GoalsTable from "@/components/GoalsTable";
import TotalSavingCard from "@/components/TotalSavingCard";
import GoalsActive from "@/components/GoalsActive";
import GoalsCompleted from "@/components/GoalsCompleted";
import Link from "next/link";
import { getUserData } from "@/Backend/User"; // Borrar cuando tenga una mejor forma de hacer esto

export default async function Goals() {
  const [userData] = await Promise.all([getUserData(1)]);
  const currMonth = new Date().toLocaleString([], { month: "long" });
  const currYear = new Date().getFullYear();

  return (
    <>
      <header className="flex items-center">
        <h1>Main Goals</h1>
        <h3 className="absolute right-8" suppressHydrationWarning={true}>
          {currMonth}, {currYear}
        </h3>
      </header>

      <div className="recuadro">
        <MainGoals User={userData.id} />
      </div>

      <section className="flex justify-center pt-4">
        <GoalsTable User={userData.id} />
      </section>

      <div className="pt-4">
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
      </div>

      <div className="flex justify-around pt-4">
        <GoalsActive User={userData.id} />
        <GoalsCompleted User={userData.id} />
        <TotalSavingCard User={userData.id} />
      </div>
    </>
  );
}
