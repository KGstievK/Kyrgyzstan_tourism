"use client";
import { useGetFavoriteItemsQuery } from '@/redux/api/auth';
import React, { useState } from 'react';
import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./Favorites.module.scss";
import imgHeart from "@/assets/images/regions/Vector.png";
import imgMetka from "@/assets/images/galleryImages/metka.png";
import Stars from "@/appPages/site/ui/stars/Stars";

const Favorites = () => {
  const { data } = useGetFavoriteItemsQuery();
  const { t } = useTranslate();
  console.log(data);
  
  // Функция для обработки ошибок загрузки изображений
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://placehold.co/600x400/e0e0e0/969696?text=Image+Not+Found";
    target.alt = "Image not available";
  };

  return (
    <section id={scss.Favorites}>
      <div className="container">
        <div className={scss.list}>
          {data && data.map((item, i) => (
            <React.Fragment key={i}>
              {/* Отображение галереи */}
              {item.gallery && (
                <div className={scss.item}>
                  <img 
                    src={item.gallery.gallery_image} 
                    alt="gallery place" 
                    onError={handleImageError}
                  />
                  <div className={scss.block}>
                    <h6>{item.gallery.gallery_name}</h6>
                    <div>
                      <span className={scss.grade}>{item.gallery.avg_rating}</span>
                      <Stars rating={item.gallery.avg_rating} width={9} height={9} />
                      <span className={scss.review}>
                        {item.gallery.rating_count} {t("Отзывы", "مراجعات", "reviews")}
                      </span>
                    </div>
                    <span className={scss.metka}>
                      <img src={imgMetka.src} alt="location icon" onError={handleImageError} />
                      <span>{item.gallery.address}</span>
                    </span>
                  </div>
                  <img className={scss.heart} src={imgHeart.src} alt="favorite icon" onError={handleImageError} />
                </div>
              )}

              {/* Отображение достопримечательностей */}
              {item.attractions && (
                <div className={scss.item}>
                  <img 
                    src={item.attractions.main_image} 
                    alt="attraction place" 
                    onError={handleImageError}
                  />
                  <div className={scss.block}>
                    <h6>{item.attractions.attraction_name}</h6>
                    <div>
                      <span className={scss.grade}>{item.attractions.avg_rating}</span>
                      <Stars rating={item.attractions.avg_rating} width={9} height={9} />
                      <span className={scss.review}>
                        {item.attractions.rating_count} {t("Отзывы", "مراجعات", "reviews")}
                      </span>
                    </div>
                    <span className={scss.metka}>
                      <img src={imgMetka.src} alt="" />
                      <span>{item.attractions.region_category}</span>
                    </span>
                  </div>
                  <img className={scss.heart} src={imgHeart.src} alt="" />
                </div>
              )}

              {/* Отображение отелей */}
              {item.hotels && (
                <div className={scss.item}>
                  <img 
                    src={item.hotels.main_image} 
                    alt="hotel place" 
                    onError={handleImageError}
                  />
                  <div className={scss.block}>
                    <h6>{item.hotels.name}</h6>
                    <div>
                      <span className={scss.grade}>{item.hotels.avg_rating}</span>
                      <Stars rating={item.hotels.avg_rating} width={9} height={9} />
                      <span className={scss.review}>
                        {item.hotels.rating_count} {t("Отзывы", "مراجعات", "reviews")}
                      </span>
                    </div>
                  </div>
                  <img className={scss.heart} src={imgHeart.src} alt="" />
                </div>
              )}

              {/* Отображение популярных регионов */}
              {item.popular_region && (
                <div className={scss.item}>
                  <img 
                    src={item.popular_region.popular_image} 
                    alt="popular region" 
                    onError={handleImageError}
                  />
                  <div className={scss.block}>
                    <h6>{item.popular_region.popular_name}</h6>
                    <div>
                      <span className={scss.grade}>{item.popular_region.avg_rating}</span>
                      <Stars rating={item.popular_region.avg_rating} width={9} height={9} />
                      <span className={scss.review}>
                        {item.popular_region.rating_count} {t("Отзывы", "مراجعات", "reviews")}
                      </span>
                    </div>
                    <span className={scss.metka}>
                      <img src={imgMetka.src} alt="" />
                      <span>{item.popular_region.region}</span>
                    </span>
                  </div>
                  <img className={scss.heart} src={imgHeart.src} alt="" />
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