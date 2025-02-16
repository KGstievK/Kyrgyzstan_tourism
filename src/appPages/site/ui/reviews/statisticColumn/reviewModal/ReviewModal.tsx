import React, { useState } from 'react';
import { X, Pencil } from 'lucide-react';
import styles from './ReviewModal.module.scss';

interface ReviewModalProps {
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState<number>(1);
  const [review, setReview] = useState<string>('');

  const handleSubmit = () => {
    onSubmit(rating, review);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>What do you think ?</h2>
          <p className={styles.subtitle}>Please give your rating</p>
        </div>

        <div className={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              className={`${styles.ratingCircle} ${value <= rating ? styles.active : ''}`}
              onClick={() => setRating(value)}
              aria-label={`Rate ${value} stars`}
            />
          ))}
        </div>

        <div className={styles.reviewInputContainer}>
          <Pencil className={styles.pencilIcon} size={20} />
          <textarea
            className={styles.reviewInput}
            placeholder="Tell us about your experience"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <button className={styles.sendButton} onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;