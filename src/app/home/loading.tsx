import SkeletonTopCard from "@/components/SkeletonTopCard";
import SkeletonMiddleCard from "@/components/SkeletonMiddleCard";
import styles from "@/components/Skeleton.module.css";
import Homestyles from "./home.module.css";

export default function Loading() {
  return (
    <>
      <div className="flex items-center">
        <div
          className={`${styles.skeleton} ${styles.skeleton_text} mt-5`}
        ></div>
      </div>

      <div>
        <div className={Homestyles.genSummary}>
          <SkeletonTopCard />
          <SkeletonTopCard />
          <SkeletonTopCard />
          <SkeletonTopCard />
        </div>

        <div className={Homestyles.genSummary}>
          <SkeletonMiddleCard />
          <SkeletonMiddleCard />
          <SkeletonMiddleCard />
        </div>

        <div className={Homestyles.genSummary}>
          <SkeletonMiddleCard />
          <SkeletonMiddleCard />
          <SkeletonMiddleCard />
        </div>
      </div>
    </>
  );
}
