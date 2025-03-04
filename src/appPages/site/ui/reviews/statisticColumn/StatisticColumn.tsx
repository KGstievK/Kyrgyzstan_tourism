import { FC, useState } from "react";
import styles from "../Reviews.module.scss";
import ReviewModal from "./reviewModal/ReviewModal";
import PhotoUploadModal from "./photoUploadModal/PhotoUploadModal";
import StatisticBlock from "./statisticBlock/StatisticBlock";

interface StatisticColumnProps {
  reviewStatic?: REVIEWS.StaticReview;
}

const StatisticColumn: FC<StatisticColumnProps> = ({ reviewStatic }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handlePhotoUpload = (files: File[]) => {
    setUploadedFiles(files);
    setShowPhotoModal(false);
    setShowReviewModal(true);
  };

  return (
    <div className={`${styles.w377} ${styles.shrink0}`}>
      <div
        style={{ width: "100%" }}
        className={`${styles.flex} ${styles.gap2} ${styles.mb8}`}
      >
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
            uploadedFiles={uploadedFiles}
          />
        )}
        {showPhotoModal && (
          <PhotoUploadModal
            onClose={() => setShowPhotoModal(false)}
            onSend={handlePhotoUpload}
          />
        )}
      </div>
      <div className={styles.block}>
        <StatisticBlock reviewStatic={reviewStatic} />
      </div>
    </div>
  );
};

export default StatisticColumn;