import { FC, useState } from "react";
import styles from "../Reviews.module.scss";
import Stars from "../../stars/Stars";
import ReviewModal from "./reviewModal/ReviewModal";
import PhotoUploadModal from "./photoUploadModal/PhotoUploadModal";

interface StatisticColumnProps {
  ratingStats: { label: string; percentage: number; count: number }[];
}

const StatisticColumn: FC<StatisticColumnProps> = ({ ratingStats }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  return (
    <div className={`${styles.w377} ${styles.shrink0}`}>
      {/* Action Buttons */}
      <div className={`${styles.flex} ${styles.gap2} ${styles.mb8}`}>
        <button
          onClick={() => setShowReviewModal(true)}
          className={styles.buttonPrimary}
        >
          Write review
        </button>
        <button
          onClick={() => setShowPhotoModal(true)}
          className={styles.buttonSecondary}
        >
          Upload a photo
        </button>
        {showReviewModal && (
          <ReviewModal
            onClose={() => setShowReviewModal(false)}
            onSubmit={() => setShowReviewModal(false)}
          />
        )}
        {showPhotoModal && (
          <PhotoUploadModal
            onClose={() => setShowPhotoModal(false)}
            onSend={() => setShowPhotoModal(false)}
          />
        )}
      </div>

      {/* Statistics Content */}
      <div className={styles.statsContainer}>
        <div
          className={`${styles.flex} ${styles.itemsBaseline} ${styles.gap2}`}
        >
          <span className={styles.ratingValue}>4.8</span>
          <Stars rating={4.8} width={16} height={16} />
          <div className={styles.ratingCount}>3,764 reviews</div>
        </div>

        {/* Rating bars */}
        <div className={styles.ratingBarContainer}>
          {ratingStats.map((stat) => (
            <div key={stat.label} className={styles.ratingBar}>
              <span className={styles.barLabel}>{stat.label}</span>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
              <span className={styles.barCount}>{stat.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticColumn;
