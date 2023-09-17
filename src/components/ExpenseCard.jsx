import Image from "next/image";
import expenseIcon from "/public/assets/icons/expenseIcon.png";
import { useState, useMemo } from "react";
import { getExpenses } from "@/Backend/Transaction";

export default function ExpenseCard({ User }) {
  const [expense, setExpense] = useState(0);

  async function getUserData() {
    const [data] = await Promise.all([getExpenses(User)]);
    setExpense(data.amount);
  }

  useMemo(getUserData, [User]);

  return (
    <>
      <div className="topCards bg-neutral-300	">
        <Image src={expenseIcon} alt="Expense Icon" width={50} height={50} />
        <div>
          <p>${expense | 0} MXN</p>
          <p>Expenses</p>
        </div>
      </div>
    </>
  );
}
