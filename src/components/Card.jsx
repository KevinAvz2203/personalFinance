import Image from "next/image";
import creditCard from "/public/assets/images/creditCard.png";

export default function Card() {
  return (
    <>
      <div className="creditCard">
        <h1 className="text-2xl p-2">Card</h1>
        <div className="flex justify-center">
          <Image src={creditCard} alt="Credit Card Icon" />
        </div>
      </div>
    </>
  );
}
