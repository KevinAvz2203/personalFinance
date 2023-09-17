import { User } from "@prisma/client";

export async function getUserData(id: number): Promise<User> {
  const res = await fetch("http://localhost:3000/api/users/" + id);
  const data = await res.json();
  return data;
}
