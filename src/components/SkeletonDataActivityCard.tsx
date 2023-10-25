import styles from "./Skeleton.module.css";

export default function SkeletonDataActivityCard() {
  return (
    <>
      <div className={styles.skeletonDataActivityCard_perMonth}>
        <div
          className={`${styles.skeleton} ${styles.skeleton_text} p-2 mt-5 ml-2`}
        ></div>
      </div>
    </>
  );
}
