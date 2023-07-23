import MainGoals from "@/components/MainGoals";
import GoalsTable from "@/components/GoalsTable";
import TotalSavingCard from "@/components/TotalSavingCard";
import GoalsActive from "@/components/GoalsActive";
import GoalsCompleted from "@/components/GoalsCompleted";

export default function Goals() {
  return (
    <>
      <div>
        <header className="flex items-center">
          <h1>Main Goals</h1>
          <h3 className="absolute right-8">Month, 2023</h3>
        </header>

        <div className="">
          <section className="">
            <MainGoals />
          </section>

          <section className="testing">
            <GoalsTable />
          </section>

          <div>
            <div className="flex justify-end">
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
              >
                Add
              </button>
              <button
                className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="testing goalsCards">
            <GoalsActive />
            <GoalsCompleted />
            <TotalSavingCard />
          </div>
        </div>
      </div>
    </>
  );
}
