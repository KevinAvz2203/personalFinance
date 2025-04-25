import prisma from "@/lib/prisma";

const API_BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

type Amount = {
  amount: number;
};

type MonthAmount = {
  t_incomes: number;
  t_expenses: number;
};

type TransactionSum = {
  t_incomes: number | null;
  t_expenses: number | null;
};

type TransactionsData = {
  id: number;
  description: string;
  amount: number;
  date: Date;
  categories: {
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
  date: Date;
  typeId: number;
  amount: number;
};

type PrevMonthsTransaction = {
  month: number;
  categoria: string;
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

function getStartDateFromPeriod(period: "Weekly" | "Monthly" | "Yearly"): Date {
  let dateOffset;
  switch (period) {
    case "Monthly":
      dateOffset = 30;
      break;
    case "Yearly":
      dateOffset = 365;
      break;
    case "Weekly":
    default:
      dateOffset = 7;
      break;
  }
  return new Date(new Date().setDate(new Date().getDate() - dateOffset));
}

// * Template para manejar errores de fetch y parseo de JSON
async function fetchFromApi<T>(
  url: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      console.error(`API Error (${url}): ${res.status} ${res.statusText}`);
      return null; // O lanzar un error específico
    }
    // Solo intentar parsear JSON si la respuesta fue OK
    return (await res.json()) as T;
  } catch (error) {
    console.error(`Network or fetch error (${url}):`, error);
    return null;
  }
}

/* =========================== UTILS FUNCTIONS ENDS  =========================== */

/* =========================== API CALLS START =========================== */

export async function getPerUser(id: string): Promise<TransactionsData[]> {
  const data = await fetchFromApi<TransactionsData[]>(
    `${API_BASE_URL}/api/transactions/user/${id}`
  );
  return data ?? []; // Devolver array vacío si fetch falla o devuelve null
}

export async function getHistoricPerUser(
  id: string,
  period: "Weekly" | "Monthly" | "Yearly"
): Promise<TransactionsData[]> {
  const data = await fetchFromApi<TransactionsData[]>(
    `${API_BASE_URL}/api/transactions/user/historic/${id}?period=${period}`
  );
  return data ?? [];
}

export async function getIncomes(id: string): Promise<Amount | null> {
  return await fetchFromApi<Amount>(
    `${API_BASE_URL}/api/transactions/user/incomes/${id}`
  );
}

export async function getExpenses(id: string): Promise<Amount | null> {
  return await fetchFromApi<Amount>(
    `${API_BASE_URL}/api/transactions/user/expenses/${id}`
  );
}

export async function getGeneralBalance(
  id: string
): Promise<MonthAmount | null> {
  return await fetchFromApi<MonthAmount>(
    `${API_BASE_URL}/api/transactions/user/generalBalance/allTime/${id}`
  );
}

export async function getTotalPerCategoryClient(
  id: string,
  period: "Weekly" | "Monthly" | "Yearly"
): Promise<TotalPerCategory[]> {
  const data = await fetchFromApi<TotalPerCategory[]>(
    `${API_BASE_URL}/api/transactions/user/percategory/${id}?period=${period}`
  );
  return data ?? [];
}

export async function getPerDate(
  id: string,
  period: "Weekly" | "Monthly"
): Promise<TransactionsByDate[]> {
  const data = await fetchFromApi<TransactionsByDate[]>(
    `${API_BASE_URL}/api/transactions/user/sumbydate/${id}?period=${period}`
  );
  return data ?? [];
}

export async function getPrevMonths(
  id: string
): Promise<PrevMonthsTransaction[]> {
  const data = await fetchFromApi<PrevMonthsTransaction[]>(
    `${API_BASE_URL}/api/transactions/user/prevMonths/${id}`
  );
  return data ?? [];
}

export async function postTransaction(
  transactionData: PostTransactionData
): Promise<TransactionsData | null> {
  const payload = { ...transactionData };

  payload.amount = Number(payload.amount);
  payload.categoryId = Number(payload.categoryId);
  payload.userId = Number(payload.userId);

  if (payload.typeId === 2) {
    payload.amount = Math.abs(payload.amount) * -1;
  } else {
    payload.amount = Math.abs(payload.amount);
  }

  return await fetchFromApi<TransactionsData>(
    `${API_BASE_URL}/api/transactions/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
}

/* =========================== API CALLS ENDS  =========================== */

/* =========================== FUNCIONES PRISMA  =========================== */

export async function getRecentPerUser(id: string) {
  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        userId: Number(id),
        date: { gte: getStartDateFromPeriod("Weekly") },
      },
      include: { categories: true },
      orderBy: { date: "desc" },
    });

    if (!transactions) throw new Error("Transaction not found");
    return { transactions };
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    return [];
  }
}

export async function getTotalBalance(id: string) {
  try {
    const balanceAgg = await prisma.transactions.aggregate({
      _sum: { amount: true },
      where: { userId: Number(id) },
    });

    const goalsAgg = await prisma.goals.aggregate({
      _sum: { currentAmount: true, totalAmount: true },
      where: { userId: Number(id) },
    });

    const totalBalance =
      (balanceAgg._sum.amount ?? 0) - (goalsAgg._sum.currentAmount ?? 0);
    const totalGoalsAmount = goalsAgg._sum.totalAmount ?? 0;
    const totalSaved = goalsAgg._sum.currentAmount ?? 0;

    return { totalBalance, totalSaved, totalGoalsAmount };
  } catch (error) {
    console.error("Error calculating total balance:", error);
    return { totalBalance: 0, totalSaved: 0, totalGoalsAmount: 0 };
  }
}

export async function getMonthlyGeneralBalance(
  id: string
): Promise<TransactionSum> {
  try {
    const { lte, gte } = getCurrentMonthLength();
    const monthlyAgg = await prisma.transactions.groupBy({
      by: ["typeId"],
      where: { userId: Number(id), date: { lte, gte } },
      _sum: { amount: true },
    });

    const result: TransactionSum = { t_incomes: 0, t_expenses: 0 };
    monthlyAgg.forEach((group) => {
      if (group.typeId === 1) {
        result.t_incomes = group._sum.amount ?? 0;
      } else {
        result.t_expenses = group._sum.amount ?? 0;
      }
    });
    return result;
  } catch (error) {
    console.error("Error fetching monthly balance:", error);
    return { t_incomes: 0, t_expenses: 0 };
  }
}

export async function getTotalPerCategoryServer(
  id: string,
  period: "Weekly" | "Monthly" | "Yearly"
) {
  try {
    const startDate = getStartDateFromPeriod(period);
    const transactions = await prisma.transactions.groupBy({
      by: ["categoryId"],
      _sum: {
        amount: true,
      },
      where: {
        userId: Number(id),
        typeId: 2, // Solo gastos
        date: {
          gte: startDate,
        },
      },
      orderBy: {
        categoryId: "asc",
      },
    });

    if (!transactions || transactions.length === 0)
      throw new Error("Transaction not found");

    return transactions;
  } catch (error) {
    console.error(`Error fetching total per category (${period}):`, error);
    return [];
  }
}
