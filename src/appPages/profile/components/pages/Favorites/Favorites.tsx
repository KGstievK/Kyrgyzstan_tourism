"use client";
import { useGetFavoriteItemsQuery } from '@/redux/api/auth';
import React from 'react';
import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./Favorites.module.scss";
import imgHeart from "@/assets/images/regions/Vector.png";
import imgMetka from "@/assets/images/galleryImages/metka.png";
import Stars from "@/appPages/site/ui/stars/Stars";

/**
 * Компонент Favorites отображает список избранных элементов пользователя,
 * включая галереи, достопримечательности, отели и популярные регионы.
 */
const Favorites = () => {
  const { data, isLoading, error } = useGetFavoriteItemsQuery();
  const { t } = useTranslate();
  
  // Функция для обработки ошибок загрузки изображений
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://placehold.co/600x400/e0e0e0/969696?text=Image+Not+Found";
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
      <div className="container">
        <div className={scss.list}>
          {data.map((item, index) => (
            <React.Fragment key={item.id || index}>
              {/* Отображение галереи */}
              {item.gallery && (
                <div className={scss.item}>
                  <img 
                    src={item.gallery.gallery_image} 
                    alt={item.gallery.gallery_name || "Gallery image"} 
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
                      <img src={imgMetka.src} alt="Location icon" onError={handleImageError} />
                      <span>{item.gallery.address}</span>
                    </span>
                  </div>
                  <img className={scss.heart} src={imgHeart.src} alt="Favorite icon" onError={handleImageError} />
                </div>
              )}

              {/* Отображение достопримечательностей */}
              {item.attractions && (
                <div className={scss.item}>
                  <img 
                    src={item.attractions.main_image} 
                    alt={item.attractions.attraction_name || "Attraction image"} 
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
                      <img src={imgMetka.src} alt="Location icon" onError={handleImageError} />
                      <span>{item.attractions.region_category}</span>
                    </span>
                  </div>
                  <img className={scss.heart} src={imgHeart.src} alt="Favorite icon" onError={handleImageError} />
                </div>
              )}

              {/* Отображение отелей */}
              {item.hotels && (
                <div className={scss.item}>
                  <img 
                    src={item.hotels.main_image} 
                    alt={item.hotels.name || "Hotel image"} 
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
                    {item.hotels.region && (
                      <span className={scss.metka}>
                        <img src={imgMetka.src} alt="Location icon" onError={handleImageError} />
                        <span>{item.hotels.region}</span>
                      </span>
                    )}
                  </div>
                  <img className={scss.heart} src={imgHeart.src} alt="Favorite icon" onError={handleImageError} />
                </div>
              )}

              {/* Отображение популярных регионов */}
              {item.popular_region && (
                <div className={scss.item}>
                  <img 
                    src={item.popular_region.popular_image} 
                    alt={item.popular_region.popular_name || "Popular region image"} 
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
                      <img src={imgMetka.src} alt="Location icon" onError={handleImageError} />
                      <span>{item.popular_region.region}</span>
                    </span>
                  </div>
                  <img className={scss.heart} src={imgHeart.src} alt="Favorite icon" onError={handleImageError} />
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