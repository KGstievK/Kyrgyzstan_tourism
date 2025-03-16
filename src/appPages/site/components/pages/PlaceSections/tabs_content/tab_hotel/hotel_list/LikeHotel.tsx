import React, { FC, useState, useEffect } from "react";
import scss from "./LikeHotel.module.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  useDeleteFavoriteMutation,
  useGetFavoriteQuery,
  usePostFavoriteMutation,
} from "@/redux/api/regions";

interface LikePostProps {
  postId: number;
}

const LikeHotel: FC<LikePostProps> = ({ postId }) => {
  const [postFavorite] = usePostFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const { data, refetch } = useGetFavoriteQuery();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setIsLiked(data.some((el) => el.hotels?.id === postId));
    }
  }, [data, postId]);

  const toggleLike = async () => {
    try {
      if (!data || !Array.isArray(data)) return;
      const favoriteItem = data.find((el) => el.hotels?.id === postId);
      if (isLiked && favoriteItem) {
        await deleteFavorite({ id: favoriteItem.id }).unwrap();
      } else {
        await postFavorite({
          hotels: postId,
          like: true,
        }).unwrap();
      }
      refetch();
    } catch (error) {
      console.error("❌ Ошибка при изменении избранного:", error);
    }
  };

  return (
    <div className={scss.heart} onClick={toggleLike}>
      {isLiked ? (
        <FaHeart className={scss.heartIconRed} />
      ) : (
        <FaRegHeart className={scss.heartIcon} />
      )}
    </div>
  );
};

export default LikeHotel;
