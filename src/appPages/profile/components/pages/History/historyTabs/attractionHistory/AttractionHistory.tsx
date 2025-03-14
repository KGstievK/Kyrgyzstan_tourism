import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import scss from './AttractionHistory.module.scss';
import { ImageOff, MapPin, Loader } from "lucide-react";
import Stars from "@/appPages/site/ui/stars/Stars";
import { useGetAttractionsQuery } from "@/redux/api/home";

const AttractionHistory = () => {
  const { data: attractions = [], isLoading, error } = useGetAttractionsQuery();
  const [imgErrors, setImgErrors] = useState<{[key: number]: boolean}>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Обработка ошибок загрузки изображений
  const handleImageError = (id: number) => {
    setImgErrors(prev => ({...prev, [id]: true}));
  };

  // Функция для горизонтального скролла
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // Если мы близко к концу скролла
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

  // Loading scenario
  if (isLoading) {
    return (
      <div className={scss.attractions}>
        <div className={scss.noAttractionsContainer}>
          <Loader size={48} className={scss.loadingSpinner} />
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  // Error scenario
  if (error) {
    return (
      <div className={scss.attractions}>
        <div className={scss.noAttractionsContainer}>
          <ImageOff size={48} />
          <p>Ошибка загрузки данных</p>
        </div>
      </div>
    );
  }

  // Если нет достопримечательностей
  if (!attractions || attractions.length === 0) {
    return (
      <div className={scss.attractions}>
        <div className={scss.noAttractionsContainer}>
          <MapPin size={48} />
          <p>Нет достопримечательностей</p>
        </div>
      </div>
    );
  }

  return (
    <div className={scss.attractions}>
      <div className={scss.list} ref={scrollContainerRef}>
        {attractions.map((attraction, i) => (
          <div key={i} className={scss.item}>
            <div className={scss.imageContainer}>
              {imgErrors[attraction.id] || !attraction.main_image ? (
                <div className={scss.imgNotFound}>
                  <ImageOff size={32} />
                  <p>Изображение не найдено</p>
                </div>
              ) : (
                <Image
                  src={attraction.main_image}
                  alt={attraction.attraction_name}
                  width={281}
                  height={152}
                  unoptimized
                  style={{
                    objectFit: "cover",
                    backgroundColor: "#f0f0f0",
                  }}
                  onError={() => handleImageError(attraction.id)}
                />
              )}
            </div>
            <div className={scss.info}>
              <h6 className={scss.title}>{attraction.attraction_name}</h6>
              <div className={scss.stars_review}>
                <Stars rating={attraction.avg_rating} width={16} height={16} />
                <p>Reviews: {attraction.rating_count}</p>
              </div>
              <div className={scss.prices}>
                {`${'$$$'} - ${'$$$'}, ${"Local Sights"}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttractionHistory;