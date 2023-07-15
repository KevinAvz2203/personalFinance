import Image from "next/image";
import totalBalanceIcon from "/public/assets/icons/totalBalanceIcon.png";

export default function TotalBalanceCard() {
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
          <p>$5000 MXN</p>
          <p>Total Balance</p>
        </div>
      </div>
    </>
  );
}
