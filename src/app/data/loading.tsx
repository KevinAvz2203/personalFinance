import SkeletonDataCards from "@/components/SkeletonDataCards";
import SkeletonDataActivityCard from "@/components/SkeletonDataActivityCard";

export default function Loading() {
  return (
    <>
      <div>
        <div className="flex items-center">
          <div className="skeleton skeleton-text mt-5"></div>
        </div>

        <div className="flex">
          <div className="dataGraphs">
            <SkeletonDataCards />
            <SkeletonDataCards />
          </div>

          <div className="dataActivity">
            <SkeletonDataActivityCard />
          </div>
        </div>
      </div>
    </>
  );
}
