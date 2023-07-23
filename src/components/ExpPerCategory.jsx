import Image from "next/image";
import catMonthly from "/public/assets/images/catMonthly.png";

export default function ExpPerCategory() {
  return (
    <>
      <div className="catPerMonth">
        <h1 className="text-2xl p-2">Expenses per Categories for Month</h1>
        <div className="flex justify-center">
          <Image src={catMonthly} alt="experses per month" />{" "}
        </div>
      </div>
    </>
  );
}
