import { categories } from "@prisma/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getCategories(): Promise<categories[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/categories/`);

    if (!res.ok) {
      console.error(
        `Error fetching categories: ${res.status} ${res.statusText}`
      );
      return [];
    }

    const data = await res.json();

    return data as categories[];
  } catch (error) {
    console.error("Network or other error fetching categories:", error);
    return [];
  }
}
