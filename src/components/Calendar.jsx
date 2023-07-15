import Image from "next/image";
import CalendarImg from "/public/assets/images/Calendar.png";

export default function Calendar() {
  return (
    <>
      <div className="monthGraphs">
        <Image src={CalendarImg} alt="CalendarIMG" width={310} />
      </div>
    </>
  );
}
