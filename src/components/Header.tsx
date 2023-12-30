import { useSession } from "next-auth/react";
import styles from "./Header.module.css";
import userIcon from "/public/assets/icons/user-placeholder.png";

import Image from "next/image";

export default function Header() {
  const currMonth = new Date().toLocaleString([], { month: "long" });
  const currYear = new Date().getFullYear();
  const { data: session } = useSession();

  let UserName = "";

  if (session?.user) {
    UserName = session.user.name;
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className="text-5xl">Welcome back! </h1>
        <div className="absolute right-8 text-right flex">
          <Image src={userIcon} alt="User Icon" width="50" height="30" />
          <div className="pl-2">
            <p className="text-2xl">{UserName}</p>
            <p className="text-sm" suppressHydrationWarning={true}>
              {currMonth}, {currYear}
            </p>
          </div>
        </div>
      </header>
    </>
  );
}
