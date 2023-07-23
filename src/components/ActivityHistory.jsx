import Image from "next/image";
import ChargeActivity from "./ChargeActivity";
import addChargeIcon from "/public/assets/icons/addChargeIcon.png";
import Link from "next/link";

export default function ActivityHistory() {
  return (
    <>
      <div className="actHistory">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Activity History</h1>
          <Link href={"/addTransaction"}>
            <Image src={addChargeIcon} alt="add charge icon" />
          </Link>
        </div>

        <div className="mb-10">
          <h4>Today</h4>
          <ChargeActivity
            Name="Disney+ Billing"
            Date="Today at 2:20 pm"
            Category="Entertainment"
            Amount="-$150.00 MXN"
          />
          <ChargeActivity
            Name="Groceries"
            Date="Today at 11:45 pm"
            Category="Food"
            Amount="-$894.60 MXN"
          />
          <ChargeActivity
            Name="Recibo de luz"
            Date="Today at 1:00 pm"
            Category="Home"
            Amount="-$100.00 MXN"
          />
        </div>

        <div className="mb-10">
          <h4>Yesterday</h4>
          <ChargeActivity
            Name="Paycheck"
            Date="23/06/2023 at 5:20 pm"
            Category="Income"
            Amount="-$3547.00 MXN"
          />
        </div>

        <div className="mb-10">
          <h4>15/06/2023</h4>
          <ChargeActivity
            Name="Paycheck"
            Date="15/06/2023 at 3:40 pm"
            Category="Income"
            Amount="-$4500.00 MXN"
          />

          <ChargeActivity
            Name="Paycheck"
            Date="15/06/2023 at 3:40 pm"
            Category="Income"
            Amount="-$4500.00 MXN"
          />
        </div>

        <div className="mb-10">
          <h4>10/06/2023</h4>
          <ChargeActivity
            Name="Paycheck"
            Date="15/06/2023 at 3:40 pm"
            Category="Income"
            Amount="-$4500.00 MXN"
          />

          <ChargeActivity
            Name="Paycheck"
            Date="15/06/2023 at 3:40 pm"
            Category="Income"
            Amount="-$4500.00 MXN"
          />
        </div>

        <div className="mb-10">
          <h4>07/06/2023</h4>
          <ChargeActivity
            Name="Paycheck"
            Date="15/06/2023 at 3:40 pm"
            Category="Income"
            Amount="-$4500.00 MXN"
          />

          <ChargeActivity
            Name="Paycheck"
            Date="15/06/2023 at 3:40 pm"
            Category="Income"
            Amount="-$4500.00 MXN"
          />
        </div>
      </div>
    </>
  );
}
