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
  category: {
    name: string;
  };
};

type PostTransactionData = {
  description: string;
  amount: number;
  userId: number;
  typeId: number;
  categoryId: number;
};

type TransactionsByDate = {
  createdAt: Date;
  typeId: number;
  amount: number;
};

type PrevMonthsTransaction = {
  month: number;
  Categoria: string;
  total_amount: number;
};

type TotalPerCategory = {
  _sum: {
    amount: number;
  };
  categoryId: number;
};

export async function getPerUser(id: number): Promise<TransactionsData[]> {
  const res = await fetch("http://localhost:3000/api/transactions/user/" + id);
  const data = await res.json();
  return data;
}

export async function getRecentPerUser(
  id: number
): Promise<TransactionsData[]> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/user/recent/" + id
  );
  const data = await res.json();
  return data;
}

/* ======================================== */
export async function getHistoricPerUser(
  id: number,
  period: "Weekly" | "Monthly" | "Yearly"
): Promise<TransactionsData[]> {
  try {
    const res = await fetch(
      `http://localhost:3000/api/transactions/user/historic/${id}?period=${period}`
    );

    // Check if the request was successful
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

/* ========================================= */

export async function getIncomes(id: number): Promise<Amount> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/user/incomes/" + id
  );
  const data: Amount = await res.json();
  return data;
}

export async function getExpenses(id: number): Promise<Amount> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/user/expenses/" + id
  );
  const data: Amount = await res.json();
  return data;
}

export async function getTotalBalance(id: number): Promise<Amount> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/user/totalBalance/" + id
  );
  const data: Amount = await res.json();
  return data;
}

export async function getTotalPerCategory(
  id: number
): Promise<TotalPerCategory[]> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/user/percategory/" + id
  );
  const data = await res.json();
  return data;
}

export async function getPerDate(id: number): Promise<TransactionsByDate[]> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/user/sumbydate/" + id
  );

  const data = await res.json();
  return data;
}

export async function getPrevMonths(
  id: number
): Promise<PrevMonthsTransaction[]> {
  const res = await fetch(
    "http://localhost:3000/api/transactions/user/prevMonths/" + id
  );

  const data = await res.json();
  return data;
}

export async function postTransaction(transactionData: PostTransactionData) {
  transactionData.amount = Number(transactionData.amount);
  transactionData.categoryId = Number(transactionData.categoryId);

  if (transactionData.typeId === 2) {
    transactionData.typeId = 2;
    transactionData.amount = transactionData.amount * -1;
  }

  console.log(transactionData);

  const res = await fetch("http://localhost:3000/api/transactions/", {
    method: "POST",
    body: JSON.stringify(transactionData),
  });
  const data = await res.json();
  console.log(data);
}
