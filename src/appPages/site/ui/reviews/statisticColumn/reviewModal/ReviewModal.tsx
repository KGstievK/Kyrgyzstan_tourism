"use client";
import React, { useState } from "react";
import { X, Pencil } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./ReviewModal.module.scss";
import { usePostRewiewHotelMutation, usePostRewiewKitchenMutation } from "@/redux/api/reviews";
import { useGetMeQuery } from "@/redux/api/auth";
import { useGetHotelIDQuery, useGetKitchenIDQuery } from "@/redux/api/place";

interface ReviewModalProps {
  onClose: () => void;
  onSubmit: () => void;
  uploadedFiles: File[];
  isCurrent: number | null; // ID текущей сущности
  isTab: number; // 0: places, 1: hotels, 2: kitchens, 3: events, 4: attractions
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  onClose,
  onSubmit,
  uploadedFiles,
  isCurrent,
  isTab,
}) => {
  const { register, handleSubmit } = useForm<REVIEWS.RewiewHotelRquest | REVIEWS.ReviewKitchenRequest>();
  const [postRewiewHotel] = usePostRewiewHotelMutation();
  const [postRewiewKitchen] = usePostRewiewKitchenMutation();

  const { data: user } = useGetMeQuery();
  const { data: hotels } = useGetHotelIDQuery(Number(isCurrent));
  const { data: kitchen } = useGetKitchenIDQuery(Number(isCurrent));
  const [rating, setRating] = useState(0);

  const onSubmitForm: SubmitHandler<REVIEWS.RewiewHotelRquest | REVIEWS.ReviewKitchenRequest> = async (data) => {
    if (!user?.[0]?.id || !isCurrent) return;

    // Создаем FormData
    const formData = new FormData();

    // Добавляем общие данные
    formData.append("comment", data.comment);
    if (rating) formData.append("rating", rating.toString());

    // Добавляем изображения
    uploadedFiles.forEach((file, index) => {
      formData.append("images", file); // Ключ "images" должен совпадать с ожиданием сервера
    });

    try {
      if (isTab === 1) { // Если это отель
        formData.append("client_hotel", user[0].id!.toString());
        formData.append("hotel", isCurrent.toString());
        await postRewiewHotel(formData).unwrap();
      } else if (isTab === 2) { // Если это кухня
        formData.append("client_kitchen", user[0].id!.toString());
        formData.append("kitchen_region", isCurrent.toString());
        await postRewiewKitchen(formData).unwrap();
      }

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