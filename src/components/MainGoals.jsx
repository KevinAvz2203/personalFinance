import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import { getUserGoals } from "@/Backend/Goal";

Chart.register(ArcElement, Tooltip, Legend);

export default function MainGoals({ User }) {
  const [userGoals, setUserGoals] = useState([]);
  let favoriteGoals = [];

  useEffect(() => {
    async function getSemiChartData() {
      const [existingGoals] = await Promise.all([getUserGoals(User)]);
      setUserGoals(existingGoals);
    }

    getSemiChartData();
  }, [User]);

  for (let i = 0; i < userGoals.length; i++) {
    if (userGoals[i].isFavorite === true && favoriteGoals.length < 4) {
      favoriteGoals.push(userGoals[i]);
    }
  }

  return (
    <>
      <div className="mainGoals">
        {favoriteGoals.map((goal, index) => (
          <div key={index}>
            <Doughnut
              className=""
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
                rotation: -90,
                circumference: 180,
                cutout: "60%",
                maintainAspectRatio: false,
                responsive: true,
              }}
            />
            <p className="text-center text-2xl">{goal.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
