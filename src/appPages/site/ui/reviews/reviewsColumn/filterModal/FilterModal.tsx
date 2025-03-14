import React, { useState } from "react";
import { X, Circle } from "lucide-react";
import styles from "./FilterModal.module.scss";
import StatisticBlock from "../../statisticColumn/statisticBlock/StatisticBlock";
import useTranslate from "@/appPages/site/hooks/translate/translate";

/**
 * Интерфейс для свойств компонента FilterModal
 */
interface FilterModalProps {
  isShow?: boolean;                                      // Флаг для отображения модального окна
  setIsShow?: (isShow: boolean) => void;                 // Функция управления видимостью модального окна
  reviewStatic?: REVIEWS.StaticReview;                   // Статистика по отзывам
  onApply?: (rating: string | undefined, month: string | undefined) => void; // Функция применения фильтров
}

/**
 * Массив месяцев с переводами для разных языков
 * value: числовое значение месяца для фильтрации
 * labelRu, labelAr, labelEn: переводы названий месяцев
 */
const months = [
  { value: 1, labelRu: "Январь", labelAr: "يناير", labelEn: "January" },
  { value: 2, labelRu: "Февраль", labelAr: "فبراير", labelEn: "February" },
  { value: 3, labelRu: "Март", labelAr: "مارس", labelEn: "March" },
  { value: 4, labelRu: "Апрель", labelAr: "أبريل", labelEn: "April" },
  { value: 5, labelRu: "Май", labelAr: "مايو", labelEn: "May" },
  { value: 6, labelRu: "Июнь", labelAr: "يونيو", labelEn: "June" },
  { value: 7, labelRu: "Июль", labelAr: "يوليو", labelEn: "July" },
  { value: 8, labelRu: "Август", labelAr: "أغسطس", labelEn: "August" },
  { value: 9, labelRu: "Сентябрь", labelAr: "سبتمبر", labelEn: "September" },
  { value: 10, labelRu: "Октябрь", labelAr: "أكتوبر", labelEn: "October" },
  { value: 11, labelRu: "Ноябрь", labelAr: "نوفمبر", labelEn: "November" },
  { value: 12, labelRu: "Декабрь", labelAr: "ديسمبر", labelEn: "December" },
];

/**
 * Компонент модального окна фильтрации отзывов
 */
export const FilterModal: React.FC<FilterModalProps> = ({
  isShow,
  setIsShow,
  reviewStatic,
  onApply
}) => {
  // Хук для перевода текста (русский, арабский, английский)
  const { t } = useTranslate();
  
  // Состояния для выбранных фильтров
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedMonthValue, setSelectedMonthValue] = useState<number | null>(null);
  
  // Варианты оценок с количеством заполненных кружков
  const evaluationOptions = [
    { rating: 1, count: reviewStatic?.terribly, circles: [1, 0, 0, 0, 0] },
    { rating: 2, count: reviewStatic?.bad, circles: [1, 1, 0, 0, 0] },
    { rating: 3, count: reviewStatic?.notBad, circles: [1, 1, 1, 0, 0] },
    { rating: 4, count: reviewStatic?.good, circles: [1, 1, 1, 1, 0] },
    { rating: 5, count: reviewStatic?.excellent, circles: [1, 1, 1, 1, 1] },
  ];
  
  /**
   * Обработчик кнопки "Применить"
   * Преобразует числовые значения в строки и передает их в родительский компонент
   */
  const handleApply = () => {
    if (onApply) {
      // Преобразуем числовые значения в строки для API
      const ratingStr = selectedRating ? selectedRating.toString() : undefined;
      const monthStr = selectedMonthValue ? selectedMonthValue.toString() : undefined;
      
      onApply(ratingStr, monthStr);
    }
    
    // Закрываем модальное окно
    if (setIsShow) {
      setIsShow(false);
    }
  };
  
  /**
   * Обработчик кнопки "Сбросить"
   * Сбрасывает все выбранные фильтры
   */
  const handleReset = () => {
    // Сбрасываем локальные состояния
    setSelectedRating(null);
    setSelectedMonthValue(null);
    
    // Передаем сброшенные значения в родительский компонент
    if (onApply) {
      onApply(undefined, undefined);
    }
  };
  
  /**
   * Обработчик выбора оценки
   * При повторном нажатии на ту же оценку, выбор сбрасывается
   */
  const handleRatingSelect = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  /**
   * Обработчик выбора месяца
   * При повторном нажатии на тот же месяц, выбор сбрасывается
   */
  const handleMonthSelect = (value: number) => {
    setSelectedMonthValue(selectedMonthValue === value ? null : value);
  };
  
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {/* Кнопка закрытия модального окна */}
        <button
          className={styles.closeButton}
          onClick={() => setIsShow && setIsShow(false)}
        >
          <X size={24} />
        </button>
        
        {/* Заголовок модального окна */}
        <h2 className={styles.title}>{t("Фильтр отзывов", "تصفية المراجعات", "Filter reviews")}</h2>
        
        {/* Раздел с оценками */}
        <div className={styles.section}>
          <div className={styles.block}>
            <StatisticBlock reviewStatic={reviewStatic} />
          </div>
          <h3>{t("Оценка", "تقييم", "Evaluation")}</h3>
          <div className={styles.evaluationButtons}>
            {evaluationOptions.map((option) => (
              <button
                key={option.rating}
                className={`${styles.evaluationButton} ${
                  selectedRating === option.rating ? styles.active : ""
                }`}
                onClick={() => handleRatingSelect(option.rating)}
              >
                <div className="flex gap-1">
                  {option.circles.map((filled, i) => (
                    <Circle
                      key={i}
                      size={16}
                      style={{
                        color: "#3C5F63",
                        fill: filled ? "#3C5F63" : "none",
                      }}
                    />
                  ))}
                </div>
                <span>({option.count || 0})</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Раздел с месяцами */}
        <div className={styles.section}>
          <h3>{t("Период", "فترة", "Period")}</h3>
          <div className={styles.monthsGrid}>
            {months.map((month) => (
              <button
                key={month.value}
                className={`${styles.monthButton} ${
                  selectedMonthValue === month.value ? styles.active : ""
                }`}
                onClick={() => handleMonthSelect(month.value)}
              >
                {/* Перевод названия месяца в порядке: русский, арабский, английский */}
                {t(month.labelRu, month.labelAr, month.labelEn)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Кнопки действий */}
        <div className={styles.actions}>
          <button className={styles.resetButton} onClick={handleReset}>
            {t("Сбросить", "إعادة تعيين", "Reset")}
          </button>
          <button className={styles.applyButton} onClick={handleApply}>
            {t("Применить", "تطبيق", "Apply")}
          </button>
        </div>
      </div>
    </div>
  );
}