import { Search, SlidersHorizontal } from "lucide-react";
import styles from "../Reviews.module.scss";
import { FC, useEffect, useState } from "react";
import Stars from "../../stars/Stars";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import { FilterModal } from "./filterModal/FilterModal";
import { useGetReviewsQuery } from "@/redux/api/reviews";
import { Avatar, Space } from "antd";
import Image from "next/image";
import { useGetMeQuery } from "@/redux/api/auth";

interface ReviewsColumnProps {
  entityType: string;
  isCurrent: number | null;
  reviewStatic?: REVIEWS.StaticReview;
}

const ReviewsColumn: FC<ReviewsColumnProps> = ({
  entityType,
  isCurrent,
  reviewStatic,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [dataReviews, setDataReviews] = useState<REVIEWS.Review[]>([]);
  const [ratingFilter, setRatingFilter] = useState<string | undefined>();
  const [monthFilter, setMonthFilter] = useState<string | undefined>();
  const { data: user } = useGetMeQuery();
  const [userPreview, setUserPreview] = useState<string | null>(null);
  const { data: reviewsData } = useGetReviewsQuery({
    entityType,
    rating: ratingFilter,
    month: monthFilter,
  });

  console.log(reviewsData);

  useEffect(() => {
    if (reviewsData) {
      const filteredReviews = reviewsData.filter((review) => {
        // Для popular_places нет явного entityId, фильтруем все
        if (entityType === "popular_places") return true;
        return String(review.entityId) === String(isCurrent);
      });
      setDataReviews(filteredReviews);
    } else {
      setDataReviews([]);
    }
  }, [reviewsData, isCurrent, entityType]);

  // Функция для применения фильтров (например, через FilterModal)
  const applyFilters = (rating?: string, month?: string) => {
    setRatingFilter(rating);
    setMonthFilter(month);
  };

  return (
    <div className={styles.reviewsColumn}>
      <div className={`${styles.flex} ${styles.gap3} ${styles.mb6}`}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={20} color="#5A5A5A" />
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
        </div>
        <button
          onClick={() => setIsShow(!isShow)}
          className={styles.buttonSecondary}
        >
          Filters
        </button>
      </div>
      {isShow && (
        <FilterModal
          reviewStatic={reviewStatic}
          isShow={isShow}
          setIsShow={setIsShow}
          onApply={applyFilters} // Передаём функцию для фильтров
        />
      )}

      <div className={styles.spaceY6}>
        {dataReviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={`${styles.itemsCenter} ${styles.gap3}`}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatarBlock}>
                  <Space direction="vertical" size={20}>
                    <Space wrap size={20}>
                          <Avatar
                            
                            size={47}
                            icon={
                              userPreview ? (
                                <img
                                  src={userPreview}
                                  alt="avatar"
                                  style={{
                                    objectFit: "cover",
                                    top: "0",
                                    right: "0",
                                    borderRadius: "50%",
                                  }}
                                />
                              ) : review.client.user_picture ? (
                                <img
                                  src={review.client.user_picture}
                                  alt="avatar"
                                  width={100}
                                  height={100}
                                  style={{
                                    objectFit: "cover",
                                    top: "0",
                                    right: "0",
                                    borderRadius: "50%",
                                  }}
                                />
                              ) : (
                                <UserOutlined />
                              )
                            }
                          />
                    </Space>
                  </Space>
                  <div>
                    <div className={styles.authorName}>
                      {review.client.first_name} {review.client.last_name}
                    </div>
                    <div className={styles.authorPlace}>
                      {review.client.from_user}
                    </div>
                  </div>
                </div>
                <div className={styles.likes}>
                  <LikeOutlined className={styles.likeIcon} />
                  <span className={styles.likeCount}>12</span>
                </div>
              </div>
              <div className={`${styles.gap4}`}>
                <Stars width={16} height={16} rating={review.rating || 0} />
                <span className={styles.reviewDate}>{review.createdAt}</span>
              </div>
            </div>
            <p className={styles.reviewText}>{review.comment}</p>
            {review.reviewImages.length > 0 && (
              <div className={styles.imageGrid}>
                {review.reviewImages.map((image, index) => (
                  <img
                    key={image.id}
                    src={image.image}
                    alt={`Review image ${index + 1}`}
                    className={styles.reviewImage}
                  />
                ))}
              </div>
            )}
            <button className={styles.replyButton}>Reply</button>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <div className={`${styles.flex} ${styles.gap3}`}>
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`${styles.paginationDot} ${
                dot === 1 ? styles.active : styles.inactive
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsColumn;
