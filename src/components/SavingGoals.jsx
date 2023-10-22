import Image from "next/image";
import optionDots from "/public/assets/icons/optionDots.png";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import { getUserGoals } from "@/Backend/Goal";

Chart.register(ArcElement, Tooltip, Legend);

export default function SavingGoals({ User }) {
  const [userGoals, setUserGoals] = useState([]);
  let favoriteGoals = [];

  useEffect(() => {
    async function getFavoriteGoalsProgress() {
      const [existingGoals] = await Promise.all([getUserGoals(User)]);
      setUserGoals(existingGoals);
    }

    getFavoriteGoalsProgress();
  }, [User]);

  for (let i = 0; i < userGoals.length; i++) {
    if (userGoals[i].isFavorite === true && favoriteGoals.length < 4) {
      favoriteGoals.push(userGoals[i]);
    }
  }

  return (
    <>
      <div className="savingGoals">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Saving Goals</h1>
          <Image src={optionDots} alt="add charge icon" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {favoriteGoals.map((goal, index) => (
            <div key={index} className="testing">
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
                      display: true,
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
                  elements: {
                    center: {
                      color: "#FF6384", // Default is #000000
                      fontStyle: "Arial", // Default is Arial
                      sidePadding: 20, // Default is 20 (as a percentage)
                      minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
                      lineHeight: 25, // Default is 25 (in px), used for when text wraps
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
                      ctx.textBaseLine = "middle";

                      /* EDITAAAAAAAAR */
                      /* for (let i = 0; i < arrPalabra.length; i++) {
                        ctx.fillText(arrPalabra[i], xCord, yCord + brincoLinea);
                        brincoLinea += 5;
                      } */

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
