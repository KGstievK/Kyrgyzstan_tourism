"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import styles from "../Reviews.module.scss";
import { FC, useEffect, useState } from "react";
import Stars from "../../stars/Stars";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import { FilterModal } from "./filterModal/FilterModal";
import { useGetReviewsQuery } from "@/redux/api/reviews";
import { Avatar, Space } from "antd";
import { useGetMeQuery } from "@/redux/api/auth";
import Image from "next/image";
import ReviewModal from "../statisticColumn/reviewModal/ReviewModal";
import { ImageModal } from "../../imageModal/ImageModal";

interface ReviewsColumnProps {
  entityType: string;
  isCurrent: number | null;
  reviewStatic?: REVIEWS.StaticReview;
  isTab: number;
}

const ReviewsColumn: FC<ReviewsColumnProps> = ({
  entityType,
  isCurrent,
  reviewStatic,
  isTab,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [dataReviews, setDataReviews] = useState<REVIEWS.Review[]>([]);
  const [ratingFilter, setRatingFilter] = useState<string | undefined>();
  const [monthFilter, setMonthFilter] = useState<string | undefined>();
  const [selectedReviewIndex, setSelectedReviewIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);  const [isLength, setIsLength] = useState(0);
  const [userPreview, setUserPreview] = useState<string | null>(null);
  const { data: reviewsData } = useGetReviewsQuery({
    entityType,
    rating: ratingFilter,
    month: monthFilter,
  });
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<
    number | undefined
  >();

  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };
  
  const handleNext = () => {
    if (selectedImage !== null && selectedReviewIndex !== null) {
      const maxIndex = dataReviews[selectedReviewIndex]?.reviewImages.length - 1 || 0;
      if (selectedImage < maxIndex) {
        setSelectedImage(selectedImage + 1);
      }
    }
  };
  useEffect(() => {
    if (reviewsData) {
      // Фильтруем отзывы по entityId
      const filteredReviews = reviewsData.filter((review) => {
        return String(review.entityId) === String(isCurrent);
      });

      // Сортируем отзывы по дате (новые в начале)
      const sortedReviews = filteredReviews.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // Убывающий порядок
      });

      setDataReviews(sortedReviews);
    } else {
      setDataReviews([]);
    }
  }, [reviewsData, isCurrent, entityType]);


  const applyFilters = (rating?: string, month?: string) => {
    setRatingFilter(rating);
    setMonthFilter(month);
  };

  const handleReplyClick = (reviewId: number) => {
    setSelectedReviewId(reviewId);
    setShowReplyModal(true);
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
          onApply={applyFilters}
        />
      )}

      <div className={styles.spaceY6}>
        {dataReviews.map((review, reviewIndex) => (
          <div
            key={review.id}
            className={styles.reviewCard}
            style={{
              padding: "0",
            }}
          >
            <div className={`${styles.itemsCenter} ${styles.gap3}`}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatarBlock}>
                  <Space direction="vertical" size={20}>
                    <Space wrap size={20}>
                      <Avatar
                        size={47}
                        icon={
                          userPreview ? (
                            <Image
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
                            <Image
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
                  <span className={styles.likeCount}>{review.count_like}</span>
                </div>
              </div>
              <div className={`${styles.gap4}`}>
                <Stars width={16} height={16} rating={review.rating} />
                <span className={styles.reviewDate}>{review.createdAt}</span>
              </div>
            </div>
            <p className={styles.reviewText}>{review.comment}</p>
            {review.reviewImages.length > 0 && (
              <div className={styles.imageGrid}>
                {review.reviewImages.map((image, index) => (
                  <img
                    onClick={() => {
                      setSelectedReviewIndex(reviewIndex);
                      setSelectedImage(
                        review.reviewImages.findIndex(
                          (el) => el.id === image.id
                        )
                      );
                      setIsLength(review.reviewImages.length);
                    }}
                    key={image.id}
                    loading="lazy"
                    src={image.image}
                    alt={`Review image ${index + 1}`}
                    className={styles.reviewImage}
                  />
                ))}
              </div>
            )}

            {selectedImage !== null && selectedReviewIndex !== null && (
              <ImageModal
                images={dataReviews[selectedReviewIndex]?.reviewImages || []}
                selectedImage={selectedImage}
                onClose={() => {
                  setSelectedImage(null);
                  setSelectedReviewIndex(null);
                }}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSelectImage={setSelectedImage}
              />
            )}

            <button
              className={styles.replyButton}
              onClick={() => handleReplyClick(review.id)}
            >
              Reply
            </button>

            {review.replyReviews && review.replyReviews.length > 0 && (
              <div
                className={styles.spaceY6}
                style={{
                  padding: "20px 0 0 0",
                }}
              >
                {review.replyReviews.map((el) => (
                  <div
                    key={el.id}
                    className={styles.reviewCard}
                    style={{
                      padding: "0 0 10px 50px",
                      margin: "0 0 10px 0",
                    }}
                  >
                    <div className={`${styles.itemsCenter} ${styles.gap3}`}>
                      <div
                        className={styles.avatarContainer}
                        style={{
                          margin: "0",
                        }}
                      >
                        <div className={styles.avatarBlock}>
                          <Space direction="vertical" size={20}>
                            <Space wrap size={20}>
                              <Avatar
                                size={47}
                                icon={
                                  userPreview ? (
                                    <Image
                                      src={userPreview}
                                      alt="avatar"
                                      style={{
                                        objectFit: "cover",
                                        top: "0",
                                        right: "0",
                                        borderRadius: "50%",
                                      }}
                                    />
                                  ) : el.user.user_picture ? (
                                    <Image
                                      src={el.user.user_picture}
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
                              {el.user.first_name} {el.user.last_name}
                            </div>
                            <div className={styles.authorPlace}>
                              {el.user.from_user}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`${styles.gap4}`}>
                        <span className={styles.reviewDate}>{el.created_date}</span>
                      </div>
                    </div>
                    <p
                      className={styles.reviewText}
                      style={{
                        margin: "0",
                      }}
                    >
                      {el.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showReplyModal && (
        <ReviewModal
          isCurrent={isCurrent}
          onClose={() => setShowReplyModal(false)}
          onSubmit={() => setShowReplyModal(false)}
          uploadedFiles={[]}
          isTab={isTab}
          isReply={true}
          reviewId={selectedReviewId}
        />
      )}

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
