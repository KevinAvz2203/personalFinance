"use client";

import Link from "next/link";
import Image from "next/image";
import homeIcon from "/public/assets/icons/homeIcon.png";
import dataIcon from "/public/assets/icons/data.png";
import goalIcon from "/public/assets/icons/goalsIcon.png";
import settingsIcon from "/public/assets/icons/settingsIcon.png";
import userIcon from "/public/assets/icons/userIcon.png";
import darkLightIcon from "/public/assets/icons/darkLightIcon.png";
import styles from "./Nav.module.css";
import { useSession } from "next-auth/react";

/* import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; */

export default function Nav() {
  /* const session = await getServerSession(authOptions); */
  const { data: session } = useSession();

  return (
    <>
      <aside
        className={`${styles.megaBG} transition-transform -translate-x-full sm:translate-x-0 `}
      >
        <ul className="space-y-2 font-medium">
          <li>
            <Link href="#" className={styles.navLink}>
              <Image src={userIcon} alt="Home Icon" width="80" height="80" />
              <span className="text-center pt-0">{session?.user.name || "User"}</span>
            </Link>
          </li>

          {!session?.user ? (
            <>
              <li>
                <Link href="/" className={styles.navLink}>
                  <span className="text-center pt-0">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className={styles.navLink}>
                  <span className="text-center pt-0">Login</span>
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className={styles.navLink}>
                  <span className="text-center pt-0">Register</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={"/home"} className={styles.navLink}>
                  <Image
                    src={homeIcon}
                    alt="Home Icon"
                    width="80"
                    height="80"
                  />
                  <span className="text-center pt-0">Home</span>
                </Link>
              </li>
              <li>
                <Link href={"/data"} className={styles.navLink}>
                  <Image
                    src={dataIcon}
                    alt="Home Icon"
                    width="50"
                    height="50"
                  />
                  <span className="text-center pt-2">Data</span>
                </Link>
              </li>
              <li>
                <Link href={"/goals"} className={styles.navLink}>
                  <Image
                    src={goalIcon}
                    alt="Home Icon"
                    width="50"
                    height="50"
                  />
                  <span className="text-center pt-2">Goals</span>
                </Link>
              </li>
              <li>
                <Link href="/api/auth/signout" className={styles.navLink}>
                  <Image
                    src={settingsIcon}
                    alt="Home Icon"
                    width="50"
                    height="50"
                  />
                  <span className="text-center pt-2">Logout</span>
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className={styles.modeSwitch}>
          <Image src={darkLightIcon} alt="Home Icon" width="50" height="50" />
        </div>
      </aside>
    </>
  );
}
