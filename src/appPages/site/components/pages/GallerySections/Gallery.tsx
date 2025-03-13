"use client";
import { Suspense, FC } from "react";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./Gallery.module.scss";
import imgHeart from "@/assets/images/regions/Vector.png";
import imgMetka from "@/assets/images/galleryImages/metka.png";
import { useGetPopularPlacesQuery } from "@/redux/api/regions";
import Stars from "@/appPages/site/ui/stars/Stars";

// Определение интерфейсов
// Обновленный интерфейс в соответствии с тем, что возвращает API
interface PopularResponse {
  id: number;
  popular_name: string;
  popular_image: string;
  avg_rating: number;
  rating_count: number;
  region: string;
  address?: string; // Делаем address опциональным
}

// Тип ошибки RTK Query
interface RTKQueryError {
  status?: number;
  data?: {
    message?: string;
  };
  error?: string;
}

// Интерфейс для пропсов компонента ErrorDisplay
interface ErrorDisplayProps {
  message?: string;
  onRetry: () => void;
}

// Интерфейс для пропсов компонента GalleryCards
// Обновляем тип данных, чтобы соответствовал API
interface GalleryCardsProps {
  data: PopularResponse[] | undefined | null;
}

// Компонент для отображения состояния загрузки
const LoadingSkeleton: FC = () => {
  return (
    <div className={scss.loadingContainer}>
      <div className={scss.skeletonGrid}>
        {[...Array(8)].map((_, index) => (
          <div key={index} className={scss.skeletonItem}>
            <div className={scss.skeletonImage}></div>
            <div className={scss.skeletonContent}>
              <div className={scss.skeletonTitle}></div>
              <div className={scss.skeletonRating}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Компонент для отображения ошибки
const ErrorDisplay: FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  const { t } = useTranslate();

  return (
    <div className={scss.errorContainer}>
      <div className={scss.errorContent}>
        <h3>
          {t("Что-то пошло не так", "حدث خطأ ما", "Something went wrong")}
        </h3>
        <p>
          {message ||
            t(
              "Не удалось загрузить данные",
              "فشل في تحميل البيانات",
              "Failed to load data"
            )}
        </p>
        <button onClick={onRetry} className={scss.retryButton}>
          {t("Попробовать снова", "حاول مرة أخرى", "Try again")}
        </button>
      </div>
    </div>
  );
};

// Компонент с карточками мест
const GalleryCards: FC<GalleryCardsProps> = ({ data }) => {
  const { t } = useTranslate();

  if (!data || !data.length) {
    return (
      <div className={scss.emptyState}>
        {t("Данные отсутствуют", "لا توجد بيانات", "No data available")}
      </div>
    );
  }

  return (
    <div className={scss.list}>
      {data.map((el, i) => (
        <div key={i} className={scss.item}>
          <img
            src={el.popular_image}
            alt="popular place"
            loading="lazy" // Нативная ленивая загрузка для изображений
          />
          <div className={scss.block}>
            <h6>{el.popular_name}</h6>
            <div>
              <span className={scss.grade}>{el.avg_rating}</span>
              <Stars rating={el.avg_rating} width={9} height={9} />
              <span className={scss.review}>
                {el.rating_count} {t("Отзывы", "مراجعات", "reviews")}
              </span>
            </div>
            <span className={scss.metka}>
              <img src={imgMetka.src} alt="" loading="lazy" />
              {el.address ? (
                <span>{el.address}</span>
              ) : (
                <span>
                  {t(
                    "Адрес не указан",
                    "العنوان غير محدد",
                    "Address not specified"
                  )}
                </span>
              )}
            </span>
          </div>
          <img
            className={scss.heart}
            src={imgHeart.src}
            alt=""
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

// Основной компонент
const Gallery: FC = () => {
  const { t } = useTranslate();

  // Указываем правильный тип данных для хука
  const { data, error, isLoading, refetch } =
    useGetPopularPlacesQuery(undefined);

  // Функция для извлечения сообщения об ошибке
  const getErrorMessage = (): string | undefined => {
    if (!error) return undefined;

    const queryError = error as RTKQueryError;

    if (
      queryError.data &&
      typeof queryError.data === "object" &&
      queryError.data.message
    ) {
      return queryError.data.message;
    }

    if (queryError.error) {
      return queryError.error;
    }

    return undefined;
  };

  return (
    <section id={scss.Gallery}>
      <div className="container">
        {/* Отображаем разные компоненты в зависимости от состояния загрузки */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorDisplay message={getErrorMessage()} onRetry={refetch} />
        ) : (
          // Используем Suspense для ленивой загрузки компонента с карточками
          <Suspense fallback={<LoadingSkeleton />}>
            <GalleryCards data={data} />
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default Gallery;