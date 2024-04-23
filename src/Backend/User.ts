import { Users } from "@prisma/client";

export async function getUserData(id: number): Promise<Users> {
  const res = await fetch("http://localhost:3000/api/users/" + id);
  const data = await res.json();
  return data;
}
