export default function SkeletonTopCard() {
  return (
    <>
      <div className="topCards bg-slate-300">
        <span className="skeletonTopCards-img skeleton"></span>
        <div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
      </div>
    </>
  );
}
