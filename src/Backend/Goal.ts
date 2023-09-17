import { Goal } from "@prisma/client";

export async function getTotalSavedGoals(id: number): Promise<Goal> {
  const res = await fetch("http://localhost:3000/api/goals/users/" + id);
  const data = await res.json();
  return data;
}
