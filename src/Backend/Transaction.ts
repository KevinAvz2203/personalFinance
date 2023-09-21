import { Transaction } from "@prisma/client";

type Amount = {
  amount: number;
};

type Balance = {
  amount: number;
  typeId: number;
};

export async function getIncomes(id: number): Promise<Amount> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/incomes/" + id
  );
  const data: Amount = await res.json();
  return data;
}

export async function getExpenses(id: number): Promise<Amount> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/expenses/" + id
  );
  const data: Amount = await res.json();
  return data;
}

export async function getTotalBalance(id: number): Promise<Balance> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/totalBalance/" + id
  );
  const data: Balance = await res.json();
  return data;
}

export async function getTotalPerCategory(id: number): Promise<Balance> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/percategory/" + id
  );
  const data = await res.json();
  return data;
}

export async function getPerDate(id: number): Promise<Balance> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/sumbydate/" + id
  );

  const data = await res.json();
  return data;
}

export async function getPerUser(id: number): Promise<Transaction> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/perUser/" + id
  );
  const data = await res.json();
  return data;
}
