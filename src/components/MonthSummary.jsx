import { getCategories } from "@/Backend/Category";
import { getTotalPerCategory } from "@/Backend/Transaction";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MonthSummary({ User }) {
  const [pieChartData, setPieChartData] = useState({ datasets: [] });
  const currMonth = new Date().toLocaleString([], { month: "long" });

  async function getCateMonthSummary() {
    let categorias = [];
    let gastos = [0, 0, 0, 0, 0, 0];

    const [cateNames] = await Promise.all([getCategories()]); // Categories Name
    const [transPerCat] = await Promise.all([getTotalPerCategory(User)]);

    for (let i = 0; i < cateNames.length; i++) {
      categorias.push(cateNames[i].name);
    }

    for (let j = 0; j < transPerCat.length; j++) {
      gastos[transPerCat[j].categoryId - 1] = transPerCat[j]._sum.amount;
    }

    setPieChartData({
      labels: categorias,
      datasets: [
        {
          label: "Total spend",
          data: gastos,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }

  useMemo(getCateMonthSummary, [User]);

  return (
    <>
      <div className="monthGraphs">
        <h1 className="text-2xl p-2" suppressHydrationWarning={true}>
          Expenses for {currMonth}
        </h1>
        <div className="w-full h-full">
          <Doughnut
            data={pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right",
                },
              },
              maintainAspectRatio: true,
            }}
          />
        </div>
      </div>
    </>
  );
}
