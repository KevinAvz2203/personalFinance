import MonthCashFlow from "@/components/MonthCashFlow";
import RecentActivity from "@/components/RecentActivity";

export default function Data() {
  return (
    <>
      <div>
        <header className="flex items-center">
          <h1>Here is the Complete Summary of your Activities</h1>
          <h3 className="absolute right-8">Month, 2023</h3>
        </header>

        <div className="testing flex">
          <div className="testing dataGraphs">
            <MonthCashFlow />

            <MonthCashFlow />
          </div>
          <div className="testing dataActivity">
            <RecentActivity />
          </div>
        </div>
      </div>
    </>
  );
}
