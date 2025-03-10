import eventImg from "@/assets/images/placeImages/eventicon.png";
import scss from "./Event_list.module.scss";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import { FC, useState } from "react";
import React from "react";
import { useGetEventListQuery } from "@/redux/api/place";

interface Props {
  data: PLACE.EventListResponse | null;
  category: string;
  search: string;
  date: string;
  setCategory: (category: string) => void;
}

const Event_list: FC<Props> = ({ data, setCategory }) => {
  const { t } = useTranslate();
  const [isDropDown, setIsDropDown] = useState(false);

  const filterList = [
    { ru: "Концерт", ar: "حفلة موسيقية", en: "Concert" },
    { ru: "Кино", ar: "سينما", en: "Cinema" },
    { ru: "Досуг", ar: "الترفيه", en: "Leisure" },
    { ru: "Выставки", ar: "المعارض", en: "Exhibitions" },
    { ru: "Театр", ar: "مسرح", en: "Theater" },
    { ru: "Мастер классы", ar: "دروس تعليمية", en: "Master classes" },
    { ru: "Туризм", ar: "السياحة", en: "Tourism" },
  ];

  return (
    <>
      <div className={scss.filter}>
        <div onClick={() => setCategory("")} className={scss.item}>
          {t("Все", "الكل", "All")}
        </div>

        <div className={scss.item} onClick={() => setIsDropDown(!isDropDown)}>
          {t("Категории", "فئات", "Categories")}
          <span
            style={{
              display: "inline-block",
              transform: `rotate(${isDropDown ? 270 : 90}deg)`,
              transition: "transform 0.3s",
            }}
          >
            ›
          </span>

          <div
            className={scss.dropDown}
            style={
              isDropDown ? undefined : { opacity: 0, pointerEvents: "none" }
            }
          >
            <svg
              className={scss.close}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropDown(false);
              }}
            >
              <path
                d="M18 6L6 18"
                stroke="#333333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#333333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {filterList.map((item, index) => (
              <span
                key={index}
                className={scss.dropDownItem}
                onClick={() => setCategory(t(item.ru, item.ar, item.en))}
              >
                {t(item.ru, item.ar, item.en)}
              </span>
            ))}
          </div>
        </div>
        <div className={scss.item}>
          {t("Только билеты", "تذاكر فقط", "Only tickets")}
        </div>
      </div>
      <div className={scss.list}>
        {data ? (
          data?.map((el, i) => (
            <div key={i} className={scss.item}>
              <div className={scss.img}>
                <img src={el.image} alt="" />
                <div className={scss.eventTabs}>
                  <div className="">
                    <img src={eventImg.src} alt="" />
                  </div>
                  <div key={el.category.id} className="">
                    {el.category.category}
                  </div>
                  <div className="">
                    <img src={eventImg.src} alt="" />
                  </div>
                </div>
              </div>
              <div className={scss.info}>
                <h6>{el.title}</h6>
                <p>
                  {el.date}
                  {el.time}
                </p>
                <p>{el.address}</p>
              </div>
            </div>
          ))
        ) : (
          <h3>null</h3>
        )}
      </div>
    </>
  );
};

export default Event_list;
