import prisma from "@/lib/prisma";

type Amount = {
  amount: number;
};

type MonthAmount = {
  t_incomes: number;
  t_expenses: number;
};

type Balance = {
  amount: number;
  typeId: number;
};

type TransactionSum = {
  t_incomes: number | null;
  t_expenses: number | null;
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

type UserSumGoals = {
  totalSaved: number;
  totalGoalsAmount: number;
};

/* =========================== UTILS FUNCTIONS STARTS =========================== */

function getCurrentMonthLength() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return { lte: endOfMonth.toISOString(), gte: startOfMonth.toISOString() };
}

/* =========================== UTILS FUNCTIONS ENDS  =========================== */

/* =========================== API CALLS START =========================== */

export async function getPerUser(id: string): Promise<TransactionsData[]> {
  const res = await fetch(`http://localhost:3000/api/transactions/user/${id}`);
  const data = await res.json();
  return data;
}

export async function getHistoricPerUser(
  id: string,
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

export async function getIncomes(id: string): Promise<Amount> {
  const res = await fetch(
    `http://localhost:3000/api/transactions/user/incomes/${id}`
  );
  const data: Amount = await res.json();
  return data;
}

export async function getExpenses(id: string): Promise<Amount> {
  const res = await fetch(
    `http://localhost:3000/api/transactions/user/expenses/${id}`
  );
  const data: Amount = await res.json();
  return data;
}

export async function getGeneralBalance(id: string): Promise<MonthAmount> {
  const res = await fetch(
    `http://localhost:3000/api/transactions/user/generalBalance/allTime/${id}`
  );
  const data: MonthAmount = await res.json();
  return data;
}

export async function getTotalPerCategoryClient(
  id: string,
  period: "Weekly" | "Monthly" | "Yearly"
): Promise<TotalPerCategory[]> {
  try {
    const res = await fetch(
      `http://localhost:3000/api/transactions/user/percategory/${id}?period=${period}`
    );

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

export async function getPerDate(
  id: string,
  period: "Weekly" | "Monthly"
): Promise<TransactionsByDate[]> {
  try {
    const res = await fetch(
      `http://localhost:3000/api/transactions/user/sumbydate/${id}?period=${period}`
    );

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

export async function getPrevMonths(
  id: string
): Promise<PrevMonthsTransaction[]> {
  const res = await fetch(
    `http://localhost:3000/api/transactions/user/prevMonths/${id}`
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

/* =========================== API CALLS ENDS  =========================== */

/* =========================== API ROUTES TO BE DELETED  =========================== */

/* export async function getRecentPerUser(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/transactions/user/recent/${id}`
  );
  const data = await res.json();
  return data;
} */

/* export async function getTotalBalance(id: string): Promise<Amount> {
  const res = await fetch(
    `http://localhost:3000/api/transactions/user/totalBalance/${id}`
  );
  const data: Amount = await res.json();
  return data;
} */

/* export async function getMonthlyGeneralBalance(
  id: string
): Promise<MonthAmount> {
  const res = await fetch(
    `http://localhost:3000/api/transactions/user/generalBalance/montly/${id}`
  );
  const data: MonthAmount = await res.json();
  return data;
} */

/* ================================================================================= */

export async function getRecentPerUser(id: string) {
  const transactions = await prisma.transactions.findMany({
    where: {
      userId: Number(id),
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!transactions) throw new Error("Transaction not found");
  return { transactions };
}

export async function getTotalBalance(id: string) {
  const transactions = await prisma.transactions.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId: Number(id),
    },
  });

  if (!transactions) {
    throw new Error("Transaction not found");
  }

  const userGoals = await prisma.goals.findMany({
    where: {
      userId: Number(id),
    },
  });

  if (!userGoals) {
    throw new Error("User goals not found");
  }

  const data = userGoals.reduce<UserSumGoals>(
    (acc, goal) => {
      acc.totalSaved += goal.currentAmount || 0;
      acc.totalGoalsAmount += goal.totalAmount || 0;
      return acc;
    },
    { totalSaved: 0, totalGoalsAmount: 0 }
  );

  transactions._sum.amount = (transactions._sum.amount ?? 0) - data.totalSaved;

  return { totalBalance: transactions._sum.amount, ...data };
}

export async function getMonthlyGeneralBalance(
  id: string
): Promise<TransactionSum> {
  const { lte, gte } = getCurrentMonthLength();

  const transactions = await prisma.transactions.groupBy({
    by: ["typeId"],
    where: {
      userId: Number(id),
      createdAt: {
        lte,
        gte,
      },
    },
    _sum: {
      amount: true,
    },
  });

  const result = transactions.reduce<TransactionSum>(
    (acc, curr) => {
      if (curr.typeId === 1) {
        acc.t_incomes = curr._sum.amount || 0;
      } else {
        acc.t_expenses = curr._sum.amount || 0;
      }
      return acc;
    },
    { t_incomes: 0, t_expenses: 0 }
  );

  return result;
}

/* export async function getTotalPerCategoryServer(
  id: string,
  period: "Weekly" | "Monthly" | "Yearly"
): Promise<TotalPerCategory[]> {
  try {
    const res = await fetch(
      `http://localhost:3000/api/transactions/user/percategory/${id}?period=${period}`
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
} */

export async function getTotalPerCategoryServer(
  id: string,
  period: "Weekly" | "Monthly" | "Yearly"
) {
  let dateOffset;
  switch (period) {
    case "Monthly":
      dateOffset = 30; // Last 30 days
      break;
    case "Yearly":
      dateOffset = 365; // Last 365 days
      break;
    case "Weekly":
    default:
      dateOffset = 7; // Last 7 days
      break;
  }

  const transactions = await prisma.transactions.groupBy({
    by: ["categoryId"],
    _sum: {
      amount: true,
    },
    where: {
      userId: Number(id),
      typeId: 2,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - dateOffset)),
      },
    },
    orderBy: {
      categoryId: "asc",
    },
  });

  if (!transactions || transactions.length === 0)
    throw new Error("Transaction not found");

  return transactions;
}
