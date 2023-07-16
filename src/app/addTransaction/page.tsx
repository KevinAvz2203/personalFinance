"use client";

import { useState } from "react";
import AddIncome from "../../components/AddIncome";
import AddExpense from "../../components/AddExpense";

export default function AddTransaction() {
  const [transaction, setTransaction] = useState("Income");

  const onOptionChange = (e: any) => {
    setTransaction(e.target.value);
  };

  return (
    <>
      <div className="addTransClass">
        <div className="addTransaction">
          <header>
            <h1>Add Income</h1>
          </header>

          <div className="p-2">
            <input
              type="radio"
              name="transaction"
              value="Income"
              id="income"
              checked={transaction === "Income"}
              onChange={onOptionChange}
            />
            <label htmlFor="income" className="pr-5">
              Income
            </label>

            <input
              type="radio"
              name="transaction"
              value="Expense"
              id="expense"
              checked={transaction === "Expense"}
              onChange={onOptionChange}
            />
            <label htmlFor="expense" className="pr-5">
              Expense
            </label>
          </div>

          {transaction === "Income" ? <AddIncome /> : <AddExpense />}
        </div>
      </div>
    </>
  );
}
