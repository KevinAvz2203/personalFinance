import Image from "next/image";
import incomeIcon from "/public/assets/icons/incomeIcon.png";
import expenseIcon from "/public/assets/icons/expenseIcon.png";
import totalBalanceIcon from "/public/assets/icons/totalBalanceIcon.png";
import { useState, useEffect } from "react";
import {
  getIncomes,
  getExpenses,
  getTotalBalance,
} from "@/Backend/Transaction";

type incomeData = {
  User: number;
  cardType: number;
};

export default function TopCard({ User, cardType }: incomeData) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function getUserIncomeData() {
      const [data] = await Promise.all([getIncomes(User)]);
      setTotal(data.amount);
    }

    async function getUserExpenseData() {
      const [data] = await Promise.all([getExpenses(User)]);
      setTotal(data.amount);
    }

    async function getUserBalanceData() {
      const [data] = await Promise.all([getTotalBalance(User)]);
      setTotal(data.amount);
    }

    switch (cardType) {
      case 0:
        getUserIncomeData();
        break;
      case 1:
        getUserExpenseData();
        break;
      case 2:
        getUserBalanceData();
        break;
      default:
        break;
    }
  }, [User, cardType]);

  return (
    <>
      {cardType == 0 ? (
        <>
          <div className="topCards bg-red-300	">
            <Image src={incomeIcon} alt="Income Icon" width={50} height={50} />
            <div>
              <p>${total | 0} MXN</p>
              <p>Incomes</p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {cardType == 1 ? (
        <>
          <div className="topCards bg-neutral-300	">
            <Image
              src={expenseIcon}
              alt="Expense Icon"
              width={50}
              height={50}
            />
            <div>
              <p>${total | 0} MXN</p>
              <p>Expenses</p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {cardType == 2 ? (
        <>
          <div className="topCards bg-orange-300	">
            <Image
              src={totalBalanceIcon}
              alt="T Balance Icon"
              width={50}
              height={50}
            />
            <div>
              <p>${total} MXN</p>
              <p>Total Balance</p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
