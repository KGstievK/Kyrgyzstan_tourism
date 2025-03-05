import React, { useState } from "react";
import { X, Pencil } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./ReviewModal.module.scss";
import { usePostRewiewHotelMutation } from "@/redux/api/reviews";
import { useGetMeQuery } from "@/redux/api/auth";
import { useGetHotelIDQuery } from "@/redux/api/place";
import { useRouter } from "next/router";
import { useParams, usePathname } from "next/navigation";

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
  isCurrent
}) => {
  const { register, handleSubmit } = useForm<REVIEWS.RewiewHotelRquest>();
  const [postRewiewHotel] = usePostRewiewHotelMutation();
  const id  = useParams();

  console.log("🚀 ~ id:", id)
  console.log("🚀 ~ idcurrent:", isCurrent)
  // const hotelId = id ? parseInt(id as string, 6) : undefined; // Преобразуем строку в число
  const { data: user } = useGetMeQuery();
  const { data: hotels } = useGetHotelIDQuery(Number(isCurrent)); // Передаем число в запрос
  const [rating, setRating] = useState(0);
  console.log("🚀 ~ hotels:", hotels);
  console.log("🚀 ~ hotels:", hotels?.id);

  const onSubmitForm: SubmitHandler<REVIEWS.RewiewHotelRquest> = async (
    data
  ) => {
    if (!user?.[0]?.id || !hotels?.id) return;

    // Преобразуем файлы в base64
    const images = await Promise.all(
      uploadedFiles.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );

    const reviewData: REVIEWS.RewiewHotelRquest = {
      client_hotel: user[0].id,
      hotel: hotels.id!, // Используем id отеля
      comment: data.comment,
      rating: rating,
      images: images,
    };
    console.log(
      "🚀 ~ constonSubmitForm:SubmitHandler<REVIEWS.RewiewHotelRquest>= ~ reviewData:",
      reviewData
    );

    try {
      await postRewiewHotel(reviewData);
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