import React from 'react';
import { Star } from 'lucide-react';
import styles from './Reviews.module.scss';
import StatisticColumn from './statisticColumn/StatisticColumn';
import ReviewsColumn from './reviewsColumn/ReviewsColumn';

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  images?: string[];
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    author: "Anna Peters",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 5,
    text: "I have just returned from an unforgettable trip to Spain that left a great impression and gave my impressions. The place is simply magical and the people are very welcoming. The atmosphere surrounding this site creates a breathtaking experience.",
    date: "2 days ago",
    images: [
      "https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=400",
      "https://images.unsplash.com/photo-1558644382-44c0d4f9a2c5?w=400",
      "https://images.unsplash.com/photo-1558644848-9f114e8e4d14?w=400"
    ]
  },
  {
    id: 2,
    author: "Anna Peters",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 4,
    text: "I have just returned from an unforgettable trip to Spain that left a great impression and gave my impressions. The place is simply magical.",
    date: "3 days ago"
  }
];

const ratingStats = [
  { label: "Excellent", count: 2891, percentage: 76 },
  { label: "Good", count: 584, percentage: 15 },
  { label: "Average", count: 192, percentage: 5 },
  { label: "Poor", count: 73, percentage: 3 },
  { label: "Terrible", count: 24, percentage: 1 }
];


function Reviews() {
  return (
    <div className="container">
      <div className={styles.content}>
        <h1 className={styles.heading}>Reviews</h1>

        <div className={`${styles.flex} ${styles.gap6}`}>
          {/* Statistics Column */}
          <StatisticColumn ratingStats={ratingStats} />

          {/* Reviews Column */}
          <ReviewsColumn reviews={reviews} />
        </div>
      </div>
    </div>
  );
}

export default Reviews;