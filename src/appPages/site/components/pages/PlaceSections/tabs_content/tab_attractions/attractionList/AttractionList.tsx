import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./AttractionList.module.scss";
import Stars from "@/appPages/site/ui/stars/Stars";
import imgNone from "@/assets/images/universalImage/none.png";
import { useGetAttractionsQuery } from "@/redux/api/home";

interface AttractionsProps {
  isCurrent: number | null;
  setIsCurrent: (id: number | null) => void;
}

const ITEMS_PER_PAGE = 4;

const AttractionList: FC<AttractionsProps> = ({ setIsCurrent, isCurrent }) => {
  const { t } = useTranslate();
  const [isLimit, setIsLimit] = useState<number>(1);
  const [errorImg, setErrorImg] = useState(false);
  const { data: attractions = [] } = useGetAttractionsQuery();
  const pathName = usePathname();
  const routeID: number = Number(pathName.split("/")[2]);

  // Filter cafes for current place
  const attractionsInPlace = attractions.filter((el) => el.popular_places === routeID);

  // Auto-select first cafe on load
  useEffect(() => {
    if (attractionsInPlace.length > 0) {
      setIsCurrent(attractionsInPlace[0].id);
    }
  }, [attractionsInPlace, setIsCurrent]);

  // No cafes scenario
  if (isCurrent === null) {
    return <h1>{t("Нет кафе", "لا توجد مقاهي", "No cafes")}</h1>;
  }

  // Pagination utility
  const paginateArray = <T,>(arr: T[], pageSize: number): T[][] => {
    return arr.reduce(
      (result, _, index) =>
        index % pageSize
          ? result
          : [...result, arr.slice(index, index + pageSize)],
      [] as T[][]
    );
  };

  // Render individual cafe items
  const renderCafeItem = attractionsInPlace.map((el, i) => (
    <div onClick={() => setIsCurrent(el.id)} key={i} className={scss.item}>
      <Image
        src={errorImg || !el.main_image ? imgNone : el.main_image}
        alt={el.attraction_name}
        width={486}
        height={543}
        unoptimized
        style={{
          objectFit: "cover",
          backgroundColor: "#f0f0f0",
        }}
        onError={() => setErrorImg(true)}
      />
      <div className={scss.info}>
        <h6 className={scss.title}>{el.attraction_name}</h6>
        <div className={scss.stars_review}>
          <Stars rating={el.avg_rating} />
          <p>Reviews: {el.rating_count}</p>
        </div>
        <div className={scss.prices}>
          {`$${'$$$'} - $$'$$$'}, ${"Russian, Canadian"}`}
        </div>
      </div>
    </div>
  ));

  // Paginate cafe items
  const dividedArray = paginateArray(renderCafeItem, ITEMS_PER_PAGE);
  const isAllItemsShown = isLimit >= dividedArray.length;

  return (
    <div className={scss.attractions}>
      <div className={scss.attractions_title}>
        <h4>{t("Лучшие достопримечательности поблизости", "أفضل المعالم القريبة", "The best attractions nearby")}</h4>
        {attractions.length > ITEMS_PER_PAGE && !isAllItemsShown && (
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