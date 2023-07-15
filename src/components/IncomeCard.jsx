import Image from "next/image";
import incomeIcon from "/public/assets/icons/incomeIcon.png";

export default function IncomeCard() {
  return (
    <>
      <div className="topCards bg-red-300	">
        <Image src={incomeIcon} alt="Income Icon" width={50} height={50} />
        <div>
          <p>$10000 MXN</p>
          <p>Incomes</p>
        </div>
      </div>
    </>
  );
}
