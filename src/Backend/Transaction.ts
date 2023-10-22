import { Transaction } from "@prisma/client";

type Amount = {
  amount: number;
};

type Balance = {
  amount: number;
  typeId: number;
};

type TransactionsData = {
  id: number;
  description: string;
  amount: number;
  createdAt: Date;
  userId: number;
  categoryId: number;
  typeId: number;
  category: {
    id: number;
    name: string;
  };
};

type TransactionsByDate = {
  createdAt: Date;
  typeId: number;
  amount: number;
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

export async function getTotalBalance(id: number): Promise<Amount> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/totalBalance/" + id
  );
  const data: Amount = await res.json();
  return data;
}

export async function getTotalPerCategory(id: number) {
  const res = await fetch(
    "http://localhost:3000/api/transactions/percategory/" + id
  );
  const data = await res.json();
  return data;
}

export async function getPerDate(id: number): Promise<TransactionsByDate> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/sumbydate/" + id
  );

  const data = await res.json();
  return data;
}

export async function getPerUser(id: number): Promise<TransactionsData> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/perUser/" + id
  );
  const data = await res.json();
  return data;
}

export async function postTransaction(transactionData: any) {
  if (transactionData.typeId === 2) {
    transactionData.typeId = 2;
    transactionData.amount = transactionData.amount * -1;
  }

  const res = await fetch("http://localhost:3000/api/transactions/", {
    method: "POST",
    body: JSON.stringify(transactionData),
  });
  const data = await res.json();
  console.log(data);
}
