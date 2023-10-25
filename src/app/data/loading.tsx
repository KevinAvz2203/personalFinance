import SkeletonDataCards from "@/components/SkeletonDataCards";
import SkeletonDataActivityCard from "@/components/SkeletonDataActivityCard";
import styles from "@/components/Skeleton.module.css";
import Datastyles from "./data.module.css";

export default function Loading() {
  return (
    <>
      <div>
        <div className="flex items-center">
          <div
            className={`${styles.skeleton} ${styles.skeleton_text} mt-5`}
          ></div>
        </div>

        <div className="flex">
          <div className={Datastyles.dataGraphs}>
            <SkeletonDataCards />
            <SkeletonDataCards />
          </div>

          <div className={Datastyles.dataActivity}>
            <SkeletonDataActivityCard />
          </div>
        </div>
      </div>
    </>
  );
}
