import { getUserGoals } from "@/Backend/Goal";
import ProgressBar from "@/components/ProgressBar";
import { useState, useEffect } from "react";

export default function GoalsTable({ User }) {
  const [userGoals, setUserGoals] = useState([]);
  const maxFavorites = 4;
  let activeFavotires = 0;

  useEffect(() => {
    async function getSingleUserGoals() {
      const [existingGoals] = await Promise.all([getUserGoals(User)]);
      setUserGoals(existingGoals);
    }

    getSingleUserGoals();
  }, [User]);

  for (let i = 0; i < userGoals.length; i++) {
    if (userGoals[i].isFavorite === true) {
      activeFavotires++;
    }
  }

  return (
    <>
      <div className="tableBox">
        <div className="goalsTable pt-4">
          {userGoals.map((goal) => (
            <div className="goalInstance" key={goal.id}>
              <div className="goalTitle">
                <p>
                  {goal.name}
                  <button
                    onClick={async () => {
                      console.log(goal);
                    }}
                  >
                    - edit
                  </button>
                </p>
                <p>
                  ${goal.currentAmount} of ${goal.totalAmount} MXN
                </p>
              </div>

              <ProgressBar
                key={goal.id}
                completed={(
                  (Number(goal.currentAmount) / Number(goal.totalAmount)) *
                  100
                ).toFixed(1)}
              />
            </div>
          ))}

          <p>
            Active Favorites: {activeFavotires}/{maxFavorites}
          </p>
        </div>
      </div>
    </>
  );
}
