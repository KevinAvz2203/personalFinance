"use client";

import { useState } from "react";

export default function AddTransaction() {
  const [transaction, setTransaction] = useState("Income");

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
    category: "",
  });

  const handleInputChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: any) => {
    console.log(formData);
    console.log(transaction);
  };

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

          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="labelForm text-gray-700"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  className="inputForm focus:outline-none focus:bg-white focus:border-gray-500"
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Insert Description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="labelForm text-gray-700" htmlFor="amount">
                  Amount
                </label>
                <input
                  className="inputForm focus:outline-none focus:bg-white focus:border-gray-500"
                  id="amount"
                  name="amount"
                  type="text"
                  placeholder="Insert Amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="labelForm text-gray-700" htmlFor="date">
                  Date
                </label>
                <input
                  className="inputForm focus:outline-none focus:bg-white focus:border-gray-500"
                  id="date"
                  name="date"
                  type="text"
                  placeholder="Insert Date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
              {transaction === "Expense" ? (
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="labelForm text-gray-700" htmlFor="category">
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="inputForm focus:outline-none focus:bg-white focus:border-gray-500"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="null">Insert Category</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    <option value="category3">Category 3</option>
                    <option value="category4">Category 4</option>
                  </select>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="flex justify-end">
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
              >
                Add
              </button>
              <button
                className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
