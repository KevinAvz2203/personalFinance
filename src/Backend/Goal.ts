import { Goals } from "@prisma/client";

type userSumGoals = {
  totalSaved: number;
  totalGoalsAmount: number;
};

type FavoriteGoals = {
  id: number;
  name: string;
  totalAmount: number;
  currentAmount: number;
};

export async function getTotalSavedGoals(id: number): Promise<userSumGoals> {
  const res = await fetch("http://localhost:3000/api/goals/user/summary/" + id);
  const data = await res.json();
  return data;
}

export async function postGoal(goalData: any, isFavorite: Boolean) {
  goalData.isFavorite = isFavorite;
  console.log(goalData);

  const res = await fetch("http://localhost:3000/api/goals/", {
    method: "POST",
    body: JSON.stringify(goalData),
  });
  const data = await res.json();
  console.log(data);
}

export async function getUserGoals(id: number): Promise<Goals[]> {
  const res = await fetch("http://localhost:3000/api/goals/user/" + id);
  const data = await res.json();
  return data;
}

export async function getUserFavoriteGoals(
  id: number
): Promise<FavoriteGoals[]> {
  const res = await fetch(
    "http://localhost:3000/api/goals/user/favorites/" + id
  );
  const data = await res.json();
  return data;
}

export async function getGoal(id: number): Promise<Goals> {
  const res = await fetch("http://localhost:3000/api/goals/" + id);
  const data = await res.json();
  return data;
}

export async function updateGoal(
  id: number,
  goalData: any,
  isFavorite: Boolean
) {
  goalData.isFavorite = isFavorite;

  goalData.currentAmount >= goalData.totalAmount
    ? ((goalData.isComplete = true), (goalData.isFavorite = false))
    : (goalData.isComplete = false);

  const res = await fetch("http://localhost:3000/api/goals/" + id, {
    method: "PUT",
    body: JSON.stringify(goalData),
  });
  const data = await res.json();
  console.log(data);
}
