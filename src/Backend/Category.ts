import { Categories } from "@prisma/client";

export async function getCategories(): Promise<Categories[]> {
  const res = await fetch("http://localhost:3000/api/categories/");
  const data = await res.json();
  return data;
}
