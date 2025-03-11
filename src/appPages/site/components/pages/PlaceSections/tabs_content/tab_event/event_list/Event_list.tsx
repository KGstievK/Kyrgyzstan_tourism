import eventImg from "@/assets/images/placeImages/eventicon.png";
import scss from "./Event_list.module.scss";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import { FC, useState } from "react";
import React from "react";
import { useGetEventListQuery } from "@/redux/api/place";
import { Ticket, ImageOff, Calendar, Loader } from "lucide-react";

interface Props {
  data: PLACE.EventListResponse | null;
  category: string;
  search: string;
  date: string;
  setCategory: (category: string) => void;
  setTicket: (ticket: string) => void;
  setIsDate: (date: string) => void;
  ticket: string;
  isLoading?: boolean;
  error?: any;
}

const Event_list: FC<Props> = ({
  data,
  setCategory,
  setTicket,
  ticket,
  category,
  setIsDate,
  isLoading,
  error
}) => {
  const { t } = useTranslate();
  const [isDropDown, setIsDropDown] = useState(false);
  const [imgErrors, setImgErrors] = useState<{[key: number]: boolean}>({});

  const handleImageError = (index: number) => {
    setImgErrors(prev => ({...prev, [index]: true}));
  };

  const filterList = [
    { ru: "Концерт", ar: "حفلة موسيقية", en: "Concert" },
    { ru: "Кино", ar: "سينما", en: "Cinema" },
    { ru: "Досуг", ar: "الترفيه", en: "Leisure" },
    { ru: "Выставки", ar: "المعارض", en: "Exhibitions" },
    { ru: "Театр", ar: "مسرح", en: "Theater" },
    { ru: "Мастер классы", ar: "دروس تعليمية", en: "Master classes" },
    { ru: "Туризм", ar: "السياحة", en: "Tourism" },
  ];

  // Error scenario
  if (error) {
    return (
      <>
        <div className={scss.filter}>
          {/* Filter components remain unchanged */}
          <div
            onClick={() => {
              setCategory("");
              setTicket("");
              setIsDate("");
            }}
            style={
              category == "" && ticket == ""
                ? { background: "#004A60", color: "white" }
                : {}
            }
            className={scss.item}
          >
            {t("Все", "الكل", "All")}
          </div>
          {/* Other filter options */}
        </div>
        <div className={scss.noEventsContainer}>
          <ImageOff size={48} />
          <p>{t("Ошибка загрузки данных", "خطأ في تحميل البيانات", "Error loading data")}</p>
        </div>
      </>
    );
  }

  // Loading scenario
  if (isLoading) {
    return (
      <>
        <div className={scss.filter}>
          {/* Filter components remain unchanged */}
          <div
            onClick={() => {
              setCategory("");
              setTicket("");
              setIsDate("");
            }}
            style={
              category == "" && ticket == ""
                ? { background: "#004A60", color: "white" }
                : {}
            }
            className={scss.item}
          >
            {t("Все", "الكل", "All")}
          </div>
          {/* Other filter options */}
        </div>
        <div className={scss.noEventsContainer}>
          <Loader size={48} className={scss.loadingSpinner}/>
          <p>{t("Загрузка...", "جار التحميل...", "Loading...")}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={scss.filter}>
        <div
          onClick={() => {
            setCategory("");
            setTicket("");
            setIsDate("");
          }}
          style={
            category == "" && ticket == ""
              ? { background: "#004A60", color: "white" }
              : {}
          }
          className={scss.item}
        >
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
                onClick={() =>
                  setCategory(
                    category === item.ru ||
                      category === item.en ||
                      category === item.ar
                      ? ""
                      : t(item.ru, item.ar, item.en)
                  )
                }
                style={
                  category === item.ru ||
                  category === item.en ||
                  category === item.ar
                    ? { background: "#004A60", color: "white" }
                    : {}
                }
              >
                {t(item.ru, item.ar, item.en)}
              </span>
            ))}
          </div>
        </div>
        <div
          style={
            ticket == "true" ? { background: "#004A60", color: "white" } : {}
          }
          onClick={() => setTicket(ticket !== "" ? "" : "true")}
          className={scss.item}
        >
          {t("Только билеты", "تذاكر فقط", "Only tickets")}
        </div>
      </div>
      
      {/* Empty data scenario */}
      {(!data || data.length === 0) ? (
        <div className={scss.noEventsContainer}>
          <Calendar size={48} />
          <p>{t("Нет доступных мероприятий", "لا توجد فعاليات متاحة", "No events available")}</p>
        </div>
      ) : (
        <div className={scss.list}>
          {data.map((el, i) => (
            <div key={i} className={scss.item}>
              <div className={scss.img}>
                {imgErrors[i] ? (
                  <div className={scss.imgNotFound}>
                    <ImageOff size={32} />
                    <p>{t("Изображение не найдено", "الصورة غير موجودة", "Image not found")}</p>
                  </div>
                ) : (
                  <img 
                    src={el.image} 
                    alt={el.title || ""} 
                    onError={() => handleImageError(i)} 
                  />
                )}
                <div className={scss.eventTabs}>
                  <div className="">
                    <img src={eventImg.src} alt="" />
                  </div>
                  {el.ticket && (
                    <div>
                      <Ticket />
                      {t("билеты","تذاكر ","Tickets")}
                    </div>
                  )}
                  <div key={el.category.id} className="">
                    {el.category.category}
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
          ))}
        </div>
      )}
    </>
  );
};

export default Event_list;