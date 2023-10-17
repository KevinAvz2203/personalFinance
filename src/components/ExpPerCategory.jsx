import { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { getCategories } from "@/Backend/Category";
import { getTotalPerCategory } from "@/Backend/Transaction";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ExpPerCategory({ User }) {
  const [barChartData, setBarChartData] = useState({ datasets: [] });
  const currMonth = new Date().toLocaleString([], { month: "long" });

  async function getCateMonthSummary() {
    let categorias = [];
    let gastos = [0, 0, 0, 0, 0, 0];

    const [cateNames] = await Promise.all([getCategories()]); // Categories Name
    const [transPerCat] = await Promise.all([getTotalPerCategory(User)]);

    for (let i = 0; i < cateNames.length; i++) {
      if (cateNames[i].name === "Income") {
        continue;
      }
      categorias.push(cateNames[i].name);
    }

    for (let j = 0; j < transPerCat.length; j++) {
      gastos[transPerCat[j].categoryId - 1] = Math.abs(
        transPerCat[j]._sum.amount
      );
    }

    setBarChartData({
      labels: categorias,
      datasets: [
        {
          label: "Total spend",
          data: gastos,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });
  }

  useMemo(getCateMonthSummary, [User]);

  return (
    <>
      <div className="catPerMonth">
        <h1 className="text-2xl p-2" suppressHydrationWarning={true}>
          Expenses per Categories for {currMonth}
        </h1>
        {/* <div className="flex justify-center"> */}
        <div className="w-full h-full">
          <Bar
            options={{
              indexAxis: "y",
              elements: {
                bar: {
                  borderWidth: 2,
                },
              },
              responsive: true,
              maintainAspectRatio: true,
            }}
            data={barChartData}
          />
        </div>
      </div>
    </>
  );
}
