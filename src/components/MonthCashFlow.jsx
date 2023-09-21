import { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { getPerDate } from "@/Backend/Transaction";
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
  const monthNum = new Date().getMonth();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    maintainAspectRatio: true,
  };

  async function getMonthCashflow() {
    let expenses = [0, 0, 0, 0, 0, 0, 0];
    let incomes = [0, 0, 0, 0, 0, 0, 0];
    const labels = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const [perDate] = await Promise.all([getPerDate(User)]);

    for (let i = 0; i < perDate.length; i++) {
      let text = perDate[i].createdAt;
      const newCreateAt = text.split("T");
      perDate[i].createdAt = newCreateAt[0];
    }

    for (let i = 0; i < perDate.length; i++) {
      let text = perDate[i].createdAt;
      const newCreateAt = text.split("-");
      const year = Number(newCreateAt[0]);
      const month = Number(newCreateAt[1]);
      const day = Number(newCreateAt[2]);

      const dayOfWeekDigit = new Date(year, month - 1, day).getDay();

      if (perDate[i].typeId == 1 && monthNum == month - 1) {
        incomes[dayOfWeekDigit] += perDate[i].amount;
      } else if (perDate[i].typeId == 2 && monthNum == month - 1) {
        expenses[dayOfWeekDigit] += perDate[i].amount;
      }
    }

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

  useMemo(getMonthCashflow, [User, monthNum]);

  return (
    <>
      <div className="cashFlow">
        <h1 className="text-2xl p-2" suppressHydrationWarning={true}>
          My Cashflow of {currMonth}
        </h1>
        <div style={{ width: "100%", height: "100%" }}>
          <Line options={options} data={lineChartData} />
        </div>
      </div>
    </>
  );
}
