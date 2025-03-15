"use client";
import { useGetFavoriteItemsQuery, useGetMeQuery } from "@/redux/api/auth";
import React, { useState } from "react";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./Favorites.module.scss";
import imgHeart from "@/assets/images/regions/Vector.png";
import imgMetka from "@/assets/images/galleryImages/metka.png";
import Stars from "@/appPages/site/ui/stars/Stars";

import {
  useDeleteFavoriteMutation,
  useGetFavoriteQuery,
} from "@/redux/api/regions";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiSearch2Line } from "react-icons/ri";
import { GoArrowUpRight } from "react-icons/go";
import { FiArrowUpRight } from "react-icons/fi";
import user1 from "../../../../../assets/images/Favorites/user1.jpg";
import SearchProfile from "../SearchProfile/SearchProfile";
import User from "../User/User";

const Favorites = () => {
  const { t } = useTranslate();
  const { data, error, isLoading } = useGetFavoriteQuery();
  console.log("🚀 ~ Gallery ~ favorite:", data);
  const { data: user } = useGetMeQuery();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const handleDeleteFavorite = async (placeId: number) => {
    try {
      await deleteFavorite({ id: placeId });
      console.log(
        "🚀 ~ handleDeleteFavorite ~ deleteFavorite:",
        deleteFavorite
      );
      console.log("Favorite removed successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Функция для обработки ошибок загрузки изображений
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src =
      "https://placehold.co/600x400/e0e0e0/969696?text=Image+Not+Found";
    target.alt = "Image not available";
  };

  if (isLoading) {
    return (
      <section id={scss.Favorites}>
        <div className="container">
          <div className={scss.loading}>
            {t("Загрузка...", "جار التحميل...", "Loading...")}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id={scss.Favorites}>
        <div className="container">
          <div className={scss.error}>
            {t("Ошибка при загрузке данных", "خطأ في تحميل البيانات", "Error loading data")}
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section id={scss.Favorites}>
        <div className="container">
          <div className={scss.empty}>
            {t("У вас пока нет избранных элементов", "ليس لديك عناصر مفضلة حتى الآن", "You don't have any favorite items yet")}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={scss.Favorites}>
      <div className={scss.headerUser}>
        <SearchProfile />
        <User />
      </div>
      <div className={scss.content}>
        <h1>Favorites</h1>
        <div className={scss.list}>
          {data &&
            data.map((item, i) => (
              <React.Fragment key={i}>
                {item.popular_place && (
                  <div className={scss.item}>
                    <img
                      src={item.popular_place.popular_image}
                      alt="gallery place"
                      onError={handleImageError}
                    />
                    <div className={scss.block}>
                      <h6>{item.popular_place.popular_name}</h6>
                      <div>
                        <span className={scss.grade}>
                          {item.popular_place.avg_rating}
                        </span>
                        <Stars
                          rating={item.popular_place.avg_rating}
                          width={9}
                          height={9}
                        />
                        <span className={scss.review}>
                          {item.popular_place.rating_count}{" "}
                          {t("Отзывы", "مراجعات", "reviews")}
                        </span>
                      </div>
                      <span className={scss.metka}>
                        <FaLocationDot className={scss.locationDot} />
                        <span>{item.popular_place.region}</span>
                      </span>
                    </div>
                    <div className={scss.heart}>
                      <FaHeart
                        onClick={() => handleDeleteFavorite(item.id)}
                        className={scss.heartIconRed}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
