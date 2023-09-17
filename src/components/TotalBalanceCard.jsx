import Image from "next/image";
import totalBalanceIcon from "/public/assets/icons/totalBalanceIcon.png";
import { useState, useMemo } from "react";
import { getTotalBalance } from "@/Backend/Transaction";

export default function TotalBalanceCard({ User }) {
  const [total, setTotal] = useState(0);

  async function getUserData() {
    const [data] = await Promise.all([getTotalBalance(User)]);
    setTotal(data);
  }

  useMemo(getUserData, [User]);

  return (
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
  );
}
