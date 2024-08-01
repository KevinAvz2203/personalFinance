import ExpPerCategory from "@/components/ExpPerCategory";
import ExpPerCategoryExpected from "@/components/ExpPerCategoryExpected";
import HistoricActivity from "@/components/HistoricActivity";
import TopCardStadistics from "@/components/TopCardStadistics";
import styles from "./data.module.css";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Loading from "./loading";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Session {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
  };
}

export default async function Stadistics() {
  const session: Session | null = await getServerSession(authOptions);

  /* Mientras no se encuentra una session activa, se muestra la pantalla de carga */
  while (!session) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const UserID: string = session?.user?.id || "pending";

  while (UserID === "pending") {
    return <></>;
  }

  return (
    <>
      <Header />

      <div className="content">
        <div className={styles.container}>
          <div className={`${styles.dataGraphs}`}>
            <ExpPerCategory User={UserID} />

            {/* <ExpPerCategoryExpected User={UserID} /> */}
          </div>
          <div className={styles.dataActivity}>
            {/* <TopCardStadistics User={UserID} /> */}

            {/* <HistoricActivity User={UserID} /> */}
          </div>
        </div>
      </div>
    </>
  );
}
