import Image from "next/image";
import goalPercentage from "/public/assets/images/goalPercentage.png";
import optionDots from "/public/assets/icons/optionDots.png";

export default function SavingGoals() {
  return (
    <>
      <div className="savingGoals">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Saving Goals</h1>
          <Image src={optionDots} alt="add charge icon" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Image src={goalPercentage} alt="goal % icon" />
            <p className="text-center">PlayStation 5</p>
          </div>
          <div>
            <Image src={goalPercentage} alt="goal % icon" />
            <p className="text-center">PlayStation 5</p>
          </div>
          <div>
            <Image src={goalPercentage} alt="goal % icon" />
            <p className="text-center">PlayStation 5</p>
          </div>
          <div>
            <Image src={goalPercentage} alt="goal % icon" />
            <p className="text-center">PlayStation 5</p>
          </div>
        </div>
      </div>
    </>
  );
}
