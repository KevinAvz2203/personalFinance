import Image from "next/image";
import incomeIcon from "/public/assets/icons/incomeIcon.png";
import { useState, useMemo } from "react";
import { getIncomes } from "@/Backend/Transaction";

export default function IncomeCard({ User }) {
  const [income, setIncome] = useState(0);

  async function getUserData() {
    const [data] = await Promise.all([getIncomes(User)]);
    setIncome(data.amount);
  }

  useMemo(getUserData, [User]);

  return (
    <>
      <div className="topCards bg-red-300	">
        <Image src={incomeIcon} alt="Income Icon" width={50} height={50} />
        <div>
          <p>${income | 0} MXN</p>
          <p>Incomes</p>
        </div>
      </div>
    </>
  );
}
