import React, { FC, useState, useEffect } from "react";
import scss from "./LikePost.module.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  useDeleteFavoriteMutation,
  useGetFavoriteQuery,
  usePostFavoriteMutation,
} from "@/redux/api/regions";

interface LikePostProps {
  postId: number;
}

const LikePost: FC<LikePostProps> = ({ postId }) => {
  const [postFavorite] = usePostFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const { data: favorite, refetch } = useGetFavoriteQuery(); // refetch коштук
  console.log("🚀 ~ favorite:", favorite);

  const [isLiked, setIsLiked] = useState<boolean>(false);

  // 🛠 favorite дайындары келгенде isLiked'ди жаңыртуу
  useEffect(() => {
    if (favorite) {
      setIsLiked(favorite.some((el) => el.popular_place?.id === postId));
    }
  }, [favorite, postId]);

  const postLike = async () => {
    try {
      const response = await postFavorite({
        popular_place: postId,
        like: true,
      }).unwrap();
      console.log("✅ Post response:", response);
      refetch();
    } catch (error) {
      console.error("❌ Ошибка при добавлении избранного:", error);
    }
  };

  return (
    <div className={scss.LikePost}>
      <div className="container">
        <div className={scss.heart} onClick={postLike}>
          {isLiked ? (
            <FaHeart className={scss.heartIconRed} />
          ) : (
            <FaRegHeart className={scss.heartIcon} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LikePost;
