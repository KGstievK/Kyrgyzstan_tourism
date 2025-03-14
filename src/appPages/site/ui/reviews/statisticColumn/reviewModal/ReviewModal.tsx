"use client";
import React, { useState } from "react";
import { X, Pencil } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import scss from "./ReviewModal.module.scss";
import {
  usePostReplyAttractionMutation,
  usePostReplyHotelMutation,
  usePostReplyKitchenMutation,
  usePostReplyPlaceMutation,
  usePostRewiewAttractionMutation,
  usePostRewiewHotelMutation,
  usePostRewiewKitchenMutation,
  usePostRewiewPlacesMutation,
} from "@/redux/api/reviews";
import { useGetMeQuery } from "@/redux/api/auth";
import Rating from "./Rating/Rating";

interface ReviewModalProps {
  onClose: () => void;
  onSubmit: () => void;
  uploadedFiles: File[];
  isCurrent: number | null;
  isTab: number;
  isReply?: boolean;
  reviewId?: number;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  onClose,
  onSubmit,
  uploadedFiles,
  isCurrent,
  isTab,
  isReply = false,
  reviewId,
}) => {
  const { register, handleSubmit } = useForm<
    | REVIEWS.RewiewHotelRequest
    | REVIEWS.ReviewKitchenRequest
    | REVIEWS.ReviewAttractionRequest
    | REVIEWS.ReviewPlacesRequest
    | REVIEWS.ReplyHotelRequest
    | REVIEWS.ReplyKitchenRequest
    | REVIEWS.ReplyAttractionRequest
    | REVIEWS.ReplyPlaceRequest
  >();

  const [postRewiewPlaces] = usePostRewiewPlacesMutation();
  const [postRewiewHotel] = usePostRewiewHotelMutation();
  const [postRewiewKitchen] = usePostRewiewKitchenMutation();
  const [postRewiewAttraction] = usePostRewiewAttractionMutation();

  const [postReplyHotel] = usePostReplyHotelMutation();
  const [postReplyKitchen] = usePostReplyKitchenMutation();
  const [postReplyAttraktion] = usePostReplyAttractionMutation();
  const [postReplyPlace] = usePostReplyPlaceMutation();

  const { data: user } = useGetMeQuery();
  const [rating, setRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [nutritionRating, setNutritionRating] = useState(0);
  const [priceRating, setPriceRating] = useState(0);
  const [atmosphereRating, setAtmosphereRating] = useState(0);

  const onSubmitForm: SubmitHandler<
    | REVIEWS.RewiewHotelRequest
    | REVIEWS.ReviewKitchenRequest
    | REVIEWS.ReviewAttractionRequest
    | REVIEWS.ReviewPlacesRequest
    | REVIEWS.ReplyHotelRequest
    | REVIEWS.ReplyKitchenRequest
    | REVIEWS.ReplyAttractionRequest
    | REVIEWS.ReplyPlaceRequest
  > = async (data) => {
    if (!user?.[0]?.id || !isCurrent) return;

    const formData = new FormData();

    if (isReply) {
      formData.append("review", reviewId!.toString());
      formData.append("comment", data.comment);
      formData.append("user", user[0].id!.toString());

      try {
        if (isTab === 0) {
          await postReplyPlace(formData);
        } else if (isTab === 1) {
          await postReplyHotel(formData);
        } else if (isTab === 2) {
          await postReplyKitchen(formData);
        } else if (isTab === 4) {
          await postReplyAttraktion(formData);
        }
        onSubmit();
      } catch (error) {
        console.error("Failed to submit reply:", error);
      }
    } else {
      formData.append("client", user[0].id!.toString());
      formData.append("comment", data.comment);
      if (rating) formData.append("rating", rating.toString());

      uploadedFiles.forEach((file, index) => {
        formData.append("images", file);
      });

      try {
        if (isTab === 0) {
          formData.append("popular_place", isCurrent.toString());
          await postRewiewPlaces(formData);
        } else if (isTab === 1) {
          formData.append("hotel", isCurrent.toString());
          await postRewiewHotel(formData).unwrap();
        } else if (isTab === 2) {
          formData.append("kitchen", isCurrent.toString());
          if (serviceRating)
            formData.append("service_rating", serviceRating.toString());
          if (nutritionRating)
            formData.append("nutrition_rating", nutritionRating.toString());
          if (priceRating)
            formData.append("price_rating", priceRating.toString());
          if (atmosphereRating)
            formData.append("atmosphere_rating", atmosphereRating.toString());
          await postRewiewKitchen(formData).unwrap();
        } else if (isTab === 4) {
          formData.append("attractions", isCurrent.toString());
          await postRewiewAttraction(formData).unwrap();
        }
        onSubmit();
      } catch (error) {
        console.error("Failed to submit review:", error);
      }
    }
  };

  return (
    <div className={scss.modalOverlay}>
      <div className={scss.modalContent}>
        <button className={scss.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        {isTab === 2 && !isReply ? (
          <>
            <div className={scss.header}>
              <h2 className={scss.title}>What do you think?</h2>
              <p className={scss.subtitle}>Please give your rating</p>
            </div>

            <div className={scss.ratingContainer}>
              <div className={scss.KitchenRewiew}>
                <p>overall assessment:</p>
                <Rating value={rating} onChange={setRating} />
                <p>evaluation of the service</p>
                <Rating value={serviceRating} onChange={setServiceRating} />
                <p>nutrition assessment</p>
                <Rating value={nutritionRating} onChange={setNutritionRating} />
                <p>price estimation</p>
                <Rating value={priceRating} onChange={setPriceRating} />
                <p>assessment of the atmosphere</p>
                <Rating
                  value={atmosphereRating}
                  onChange={setAtmosphereRating}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={scss.header}>
              <h2 className={scss.title}>
                {isReply
                  ? `Response to user @${reviewId}`
                  : "What do you think ?"}
              </h2>
              {!isReply && (
                <p className={scss.subtitle}>Please give your rating</p>
              )}
            </div>
            {!isReply && (
              <div className={scss.ratingContainer}>
                <Rating value={rating} onChange={setRating} />
              </div>
            )}
          </>
        )}

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className={scss.reviewInputContainer}>
            <Pencil className={scss.pencilIcon} size={20} />
            <textarea
              className={scss.reviewInput}
              placeholder={
                isReply
                  ? "Write your response..."
                  : "Tell us about your experience"
              }
              {...register("comment")}
            />
          </div>
          <div className={scss.btn}>
            <button type="submit" className={scss.sendButton}>
              Send
            </button>
            <button className={scss.sendButton} onClick={onClose}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
