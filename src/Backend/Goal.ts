import { Goal } from "@prisma/client";

export async function getTotalSavedGoals(id: number): Promise<Goal> {
  const res = await fetch("http://localhost:3000/api/goals/userSummary/" + id);
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

export async function getUserGoals(id: number): Promise<Goal> {
  const res = await fetch("http://localhost:3000/api/goals/users/" + id);
  const data = await res.json();
  return data;
}

export async function getGoal(id: number): Promise<Goal> {
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
