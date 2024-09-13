import TopCard from "@/components/TopCard";
import MonthSummary from "@/components/MonthSummary";
import RecentActivity from "@/components/RecentActivity";
import MonthCashFlow from "@/components/MonthCashFlow";
import styles from "./home.module.css";
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

export default async function Home() {
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
        {/* Top Cards */}
        <section className={styles.genSummary}>
          <TopCard User={UserID} />
        </section>

        <section className={styles.genSummary}>
          {/* Componente grafica Curva summary Month */}
          <MonthCashFlow User={UserID} />

          {/* Componente grafica PIE summary Month */}
          <MonthSummary User={UserID} />
        </section>

        <section className={styles.genSummary}>
          {/* Componente grafica PIE summary Month */}
          <RecentActivity User={UserID} />
        </section>
      </div>
    </>
  );
}
