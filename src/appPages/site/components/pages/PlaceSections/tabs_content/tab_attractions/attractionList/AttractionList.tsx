import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./AttractionList.module.scss";
import Stars from "@/appPages/site/ui/stars/Stars";
import imgNone from "@/assets/images/universalImage/none.png";
import { useGetAttractionsQuery } from "@/redux/api/home";
import { ImageOff, MapPin, Loader } from "lucide-react";

interface AttractionsProps {
  isCurrent: number | null;
  setIsCurrent: (id: number | null) => void;
}

const ITEMS_PER_PAGE = 4;

const AttractionList: FC<AttractionsProps> = ({ setIsCurrent, isCurrent }) => {
  const { t } = useTranslate();
  const [isLimit, setIsLimit] = useState<number>(1);
  const [imgErrors, setImgErrors] = useState<{[key: number]: boolean}>({});
  const { data: attractions = [], isLoading, error } = useGetAttractionsQuery();
  const pathName = usePathname();
  const routeID: number = Number(pathName.split("/")[2]);

  // Handle image error for specific attraction
  const handleImageError = (id: number) => {
    setImgErrors(prev => ({...prev, [id]: true}));
  };

  // Фильтруем достопримечательности по текущему месту
  const attractionsInPlace = attractions.filter((el) => el.popular_places === routeID);

  // Устанавливаем первый элемент при загрузке, если currentId еще не задан
  useEffect(() => {
    if (attractionsInPlace.length > 0 && isCurrent === null) {
      const firstAttractionId = attractionsInPlace[0].id;
      setIsCurrent(firstAttractionId);
    }
  }, [attractionsInPlace, isCurrent, setIsCurrent]);

  // Пагинация
  const paginateArray = <T,>(arr: T[], pageSize: number): T[][] => {
    return arr.reduce(
      (result, _, index) =>
        index % pageSize ? result : [...result, arr.slice(index, index + pageSize)],
      [] as T[][]
    );
  };

  // Loading scenario
  if (isLoading) {
    return (
      <div className={scss.attractions}>
        <div className={scss.attractions_title}>
          <h4>
            {t(
              "Лучшие достопримечательности поблизости",
              "أفضل المعالم القريبة",
              "The best attractions nearby"
            )}
          </h4>
        </div>
        <div className={scss.noAttractionsContainer}>
          <Loader size={48} className={scss.loadingSpinner} />
          <p>{t("Загрузка...", "جار التحميل...", "Loading...")}</p>
        </div>
      </div>
    );
  }

  // Error scenario
  if (error) {
    return (
      <div className={scss.attractions}>
        <div className={scss.attractions_title}>
          <h4>
            {t(
              "Лучшие достопримечательности поблизости",
              "أفضل المعالم القريبة",
              "The best attractions nearby"
            )}
          </h4>
        </div>
        <div className={scss.noAttractionsContainer}>
          <ImageOff size={48} />
          <p>{t("Ошибка загрузки данных", "خطأ في تحميل البيانات", "Error loading data")}</p>
        </div>
      </div>
    );
  }

  // Если нет достопримечательностей
  if (attractionsInPlace.length === 0) {
    return (
      <div className={scss.attractions}>
        <div className={scss.attractions_title}>
          <h4>
            {t(
              "Лучшие достопримечательности поблизости",
              "أفضل المعالم القريبة",
              "The best attractions nearby"
            )}
          </h4>
        </div>
        <div className={scss.noAttractionsContainer}>
          <MapPin size={48} />
          <p>{t("Нет достопримечательностей", "لا توجد معالم", "No attractions")}</p>
        </div>
      </div>
    );
  }

  // Рендерим элементы списка
  const renderAttractionItem = attractionsInPlace.map((el, i) => (
    <div
      onClick={() => setIsCurrent(el.id)}
      key={i}
      className={`${scss.item} ${isCurrent === el.id ? scss.active : ""}`} // Добавляем активный класс
    >
      <div className={scss.imageContainer}>
        {imgErrors[el.id] || !el.main_image ? (
          <div className={scss.imgNotFound}>
            <ImageOff size={32} />
            <p>{t("Изображение не найдено", "الصورة غير موجودة", "Image not found")}</p>
          </div>
        ) : (
          <Image
            src={el.main_image}
            alt={el.attraction_name}
            width={281}
            height={152}
            unoptimized
            style={{
              objectFit: "cover",
              backgroundColor: "#f0f0f0",
            }}
            onError={() => handleImageError(el.id)}
          />
        )}
      </div>
      <div className={scss.info}>
        <h6 className={scss.title}>{el.attraction_name}</h6>
        <div className={scss.stars_review}>
          <Stars rating={el.avg_rating} />
          <p>Reviews: {el.rating_count}</p>
        </div>
      </div>
    </div>
  ));

  const dividedArray = paginateArray(renderAttractionItem, ITEMS_PER_PAGE);
  const isAllItemsShown = isLimit >= dividedArray.length;

  return (
    <div className={scss.attractions}>
      <div className={scss.attractions_title}>
        <h4>
          {t(
            "Лучшие достопримечательности поблизости",
            "أفضل المعالم القريبة",
            "The best attractions nearby"
          )}
        </h4>
        {attractionsInPlace.length > ITEMS_PER_PAGE && !isAllItemsShown && (
          <p onClick={() => setIsLimit(dividedArray.length)}>
            {t("Показать все", "عرض الكل", "Show all")}
          </p>
        )}
      </div>
      {dividedArray.slice(0, isLimit).map((item, index) => (
        <div key={index} className={scss.list}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default AttractionList;