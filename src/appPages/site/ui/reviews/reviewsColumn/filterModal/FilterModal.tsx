import React, { useState } from 'react';
import { X, Circle } from 'lucide-react';
import styles from './FilterModal.module.scss';

interface FilterModalProps {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}

const evaluationOptions = [
  { rating: 1, count: 77, circles: [1, 0, 0, 0, 0] },
  { rating: 2, count: 161, circles: [1, 1, 0, 0, 0] },
  { rating: 3, count: 1278, circles: [1, 1, 1, 0, 0] },
  { rating: 4, count: 6728, circles: [1, 1, 1, 1, 0] },
  { rating: 5, count: 18728, circles: [1, 1, 1, 1, 1] },
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const FilterModal: React.FC<FilterModalProps> = ({ isShow, setIsShow }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const handleApply = () => {
    // Handle filter application
    setIsShow(!isShow);
  };

  const handleReset = () => {
    setSelectedRating(null);
    setSelectedMonth(null);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={() => setIsShow(!isShow)}>
          <X size={24} />
        </button>

        <h2 className={styles.title}>Filter reviews</h2>

        <div className={styles.section}>
          <h3>Evaluation</h3>
          <div className={styles.evaluationButtons}>
            {evaluationOptions.map((option) => (
              <button
                key={option.rating}
                className={styles.evaluationButton}
                onClick={() => setSelectedRating(option.rating)}
              >
                <div className="flex gap-1">
                  {option.circles.map((filled, i) => (
                    <Circle
                      key={i}
                      size={16}
                      className={filled ? 'fill-[#3C5F83] text-[#3C5F83]' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span>({option.count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3>Period</h3>
          <div className={styles.monthsGrid}>
            {months.map((month) => (
              <button
                key={month}
                className={`${styles.monthButton} ${
                  selectedMonth === month ? styles.active : ''
                }`}
                onClick={() => setSelectedMonth(month)}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.resetButton} onClick={handleReset}>
            Throw off
          </button>
          <button className={styles.applyButton} onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};