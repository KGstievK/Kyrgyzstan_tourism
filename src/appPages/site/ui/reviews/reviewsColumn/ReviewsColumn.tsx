import { Search, SlidersHorizontal } from "lucide-react";
import styles from "../Reviews.module.scss";
import { FC, useState } from "react";
import Stars from "../../stars/Stars";
import { Color } from "antd/es/color-picker";
import { LikeOutlined } from "@ant-design/icons";
import { FilterModal } from "./filterModal/FilterModal";

interface ReviewsColumnProps {
  reviews: {
    id: number;
    author: string;
    avatar: string;
    rating: number;
    text: string;
    images?: string[];
    date: string;
  }[];
}

const ReviewsColumn: FC<ReviewsColumnProps> = ({ reviews }) => {

    const [isShow, setIsShow] = useState(false);

  return (
    <div className={styles.reviewsColumn}>
      {/* Search and Filter */}
      <div className={`${styles.flex} ${styles.gap3} ${styles.mb6}`}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={20} color="#5A5A5A" />
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
        </div>
        <button onClick={() => setIsShow(!isShow)} className={styles.buttonSecondary}>Filters</button>
      </div>
        {isShow && <FilterModal isShow={isShow} setIsShow={setIsShow} />}
      {/* Reviews List */}
      <div className={styles.spaceY6}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={` ${styles.itemsCenter} ${styles.gap3}`}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatarBlock}>
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className={styles.avatar}
                  />
                  <div>
                    <div className={styles.authorName}>{review.author}</div>
                    <div className={styles.authorPlace}>Moscow, Rossia</div>
                  </div>
                </div>
                <div className={styles.likes}>
                    <LikeOutlined className={styles.likeIcon} />
                    <span className={styles.likeCount}>12</span>    
                </div>
              </div>
              <div className={` ${styles.gap4}`}>
                <Stars width={16} height={16} rating={review.rating} />
                <span className={styles.reviewDate}>{review.date}</span>
              </div>
            </div>
            <p className={styles.reviewText}>{review.text}</p>
            {review.images && (
              <div className={styles.imageGrid}>
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
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

      {/* Pagination */}
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
