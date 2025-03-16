import eventImg from "@/assets/images/placeImages/eventicon.png";
import scss from "./Event_list.module.scss";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import { FC, useState } from "react";
import React from "react";
import { Ticket, ImageOff, Calendar, Loader } from "lucide-react";
import Image from "next/image";
import { PLACE } from "@/redux/api/place/types";

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
  error?: unknown;
}

// Константа с категориями, которая будет использоваться для маппинга
const CATEGORIES = [
  { ru: "Концерт", ar: "حفلة موسيقية", en: "Concert" },
  { ru: "Кино", ar: "سينما", en: "Cinema" },
  { ru: "Досуг", ar: "الترفيه", en: "Leisure" },
  { ru: "Выставки", ar: "المعارض", en: "Exhibitions" },
  { ru: "Театр", ar: "مسرح", en: "Theater" },
  { ru: "Мастер классы", ar: "دروس تعليمية", en: "Master classes" },
  { ru: "Туризм", ar: "السياحة", en: "Tourism" },
];

const Event_list: FC<Props> = ({
  data,
  setCategory,
  setTicket,
  ticket,
  setIsDate,
  isLoading,
  error
}) => {
  const { t } = useTranslate();
  const [isDropDown, setIsDropDown] = useState(false);
  const [imgErrors, setImgErrors] = useState<{[key: number]: boolean}>({});
  
  // Отслеживаем выбранную категорию на английском для API
  const [selectedCategoryEn, setSelectedCategoryEn] = useState<string>("");

  const handleImageError = (index: number) => {
    setImgErrors(prev => ({...prev, [index]: true}));
  };

  // Функция для установки категории
  // Всегда сохраняет английское название категории для API, но отображает на текущем языке
  const handleCategorySelect = (categoryObject: typeof CATEGORIES[0]) => {
    // Если категория уже выбрана, сбрасываем её
    if (selectedCategoryEn === categoryObject.en) {
      setSelectedCategoryEn("");
      setCategory(""); // Сбрасываем категорию в API
    } else {
      setSelectedCategoryEn(categoryObject.en);
      setCategory(categoryObject.en); // Отправляем английское название в API
    }
  };
  
  // Функция для проверки, выбрана ли категория
  const isCategorySelected = (categoryObject: typeof CATEGORIES[0]) => {
    return selectedCategoryEn === categoryObject.en;
  };

  // Функция сброса всех фильтров
  const resetFilters = () => {
    setSelectedCategoryEn("");
    setCategory("");
    setTicket("");
    setIsDate("");
  };

  // Error scenario
  if (error) {
    return (
      <>
        <div className={scss.filter}>
          <div
            onClick={resetFilters}
            style={
              selectedCategoryEn === "" && ticket === ""
                ? { background: "#004A60", color: "white" }
                : {}
            }
            className={scss.item}
          >
            {t("Все", "الكل", "All")}
          </div>
          {/* Остальные фильтры */}
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
          <div
            onClick={resetFilters}
            style={
              selectedCategoryEn === "" && ticket === ""
                ? { background: "#004A60", color: "white" }
                : {}
            }
            className={scss.item}
          >
            {t("Все", "الكل", "All")}
          </div>
          {/* Остальные фильтры */}
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
          onClick={resetFilters}
          style={
            selectedCategoryEn === "" && ticket === ""
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
            {CATEGORIES.map((item, index) => (
              <span
                key={index}
                className={scss.dropDownItem}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCategorySelect(item);
                }}
                style={
                  isCategorySelected(item)
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
            ticket === "true" ? { background: "#004A60", color: "white" } : {}
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
                  <Image 
                    src={el.image} 
                    alt={el.title || ""} 
                    width={400}
                    height={300}
                    style={{ objectFit: "cover" }}
                    onError={() => handleImageError(i)} 
                  />
                )}
                <div className={scss.eventTabs}>
                  <div className="">
                    <Image 
                      src={eventImg.src} 
                      alt="Event icon" 
                      width={24}
                      height={24}
                    />
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