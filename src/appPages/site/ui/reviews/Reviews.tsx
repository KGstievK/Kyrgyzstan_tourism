import React, { FC } from "react";
import styles from "./Reviews.module.scss";
import StatisticColumn from "./statisticColumn/StatisticColumn";
import ReviewsColumn from "./reviewsColumn/ReviewsColumn";

interface ReviewsProps {
  isTab: number; // 0: places, 1: hotels, 2: kitchens, 3: events, 4: attractions
  isCurrent: number | null; // ID текущей сущности
  reviewStatic?: REVIEWS.StaticReview; // Статистика текущей сущности
}

const entityMap: Record<number, string> = {
  0: "popular_places",
  1: "hotels",
  2: "kitchens",
  4: "attractions",
  // 3 (events) пока не поддерживается, добавьте позже
};

const Reviews: FC<ReviewsProps> = ({ isTab, isCurrent, reviewStatic }) => {
  const entityType = entityMap[isTab] || "unknown";

  return (
      <div className={styles.content}>
        <h1 className={styles.heading}>Reviews</h1>
        <div className={`${styles.flex} ${styles.column} ${styles.gap6}`}>
          <StatisticColumn reviewStatic={reviewStatic} />
          <ReviewsColumn entityType={entityType} isCurrent={isCurrent} />
        </div>
      </div>
  );
};

export default Reviews;