import SkeletonTopCard from "@/components/SkeletonTopCard";
import SkeletonMiddleCard from "@/components/SkeletonMiddleCard";

export default function Loading() {
  return (
    <>
      <div className="flex items-center">
        <div className="skeleton skeleton-text mt-5"></div>
      </div>

      <div>
        <div className="genSummary">
          <SkeletonTopCard />
          <SkeletonTopCard />
          <SkeletonTopCard />
          <SkeletonTopCard />
        </div>

        <div className="genSummary">
          <SkeletonMiddleCard />
          <SkeletonMiddleCard />
          <SkeletonMiddleCard />
        </div>

        <div className="genSummary">
          <SkeletonMiddleCard />
          <SkeletonMiddleCard />
          <SkeletonMiddleCard />
        </div>
      </div>
    </>
  );
}
