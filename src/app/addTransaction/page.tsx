"use client";

import { getCategories } from "@/Backend/Category";
import { postTransaction } from "@/Backend/Transaction";
import { getUserData } from "@/Backend/User";
import { useState, useEffect, useMemo } from "react";

export default function AddTransaction() {
  const [transaction, setTransaction] = useState("Income");
  const [User, setUser] = useState(0);
  const [catNames, setCatNames] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    userId: User,
    categoryId: 3,
    typeId: 1,
  });

  async function getCategoriesNames() {
    let nombresCategorias = [];
    const [cateNames]: any[] = await Promise.all([getCategories()]); // Categories Name
    const [userData] = await Promise.all([getUserData(1)]);

    for (let i = 0; i < cateNames.length; i++) {
      nombresCategorias.push(cateNames[i].name);
    }

    setCatNames(nombresCategorias);
    setUser(userData.id);
  }

  useEffect(() => {
    getCategoriesNames();
    setFormData({
      description: "",
      amount: 0,
      userId: User,
      categoryId: 3,
      typeId: 1,
    });
  }, [User]);

  const pageRefresher = () => {
    window.location.reload(); // cambiar ruta
  };

  const handleInputChange = (e: any) => {
    if (e.target.name === "description") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    postTransaction(formData).then(pageRefresher);
  };

  const onOptionChange = (e: any) => {
    setTransaction(e.target.value);
    if (e.target.value === "Income") {
      setFormData({
        description: "",
        amount: 0,
        userId: User,
        categoryId: 3,
        typeId: 1,
      });
    } else {
      setFormData({
        description: "",
        amount: 0,
        userId: User,
        categoryId: 1,
        typeId: 2,
      });
    }
  };

  return (
    <>
      <div className="addTransClass">
        <div className="addTransaction">
          <header>
            <h1>Add a new transaction</h1>
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
                  required={true}
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
                  required={true}
                  className="inputForm focus:outline-none focus:bg-white focus:border-gray-500"
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Insert Amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>
              {transaction === "Expense" ? (
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="labelForm text-gray-700"
                    htmlFor="categoryId"
                  >
                    Category
                  </label>
                  <select
                    required={true}
                    name="categoryId"
                    id="categoryId"
                    className="inputForm focus:outline-none focus:bg-white focus:border-gray-500"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                  >
                    <option defaultChecked disabled>
                      Select Category
                    </option>

                    {catNames.map(
                      (category, index) =>
                        category !== "Income" && (
                          <option key={index} value={index + 1}>
                            {category}
                          </option>
                        )
                    )}
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
