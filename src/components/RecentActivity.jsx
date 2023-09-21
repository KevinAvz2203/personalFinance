import Image from "next/image";
import ChargeActivity from "./ChargeActivity";
import addChargeIcon from "/public/assets/icons/addChargeIcon.png";
import Link from "next/link";
import { useState, useMemo } from "react";
import { getPerUser } from "@/Backend/Transaction";

export default function RecentActivity({ User }) {
  const [userTransactions, setUserTransactions] = useState([]);
  let dates = [];
  let hours = [];

  async function getUserTransactions() {
    const [userTrans] = await Promise.all([getPerUser(User)]);
    setUserTransactions(userTrans);
  }

  useMemo(getUserTransactions, [User]);

  for (let i = 0; i < userTransactions.length; i++) {
    let text = userTransactions[i].createdAt;
    const newCreateAt = text?.split("T") || [];
    const hourCreated = newCreateAt[1]?.split(".") || [];
    userTransactions[i].createdAt = newCreateAt[0];
    dates.push(newCreateAt[0]);
    hours.push(hourCreated[0]);
  }

  // Elimino los elementos duplicados del arreglo dates
  dates = dates.filter((value, index, array) => array.indexOf(value) === index);
  let currDay = new Date().toJSON().slice(0, 10);

  return (
    <>
      <div className="recentAct">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Recent Activity</h1>
          <Link href={"/addTransaction"}>
            <Image src={addChargeIcon} alt="add charge icon" />
          </Link>
        </div>

        {dates.map((fecha, index) => (
          <div className="mb-10" key={index}>
            {fecha == currDay ? <h4>Today</h4> : <h4>{fecha}</h4>}
            {userTransactions.map(
              (transaction, index) =>
                index < 4 &&
                fecha == transaction.createdAt && (
                  <ChargeActivity
                    key={transaction.id}
                    Name={transaction.description}
                    Date={transaction.createdAt}
                    Time={hours[index]}
                    Category={transaction.category.name}
                    Amount={transaction.amount}
                  />
                )
            )}
          </div>
        ))}
      </div>
    </>
  );
}
