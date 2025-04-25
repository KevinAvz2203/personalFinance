"use client";

import { getGoal, updateGoal } from "@/Backend/Goal";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/addTransGoal.module.css";

interface Params {
  params: { id: number };
}

export default function AddGoal({ params }: Params) {
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    totalAmount: 0,
    currentAmount: 0,
    userId: params.id,
    isComplete: false,
    isFavorite: false, // Agregar al schema
  });

  async function getUserSetFormData() {
    /* EDITAR */
    const [goalData] = await Promise.all([getGoal(params.id.toString())]);

    setFormData({
      name: goalData.name,
      totalAmount: goalData.totalAmount,
      currentAmount: goalData.currentAmount || 0,
      userId: goalData.userId,
      isComplete: goalData.isComplete,
      isFavorite: false,
    });
  }

  useMemo(getUserSetFormData, [params.id]);

  const handleInputChange = (event: any) => {
    if (
      event.target.name === "currentAmount" ||
      event.target.name === "totalAmount"
    ) {
      setFormData({
        ...formData,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleCheckChange = (event: any) => {
    setIsFavorite(!isFavorite);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateGoal(params.id.toString(), formData, isFavorite).then(() =>
      router.push("/goals")
    );
  };

  return (
    <>
      <div className={styles.addTransClass}>
        <div className={styles.addTransaction}>
          <header>
            <h1>Update your current goal!</h1>
          </header>

          <form onSubmit={handleSubmit} className="p-2">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className={`${styles.labelForm} text-gray-700`}
                  htmlFor="name"
                >
                  Goal Name
                </label>
                <input
                  required={true}
                  className={`${styles.inputForm} focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Insert Goal Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className={`${styles.labelForm} text-gray-700`}
                  htmlFor="totalAmount"
                >
                  Total Goal Amount
                </label>
                <input
                  required={true}
                  className={`${styles.inputForm} focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="totalAmount"
                  name="totalAmount"
                  type="number"
                  placeholder="Insert Amount"
                  value={formData.totalAmount}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className={`${styles.labelForm} text-gray-700`}
                  htmlFor="currentAmount"
                >
                  Current Saved Amount
                </label>
                <input
                  className={`${styles.inputForm} focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="currentAmount"
                  name="currentAmount"
                  type="number"
                  placeholder="Insert Amount"
                  value={formData.currentAmount}
                  onChange={handleInputChange}
                />
              </div>

              {/* Editar este label porque no funciona como quiero */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className={`${styles.labelForm} text-gray-700`}
                  htmlFor="favorite"
                >
                  Favorite Goal
                </label>
                <label className="relative inline-flex items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={handleCheckChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
              >
                Update
              </button>
              <button
                className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                type="button"
                onClick={() => router.push("/goals")}
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
