"use client";

import { getCategories } from "@/Backend/Category";
import { postTransaction } from "@/Backend/Transaction";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/addTransGoal.module.css";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Category {
  id: number;
  name: string;
}

type FormValues = {
  description: string;
  amount: number;
  userId: number;
  typeId: number;
  categoryId: number;
};

export default function AddTransaction() {
  const { data: session } = useSession();
  const [transaction, setTransaction] = useState("Income");
  const [catNames, setCatNames] = useState<string[]>([]);

  let UserID = 0;

  if (session?.user) {
    UserID = session.user.id || 0;
  }

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      description: "",
      amount: 0,
      userId: UserID,
      typeId: 1,
      categoryId: 1,
    },
  });

  useEffect(() => {
    async function getCategoriesNames() {
      const categories: Category[] = await getCategories();
      const nombresCategorias = categories.map((cate) => cate.name);

      if (session?.user) {
        UserID = session.user.id || 0;
      }

      setCatNames(nombresCategorias);
    }

    getCategoriesNames();
  }, [UserID]);

  const pageRefresher = () => {
    window.location.reload(); // cambiar ruta
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    postTransaction(data).then(pageRefresher);
  };

  const onOptionChange = (e: any) => {
    setTransaction(e.target.value);
    if (e.target.value === "Income") {
      setValue("typeId", 1);
      setValue("categoryId", 1);
    } else {
      setValue("typeId", 2);
      setValue("categoryId", 2);
    }
  };

  return (
    <>
      <div className={styles.addTransClass}>
        <div className={styles.addTransaction}>
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="labelForm text-gray-700"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Transaction name is required",
                    },
                  })}
                  className={`${styles.inputForm} focus:outline-none focus:bg-white focus:border-gray-500`}
                  placeholder="Transaction name"
                />
                {errors.description && (
                  <span className="text-red-500 text-xs">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="labelForm text-gray-700" htmlFor="amount">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  {...register("amount", {
                    required: {
                      value: true,
                      message: "Total amount is required",
                    },
                  })}
                  className={`${styles.inputForm} focus:outline-none focus:bg-white focus:border-gray-500`}
                  placeholder="Total amount"
                />
                {errors.amount && (
                  <span className="text-red-500 text-xs">
                    {errors.amount.message}
                  </span>
                )}
              </div>

              {transaction === "Expense" ? (
                <>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="labelForm text-gray-700"
                      htmlFor="categoryId"
                    >
                      Category
                    </label>
                    <select
                      id="categoryId"
                      {...register("categoryId", {
                        required: {
                          value: true,
                          message: "Category is required",
                        },
                      })}
                      className={`${styles.inputForm} focus:outline-none focus:bg-white focus:border-gray-500`}
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
                    {errors.categoryId && (
                      <span className="text-red-500 text-xs">
                        {errors.categoryId.message}
                      </span>
                    )}
                  </div>
                </>
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
                onClick={() => router.back()}
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
