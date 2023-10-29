import ExpPerCategory from "@/components/ExpPerCategory";
import ExpPerCategoryExpected from "@/components/ExpPerCategoryExpected";
import HistoricActivity from "@/components/HistoricActivity";
import { getUserData } from "@/Backend/User";
import styles from "./data.module.css";

export default async function Data() {
  const [userData] = await Promise.all([getUserData(1)]);
  const currMonth = new Date().toLocaleString([], { month: "long" });
  const currYear = new Date().getFullYear();

  return (
    <>
      <div>
        <header className="flex items-center">
          <h1>Here is the Complete Summary of your Activities</h1>
          <h3 className="absolute right-8" suppressHydrationWarning={true}>
            {currMonth}, {currYear}
          </h3>
        </header>

        <div className="flex">
          <div className={styles.dataGraphs}>
            <ExpPerCategory User={userData.id} />

            <ExpPerCategoryExpected User={userData.id} />
          </div>
          <div className={styles.dataActivity}>
            <HistoricActivity User={userData.id} HistoryType={1} />
          </div>
        </div>
      </div>
    </>
  );
}
