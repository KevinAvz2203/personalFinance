"use client";

import Link from "next/link";
import { useState } from "react";

export default function AddGoal() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
  });

  const handleInputChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: any) => {
    console.log(formData);
  };

  return (
    <>
      <div className="addTransClass">
        <div className="addTransaction">
          <header>
            <h1>Setting a New Goal!</h1>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="labelForm text-gray-700" htmlFor="name">
                  Goal Name
                </label>
                <input
                  className="inputForm focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Insert Goal Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="labelForm text-gray-700" htmlFor="amount">
                  Total Goal Amount
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
            </div>

            <div className="flex justify-end">
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
              >
                Add
              </button>
              <Link href={"/goals"}>
                <button
                  className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                  type="button"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
