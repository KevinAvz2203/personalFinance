import Image from "next/image";
import catMonthly from "/public/assets/images/catMonthly.png";

export default function ExpectedExpPerCategory() {
  return (
    <>
      <div className="catPerMonth">
        <h1 className="text-2xl p-2">Expected expenses for next Month</h1>
        <div className="flex justify-center">
          <Image src={catMonthly} alt="expected expenses per month" />
        </div>
      </div>
    </>
  );
}
