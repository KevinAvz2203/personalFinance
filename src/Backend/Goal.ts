import prisma from "@/lib/prisma";
import { goals } from "@prisma/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type FavoriteGoals = Pick<
  goals,
  "id" | "name" | "totalAmount" | "currentAmount"
>;

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

type UserSumGoals = {
  totalSaved: number;
  totalGoalsAmount: number;
};

type CreateGoalData = Omit<
  goals,
  "id" | "createdAt" | "updatedAt" | "isComplete"
> & {
  isFavorite?: boolean;
};

type UpdateGoalData = Partial<Omit<goals, "id" | "createdAt" | "userId">>;

/* =========================== UTILS =========================== */

async function fetchFromApi<T>(
  url: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      console.error(`API Error (${url}): ${res.status} ${res.statusText}`);
      return null;
    }
    if (res.status === 204) {
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.error(`Network or fetch error (${url}):`, error);
    return null;
  }
}

export async function getTotalSavedGoals(id: number): Promise<UserSumGoals> {
  try {
    const aggregation = await prisma.goals.aggregate({
      _sum: {
        currentAmount: true,
        totalAmount: true,
      },
      where: {
        userId: id,
      },
    });

    return {
      totalSaved: aggregation._sum.currentAmount ?? 0,
      totalGoalsAmount: aggregation._sum.totalAmount ?? 0,
    };
  } catch (error) {
    console.error(`Error fetching total saved goals for user ${id}:`, error);
    return { totalSaved: 0, totalGoalsAmount: 0 };
  }
}

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export async function postGoal(
  goalData: any,
  isFavorite: Boolean
): Promise<goals | null> {
  goalData.isFavorite = isFavorite;
  goalData.userId = Number(goalData.userId);

  return await fetchFromApi<goals>(`${API_BASE_URL}/api/goals/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goalData),
  });
}

export async function getUserGoals(id: string): Promise<goals[]> {
  const data = await fetchFromApi<goals[]>(
    `${API_BASE_URL}/api/goals/user/${id}`
  );
  return data ?? [];
}

export async function getUserFavoriteGoals(
  id: string
): Promise<FavoriteGoals[]> {
  const data = await fetchFromApi<FavoriteGoals[]>(
    `${API_BASE_URL}/api/goals/user/favorites/${id}`
  );
  return data ?? [];
}

export async function getGoal(id: string): Promise<goals | null> {
  return await fetchFromApi<goals>(`${API_BASE_URL}/api/goals/${id}`);
}

export async function updateGoal(
  id: string,
  goalData: any,
  isFavorite: Boolean
) {
  goalData.isFavorite = isFavorite;

  goalData.currentAmount >= goalData.totalAmount
    ? ((goalData.isComplete = true), (goalData.isFavorite = false))
    : (goalData.isComplete = false);

  const res = await fetch(`http://localhost:3000/api/goals/${id}`, {
    method: "PUT",
    body: JSON.stringify(goalData),
  });
  const data = await res.json();
}
