import React, { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Coffee, ImageOff } from "lucide-react";

import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./KitchenHistory.module.scss"
import Stars from "@/appPages/site/ui/stars/Stars";
import { useGetKitchensQuery } from "@/redux/api/place";

interface CafeProps {
  isCurrent: number | null;
  setIsCurrent: (id: number) => void;
}

const Cafes: FC<CafeProps> = ({ setIsCurrent, isCurrent }) => {
  const { t } = useTranslate();
  const { data: cafes = [], isLoading, error } = useGetKitchensQuery();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Функция для обработки ошибок загрузки изображений
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://placehold.co/600x400/e0e0e0/969696?text=No+Image";
    target.alt = "Image not available";
    target.style.objectFit = "contain";
    target.style.backgroundColor = "#f5f5f5";
  };


  // Функция для горизонтального скролла
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // Если мы близко к концу скролла, можно добавить логику подгрузки
    if (scrollWidth - (scrollLeft + clientWidth) < 200) {
      // Здесь можно добавить логику подгрузки если нужно
    }
  };

  // Добавляем слушатель события скролла
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // No cafes or error scenario
  if (error) {
    return (
      <div className={scss.cafes}>
        <div className={scss.noCafesContainer}>
          <ImageOff size={48} />
          <p>{t("Ошибка загрузки данных", "خطأ في تحميل البيانات", "Error loading data")}</p>
        </div>
      </div>
    );
  }

  // Loading scenario
  if (isLoading) {
    return (
      <div className={scss.cafes}>
        <div className={scss.noCafesContainer}>
          <div className={scss.loadingSpinner}></div>
          <p>{t("Загрузка...", "جار التحميل...", "Loading...")}</p>
        </div>
      </div>
    );
  }

  // No cafes scenario
  if (!cafes.length) {
    return (
      <div className={scss.cafes}>
        <div className={scss.noCafesContainer}>
          <Coffee size={48} />
          <p>{t("В этом месте пока нет ресторанов", "لا توجد مطاعم في هذا المكان حتى الآن", "No restaurants in this place yet")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={scss.cafes}>
      <div className={scss.list} ref={scrollContainerRef}>
        {cafes.map((el, i) => (
          <div onClick={() => setIsCurrent(el.id)} key={el.id} className={scss.item}>
            <Image
              src={el.main_image}
              alt={el.kitchen_name}
              width={486}
              height={543}
              unoptimized
              style={{
                objectFit: "cover",
                backgroundColor: "#f0f0f0",
              }}
              onError={(e) => handleImageError(e as any)}
            />
            <div className={scss.info}>
              <h6 className={scss.title}>{el.kitchen_name}</h6>
              <div className={scss.stars_review}>
                <Stars rating={el.average_rating} width={16} height={16} />
                <p>Reviews: {el.rating_count}</p>
              </div>
              <div className={scss.prices}>
                {`$${el.price} - $${el.price}, ${el.type_of_cafe.join(", ")}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cafes;