"use client";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./Places.module.scss";
import imgRight from "@/assets/images/regions/Arrow_alt_lright.png";
import imgHeart from "@//assets/images/regions/Vector.png";
import Link from "next/link";
import { useGetRegionListQuery } from "@/redux/api/regions";
import { usePathname } from "next/navigation";
import Stars from "@/appPages/site/ui/stars/Stars";
import React from "react";

const Places = () => {
  const { t } = useTranslate();
  const { data, isLoading, isError } = useGetRegionListQuery();
  const pathName = usePathname();
  const routeName = pathName.split("/")[1];  
  const popularPlacesInRegion = data?.find((place) => place.region_category.trim().toLocaleLowerCase() === routeName.trim().toLocaleLowerCase());

  // Функция для обработки ошибок загрузки изображений
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://placehold.co/600x400/e0e0e0/969696?text=Image+Not+Found";
    target.alt = "Image not available";
  };

  return (
    <>
      <section id={scss.Places}>
        <div className="container">
          <h2>{t("Популярные места", "أماكن مشهورة", "Popular places")}</h2>
          <div className={scss.list}>
            {popularPlacesInRegion?.popular_places?.map((place, i) => (
              <div key={i} className={scss.item}>
                <img 
                  src={place.popular_image} 
                  alt="popular place" 
                  onError={handleImageError}
                />
                <div className={scss.block}>
                  <h6>{place.popular_name}</h6>
                  <div>
                    <span className={scss.grade}>{place.avg_rating}</span>
                    <div className={scss.stars}>
                      <Stars rating={place.avg_rating} width={9} height={9} />
                    </div>
                    <span className={scss.review}>
                      {place.rating_count} {t("Отзывы", "مراجعات", "reviews")}
                    </span>
                  </div>
                </div>
                <img 
                  className={scss.heart} 
                  src={imgHeart.src} 
                  alt="like" 
                  onError={handleImageError}
                />
                <Link
                  href={`/${routeName}/${place.id}`}
                >
                  <img 
                    className={scss.right} 
                    src={imgRight.src} 
                    alt="go to details" 
                    onError={handleImageError}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Places;