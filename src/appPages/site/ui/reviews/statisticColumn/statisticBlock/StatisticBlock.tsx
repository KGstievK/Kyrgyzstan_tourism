import { FC } from "react";
import styles from "../../Reviews.module.scss";
import Stars from "../../../stars/Stars";

interface StatisticBlockProps {
  reviewStatic?: REVIEWS.StaticReview;
}

const StatisticBlock: FC<StatisticBlockProps> = ({ reviewStatic }) => {
  const totalCount = reviewStatic?.ratingCount || 0;

  const ratingStats = [
    { label: "Excellent", count: reviewStatic?.excellent || 0 },
    { label: "Good", count: reviewStatic?.good || 0 },
    { label: "Not Bad", count: reviewStatic?.notBad || 0 },
    { label: "Bad", count: reviewStatic?.bad || 0 },
    { label: "Terribly", count: reviewStatic?.terribly || 0 },
  ];
  const ratingStatsWithPercentage = ratingStats.map((stat) => ({
    ...stat,
    percentage: totalCount ? (stat.count / totalCount) * 100 : 0,
  }));
  return (
    <div className={styles.statsContainer}>
      <div className={`${styles.flex} ${styles.itemsBaseline} ${styles.gap2}`}>
        <span className={styles.ratingValue}>
          {reviewStatic?.avgRating || 0}
        </span>
        <Stars rating={reviewStatic?.avgRating || 0} width={16} height={16} />
        <div className={styles.ratingCount}>{totalCount} reviews</div>
      </div>

      <div className={styles.ratingBarContainer}>
        {ratingStatsWithPercentage.map((stat) => (
          <div key={stat.label} className={styles.ratingBar}>
            <span className={styles.barLabel}>{stat.label}</span>
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{ width: `auto` }}
              >
                <div
                  className={styles.barFill}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
              <span className={styles.barCount}>{stat.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticBlock;
