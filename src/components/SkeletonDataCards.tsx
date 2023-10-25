import styles from "./Skeleton.module.css";

export default function SkeletonDataCards() {
  return (
    <>
      <div className={styles.skeletonDataCards_perMonth}>
        <div
          className={`${styles.skeleton} ${styles.skeleton_text} p-2 mt-5 ml-2`}
        ></div>
      </div>
    </>
  );
}
