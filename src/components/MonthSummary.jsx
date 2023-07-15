import Image from "next/image";
import pieChart from "/public/assets/images/pieChart.png";

export default function MonthSummary() {
  return (
    <>
      <div className="monthGraphs">
        <h1 className="text-2xl p-2">My Summary for Month</h1>
        <div className="flex">
          <div>
            <Image src={pieChart} alt="Pie Chart" width={300} />
          </div>
          <div className="incExp">
            <h1>Incomes: </h1>
            <h1>Expenses: </h1>
          </div>
        </div>
      </div>
    </>
  );
}
