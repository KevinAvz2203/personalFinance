import { Goal } from "@prisma/client";

type GoalSummary = {
  currentAmount: number;
  totalAmount: number;
};

export async function getGoals(id: number): Promise<GoalSummary> {
  const res = await fetch("http://localhost:3000/api/goals/" + id);
  const data = await res.json();
  return data;
}
