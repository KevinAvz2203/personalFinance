import styles from "./Skeleton.module.css";
import TopCardStyles from "./TopCard.module.css";

export default function SkeletonTopCard() {
  return (
    <>
      <div className={`${TopCardStyles.topCards} bg-slate-300`}>
        <span className={(styles.skeletonTopCards_img, styles.skeleton)}></span>
        <div>
          <div className={(styles.skeleton, styles.skeleton_text)}></div>
          <div className={(styles.skeleton, styles.skeleton_text)}></div>
        </div>
      </div>
    </>
  );
}
