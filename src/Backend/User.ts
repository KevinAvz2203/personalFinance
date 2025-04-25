import { users } from "@prisma/client";

const API_BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function getUserData(id: number): Promise<users | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users/${id}`);

    if (!res.ok) {
      console.error(
        `Error fetching user ${id}: ${res.status} ${res.statusText}`
      );

      return null;
    }

    const data: users = await res.json();
    return data;
  } catch (error) {
    console.error("Network or other error fetching user data:", error);

    return null;
  }
}
