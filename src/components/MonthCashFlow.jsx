import Image from "next/image";
import curveGraph from "/public/assets/images/curveGraph.png";

export default function MonthCashFlow() {
  return (
    <>
      <div className="monthGraphs">
        <h1 className="text-2xl p-2">My Summary for Month</h1>
        <div className="flex justify-center">
          <Image src={curveGraph} alt="Pie Chart" width={500} />
        </div>
      </div>
    </>
  );
}
