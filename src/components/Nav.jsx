import Link from "next/link";
import Image from "next/image";
import homeIcon from "/public/assets/icons/homeIcon.png";
import dataIcon from "/public/assets/icons/data.png";
import goalIcon from "/public/assets/icons/goalsIcon.png";
import settingsIcon from "/public/assets/icons/settingsIcon.png";
import userIcon from "/public/assets/icons/userIcon.png";
import darkLightIcon from "/public/assets/icons/darkLightIcon.png";

export default function Nav() {
  return (
    <>
      <aside className="border fixed top-0 left-0 z-40 w-32 h-screen transition-transform -translate-x-full sm:translate-x-0 megaBG">
        <ul className="space-y-2 font-medium">
          <li>
            <Link href="#" className="navLink">
              <Image src={userIcon} alt="Home Icon" width="80" height="80" />
              <span className="text-center pt-0">User</span>
            </Link>
          </li>
          <li>
            <Link href={"/home"} className="navLink">
              <Image src={homeIcon} alt="Home Icon" width="80" height="80" />
              <span className="text-center pt-0">Home</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="navLink">
              <Image src={dataIcon} alt="Home Icon" width="50" height="50" />
              <span className="text-center pt-2">Data</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="navLink">
              <Image src={goalIcon} alt="Home Icon" width="50" height="50" />
              <span className="text-center pt-2">Goals</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="navLink">
              <Image
                src={settingsIcon}
                alt="Home Icon"
                width="50"
                height="50"
              />
              <span className="text-center pt-2">Settings</span>
            </Link>
          </li>
        </ul>
        <div className="modeSwitch">
          <Image
            src={darkLightIcon}
            alt="Home Icon"
            width="auto"
            height="auto"
          />
        </div>
      </aside>
    </>
  );
}
