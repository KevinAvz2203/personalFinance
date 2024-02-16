import { getPerDate } from "@/Backend/Transaction";
import styles from "./Month.module.css";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
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

let delayed: any;
const options = {
  responsive: true,
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context: any) => {
      let delay = 0;
      if (context.type === "data" && context.mode === "default" && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        beginAtZero: true,
        callback: function (value: any, index: any, values: any) {
          return value / 1000 + "K";
        },
      },
      border: {
        dash: [10, 5],
      },
    },
  },
  plugins: {
    tooltip: {
      yAlign: "bottom",
    },
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
} as const;

type IncomeData = {
  User: number;
};

interface TransactionsByDate {
  createdAt: Date;
  typeId: number;
  amount: number;
}

interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    hoverBackgroundColor: string;
    borderRadius: { topRight: 10; topLeft: 10 };
  }[];
}

/* Dias de la semana */
const labels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function MonthCashFlow({ User }: IncomeData) {
  const [barChartData, setBarChartData] = useState<BarChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    /* Esta funcion realiza el fetch por la informacion a desplegar
      en la barra.
      
      Actualmente recibe todas las transacciones typeId = 2 del mes actual
      y las guarda en un arreglo, la POS corresponde al dia de la semana cuando se 
      realizaron, siendo de domingo - sabado
      
      Proximo update: Poder hacer fetch de la semana actual tambien */
    async function getMonthCashflow() {
      try {
        const perDate: TransactionsByDate[] = await getPerDate(User);

        /* forEach: Recorre el arreglo perDate y va asignando
        uno por uno en su POS del arreglo expenses correspondiente,
        es lo mismo que un FOR pero se lee mejor */
        const expenses = [0, 0, 0, 0, 0, 0, 0];
        perDate.forEach((item) => {
          const d = new Date(item.createdAt);
          const dayOfWeekDigit = d.getDay();
          const amountToAdd = Math.abs(item.amount);
          expenses[dayOfWeekDigit] += amountToAdd;
        });

        setBarChartData({
          labels: labels,
          datasets: [
            {
              label: "Total",
              data: expenses.map((expense) => expense),
              borderColor: "rgba(141, 169, 196, 0.4)",
              backgroundColor: "#8DA9C4",
              hoverBackgroundColor: "#134074",
              borderRadius: { topRight: 10, topLeft: 10 },
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching transactions:", error);
        // Handle error gracefully, e.g., show a message to the user
      }
    }

    getMonthCashflow();
  }, [User]);

  return (
    <>
      <div className={styles.cashFlow}>
        <div className={styles.header}>
          <div>
            <p>Transactions</p>
            <h2>Summary</h2>
          </div>
          <div className={styles.buttons}>
            <button className={styles.active}>Weekly</button>
            <button>Monthly</button>
          </div>
        </div>
        <div className={styles.barChart}>
          <Bar options={options} data={barChartData} />
        </div>
      </div>
    </>
  );
}
