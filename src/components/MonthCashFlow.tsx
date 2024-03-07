import { getPerDate } from "@/Backend/Transaction";
import styles from "./Month.module.css";
import { useState, useEffect, useCallback } from "react";
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

type DataState = {
  Weekly: TransactionsByDate[] | null;
  Monthly: TransactionsByDate[] | null;
};

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
  /* DIVISION */
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState<"Weekly" | "Monthly">(
    "Weekly"
  );
  const [data, setData] = useState<DataState>({
    Weekly: null,
    Monthly: null,
  });

  const handleClick = useCallback((button: "Weekly" | "Monthly") => {
    setActiveButton(button);
  }, []);

  useEffect(() => {
    /* Esta funcion realiza el fetch por la informacion a desplegar
      en la barra.
      
      Actualmente recibe todas las transacciones typeId = 2 del mes actual
      y las guarda en un arreglo, la POS corresponde al dia de la semana cuando se 
      realizaron, siendo de domingo - sabado
      
      Proximo update: Poder hacer fetch de la semana actual tambien */
    async function getMonthCashflow(period: "Weekly" | "Monthly") {
      try {
        setIsLoading(true);
        const perDate: TransactionsByDate[] = await getPerDate(User, period);

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

        setData((prevData) => ({ ...prevData, [period]: expenses }));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        // Handle error gracefully, e.g., show a message to the user
      }
    }

    if (!data[activeButton]) {
      getMonthCashflow(activeButton);
    }
  }, [User, activeButton, data]);

  return (
    <>
      <div className={styles.cashFlow}>
        <div className={styles.header}>
          <div>
            <p>Transactions</p>
            <h2>Summary</h2>
          </div>
          <div className={styles.buttons}>
            {["Weekly", "Monthly"].map((button) => (
              <button
                key={button}
                className={activeButton === button ? styles.active : ""}
                onClick={() => handleClick(button as "Weekly" | "Monthly")}
              >
                {button}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.barChart}>
          {data[activeButton] && (
            <Bar
              options={options}
              data={{
                labels: labels,
                datasets: [
                  {
                    label: "Total",
                    data: data[activeButton]?.map((expense) => expense),
                    borderColor: "rgba(141, 169, 196, 0.4)",
                    backgroundColor: "#8DA9C4",
                    hoverBackgroundColor: "#134074",
                    borderRadius: { topRight: 10, topLeft: 10 },
                  },
                ],
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
