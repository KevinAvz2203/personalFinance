"use client";

import ActivityHistory from "@/components/ActivityHistory";
import ExpPerCategory from "@/components/ExpPerCategory";
import ExpectedExpPerCategory from "@/components/ExpectedExpPerCategory";
import { getUserData } from "@/Backend/User";

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
          <div className="dataGraphs">
            <ExpPerCategory User={userData.id} />

            <ExpectedExpPerCategory />
          </div>
          <div className="dataActivity">
            <ActivityHistory User={userData.id} />
          </div>
        </div>
      </div>
    </>
  );
}
