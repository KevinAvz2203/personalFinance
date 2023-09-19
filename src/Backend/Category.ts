import { Category } from "@prisma/client";

export async function getCategories(): Promise<Category> {
  const res = await fetch("http://localhost:3000/api/categories/");
  const data = await res.json();
  return data;
}
