import Image from "next/image";
import expenseIcon from "/public/assets/icons/expenseIcon.png";

export default function ExpenseCard() {
  return (
    <>
      <div className="topCards bg-neutral-300	">
        <Image src={expenseIcon} alt="Expense Icon" width={50} height={50} />
        <div>
          <p>$5000 MXN</p>
          <p>Expenses</p>
        </div>
      </div>
    </>
  );
}
