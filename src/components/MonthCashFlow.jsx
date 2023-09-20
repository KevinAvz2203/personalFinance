import { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MonthCashFlow({ User }) {
  const [lineChartData, setLineChartData] = useState({ datasets: [] });
  const currMonth = new Date().toLocaleString([], { month: "long" });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  async function getMonthCashflow() {
    let expenses = [50, 100, 40, 870, 360, 200, 10];
    let incomes = [250, 450, 300, 100, 47, 2500, 7531];
    const labels = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    /* const [cateNames] = await Promise.all([getCategories()]); 
    const [transPerCat] = await Promise.all([getTotalPerCategory(User)]); */

    /* for (let i = 0; i < cateNames.length; i++) {
      categorias.push(cateNames[i].name);
    } */

    /* for (let j = 0; j < transPerCat.length; j++) {
      gastos[transPerCat[j].categoryId - 1] = transPerCat[j]._sum.amount;
    } */

    setLineChartData({
      labels,
      datasets: [
        {
          label: "Incomes",
          data: incomes.map((income) => income),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Expenses",
          data: expenses.map((expense) => expense),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  }

  useMemo(getMonthCashflow, []);

  return (
    <>
      <div className="monthGraphs">
        <h1 className="text-2xl p-2">My Cashflow of the week</h1>
        <div className="flex justify-center">
          <Line options={options} data={lineChartData} />
        </div>
      </div>
    </>
  );
}
