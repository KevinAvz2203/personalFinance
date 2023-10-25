import styles from "./Skeleton.module.css";

export default function SkeletonMiddleCard() {
  return (
    <>
      <div className={`${styles.skeletonMidCards} bg-slate-300 `}>
        <div
          className={`${styles.skeleton} ${styles.skeleton_text} p-2 mt-5 ml-2`}
        ></div>
      </div>
    </>
  );
}
