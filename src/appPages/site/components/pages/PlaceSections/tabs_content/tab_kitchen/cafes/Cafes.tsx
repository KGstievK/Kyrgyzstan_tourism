import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./Cafes.module.scss";
import Stars from "@/appPages/site/ui/stars/Stars";
import { useGetKitchensQuery } from "@/redux/api/place";
import imgNone from "@/assets/images/universalImage/none.png";

interface CafeProps {
  isCurrent: number | null;
  setIsCurrent: (id: number | null) => void;
}

const ITEMS_PER_PAGE = 4;

const Cafes: FC<CafeProps> = ({ setIsCurrent, isCurrent }) => {
  const { t } = useTranslate();
  const [isLimit, setIsLimit] = useState<number>(1);
  const [errorImg, setErrorImg] = useState(false);
  const { data: cafes = [] } = useGetKitchensQuery();
  const pathName = usePathname();
  const routeID: number = Number(pathName.split("/")[2]);

  // Filter cafes for current place
  const cafesInPlace = cafes.filter((el) => el.popular_places === routeID);

  // Auto-select first cafe on load
  useEffect(() => {
    if (cafesInPlace.length > 0) {
      setIsCurrent(cafesInPlace[0].id);
    }
  }, [cafesInPlace, setIsCurrent]);

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
  const renderCafeItem = cafesInPlace.map((el, i) => (
    <div onClick={() => setIsCurrent(el.id)} key={i} className={scss.item}>
      <Image
        src={errorImg || !el.main_image ? imgNone : el.main_image}
        alt={el.kitchen_name}
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
  ));

  // Paginate cafe items
  const dividedArray = paginateArray(renderCafeItem, ITEMS_PER_PAGE);
  const isAllItemsShown = isLimit >= dividedArray.length;

  return (
    <div className={scss.cafes}>
      <div className={scss.cafes_title}>
        <h4>{t("", "", "The best restaurants with reasonable prices")}</h4>
        {cafes.length > ITEMS_PER_PAGE && !isAllItemsShown && (
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

export default Cafes;
