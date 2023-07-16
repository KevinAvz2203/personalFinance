import Image from "next/image";
import ChargeActivity from "./ChargeActivity";
import addChargeIcon from "/public/assets/icons/addChargeIcon.png";

export default function RecentActivity() {
  return (
    <>
      <div className="recentAct">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Recent Activity</h1>
          <Image src={addChargeIcon} alt="add charge icon" />
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
          <h4>15/06/2023</h4>
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
