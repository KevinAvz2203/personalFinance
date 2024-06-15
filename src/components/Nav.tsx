// "use client";

import Link from "next/link";
import Image from "next/image";
import logoIcon from "/public/assets/icons/Logo.png";
import homeWhite from "/public/assets/icons/home-white.png";
import statsWhite from "/public/assets/icons/stats-white.png";
import goalsWhite from "/public/assets/icons/goals-white.png";
import settingsWhite from "/public/assets/icons/settings-white.png";
import loginWhite from "/public/assets/icons/login-white.png";
import logoutWhite from "/public/assets/icons/logout-white.png";
import registerWhite from "/public/assets/icons/register-white.png";

import styles from "./Nav.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Session {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
  };
}

export default async function Nav() {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <>
      <nav
        className={`${styles.megaBG} transition-transform -translate-x-full sm:translate-x-0 `}
      >
        <div className="flex justify-center pt-4">
          <Image src={logoIcon} alt="Home Icon" width="251" height="188" />
        </div>

        <ul className="px-6 h-full">
          {!session?.user ? (
            <>
              <li className={`${styles.navLi}`}>
                <Link href={"/"} className={`${styles.navLink}`}>
                  <Image
                    src={homeWhite}
                    alt="Home Icon"
                    width="35"
                    height="35"
                  />
                  <p className="text-center pt-0">Home</p>
                </Link>
              </li>
              <li className={`${styles.navLi}`}>
                <Link href={"/auth/register"} className={`${styles.navLink}`}>
                  <Image
                    src={registerWhite}
                    alt="Home Icon"
                    width="35"
                    height="35"
                  />
                  <p className="text-center pt-0">Register</p>
                </Link>
              </li>
              <li className={`${styles.navLi}`}>
                <Link href={"/auth/login"} className={`${styles.navLink}`}>
                  <Image
                    src={loginWhite}
                    alt="Home Icon"
                    width="35"
                    height="35"
                  />
                  <p className="text-center pt-0">Login</p>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={`${styles.navLi}`}>
                <Link href={"/home"} className={`${styles.navLink}`}>
                  <Image
                    src={homeWhite}
                    alt="Home Icon"
                    width="35"
                    height="35"
                  />
                  <p className="text-center pt-0">Home</p>
                </Link>
              </li>
              <li className={`${styles.navLi}`}>
                <Link href={"/stadistics"} className={`${styles.navLink}`}>
                  <Image
                    src={statsWhite}
                    alt="Home Icon"
                    width="35"
                    height="35"
                  />
                  <p className="text-center pt-0">Stadistics</p>
                </Link>
              </li>
              <li className={`${styles.navLi}`}>
                <Link href={"/goals"} className={`${styles.navLink}`}>
                  <Image
                    src={goalsWhite}
                    alt="Home Icon"
                    width="35"
                    height="35"
                  />
                  <p className="text-center pt-0">Goals</p>
                </Link>
              </li>
              <li className={`${styles.navLi}`}>
                <Link href={"/home"} className={`${styles.navLink}`}>
                  <Image
                    src={settingsWhite}
                    alt="Home Icon"
                    width="35"
                    height="35"
                  />
                  <p className="text-center pt-0">Settings</p>
                </Link>
              </li>
              <li className={`${styles.navLi}`}>
                <Link
                  href={"/api/auth/signout"}
                  className={`${styles.navLink}`}
                >
                  <Image
                    src={logoutWhite}
                    alt="Home Icon"
                    width="35"
                    height="35"
                  />
                  <p className="text-center pt-0">Logout</p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
