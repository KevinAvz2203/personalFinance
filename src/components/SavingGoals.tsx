"use client";

import Image from "next/image";
import optionDots from "/public/assets/icons/optionDots.png";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import { getUserFavoriteGoals } from "@/Backend/Goal";

Chart.register(ArcElement, Tooltip, Legend);

type IncomeData = {
  User: number;
};

type FavoriteGoals = {
  id: number;
  name: string;
  totalAmount: number;
  currentAmount: number;
};

export default function SavingGoals({ User }: IncomeData) {
  const [userGoals, setUserGoals] = useState<FavoriteGoals[]>([]);

  useEffect(() => {
    async function getFavoriteGoalsProgress() {
      const [existingGoals]: any[] = await Promise.all([
        getUserFavoriteGoals(User),
      ]);
      setUserGoals(existingGoals);
    }

    getFavoriteGoalsProgress();
  }, [User]);

  return (
    <>
      <div className="savingGoals">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Saving Goals</h1>
          <Image src={optionDots} alt="add charge icon" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {userGoals.map((goal) => (
            <div key={goal.id} className="">
              <Doughnut
                data={{
                  labels: ["Saved", "Remaining"],
                  datasets: [
                    {
                      data: [
                        goal.currentAmount,
                        goal.totalAmount - goal.currentAmount,
                      ],
                      backgroundColor: ["#336699", "#99CCFF"],
                      borderColor: "#D1D6DC",
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  maintainAspectRatio: false,
                  responsive: true,
                }}
                plugins={[
                  {
                    id: "textCenter",
                    beforeDatasetsDraw(chart, args, pluginOptions) {
                      const { ctx, data } = chart;
                      const xCord = chart.getDatasetMeta(0).data[0].x;
                      const yCord = chart.getDatasetMeta(0).data[0].y;

                      const palabra = goal.name;
                      const arrPalabra = palabra.split(" ");

                      ctx.save();
                      ctx.fillStyle = "black";
                      ctx.textAlign = "center";
                      ctx.textBaseline = "middle";

                      // EDITAAAAAAAAR
                      // for (let i = 0; i < arrPalabra.length; i++) {
                      //   ctx.fillText(arrPalabra[i], xCord, yCord + brincoLinea);
                      //   brincoLinea += 5;
                      // }

                      ctx.fillText(goal.name, xCord, yCord);
                    },
                  },
                ]}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
