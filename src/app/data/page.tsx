import ActivityHistory from "@/components/ActivityHistory";
import ExpPerCategory from "@/components/ExpPerCategory";
import ExpectedExpPerCategory from "@/components/ExpectedExpPerCategory";

export default function Data() {
  return (
    <>
      <div>
        <header className="flex items-center">
          <h1>Here is the Complete Summary of your Activities</h1>
          <h3 className="absolute right-8">Month, 2023</h3>
        </header>

        <div className="flex">
          <div className="dataGraphs">
            <ExpPerCategory />

            <ExpectedExpPerCategory />
          </div>
          <div className="dataActivity">
            <ActivityHistory />
          </div>
        </div>
      </div>
    </>
  );
}
