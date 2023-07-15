import Image from "next/image";
import totalSavingsIcon from "/public/assets/icons/totalSavingsIcon.png";

export default function TotalSavingCard() {
  return (
    <>
      <div className="savingCard bg-amber-300	">
        <Image
          src={totalSavingsIcon}
          alt="T Savings Icon Icon"
          width={50}
          height={50}
        />
        <div>
          <p>$15000 of 150000 MXN</p>
          <p>Total Savings for Goals</p>
        </div>
      </div>
    </>
  );
}
