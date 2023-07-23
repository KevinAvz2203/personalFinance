import Image from "next/image";
import radialPercentage from "public/assets/images/radialPercentage.png";

export default function MainGoals() {
  return (
    <>
      <div>
        <div className="mainGoals">
          <div className="">
            <Image src={radialPercentage} alt="goal % icon" />
            <p className="text-center text-2xl">PlayStation 5</p>
          </div>

          <div className="">
            <Image src={radialPercentage} alt="goal % icon" />
            <p className="text-center text-2xl">New Car</p>
          </div>

          <div className="">
            <Image src={radialPercentage} alt="goal % icon" />
            <p className="text-center text-2xl">New Keyboard</p>
          </div>

          <div className="">
            <Image src={radialPercentage} alt="goal % icon" />
            <p className="text-center text-2xl">New Clothes</p>
          </div>
        </div>
      </div>
    </>
  );
}
