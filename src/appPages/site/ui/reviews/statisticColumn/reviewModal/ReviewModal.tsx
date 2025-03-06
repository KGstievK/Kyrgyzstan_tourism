"use client";
import React, { useState } from "react";
import { X, Pencil } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./ReviewModal.module.scss";
import { usePostRewiewHotelMutation } from "@/redux/api/reviews";
import { useGetMeQuery } from "@/redux/api/auth";
import { useGetHotelIDQuery } from "@/redux/api/place";

interface ReviewModalProps {
  onClose: () => void;
  onSubmit: () => void;
  uploadedFiles: File[];
  isCurrent: number | null; // ID текущей сущности
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  onClose,
  onSubmit,
  uploadedFiles,
  isCurrent,
}) => {
  const { register, handleSubmit } = useForm<REVIEWS.RewiewHotelRquest>();
  const [postRewiewHotel] = usePostRewiewHotelMutation();
  const { data: user } = useGetMeQuery();
  const { data: hotels } = useGetHotelIDQuery(Number(isCurrent));
  const [rating, setRating] = useState(0);

  const onSubmitForm: SubmitHandler<REVIEWS.RewiewHotelRquest> = async (data) => {
    if (!user?.[0]?.id || !hotels?.id) return;

    // Создаем FormData
    const formData = new FormData();

    // Добавляем текстовые данные
    formData.append("client_hotel", user[0].id!.toString());
    formData.append("hotel", hotels.id!.toString());
    formData.append("comment", data.comment);
    if (rating) formData.append("rating", rating.toString());

    // Добавляем изображения
    uploadedFiles.forEach((file, index) => {
      formData.append("images", file); // Ключ "images" должен совпадать с ожиданием сервера
    });

    try {
      // Отправляем FormData на сервер
      await postRewiewHotel(formData).unwrap();
      onSubmit();
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
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
              className={`${styles.ratingCircle} ${
                value === rating ? styles.active : ""
              }`}
              onClick={() => handleRatingChange(value)}
              aria-label={`Rate ${value} stars`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className={styles.reviewInputContainer}>
            <Pencil className={styles.pencilIcon} size={20} />
            <textarea
              className={styles.reviewInput}
              placeholder="Tell us about your experience"
              {...register("comment")}
            />
          </div>

          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;