import { FC, useState } from "react";
import styles from "./AttractionInfo.module.scss";
import { useGetAttractionIDQuery } from "@/redux/api/place";
import { useGetAttractionsQuery } from "@/redux/api/home";
import { ImageOff, Loader, MapPin } from "lucide-react";
import useTranslate from "@/appPages/site/hooks/translate/translate";

interface AttractionInfoProps {
  isCurrent: number | null;
}

const AttractionInfo: FC<AttractionInfoProps> = ({ isCurrent }) => {
  const { t } = useTranslate();
  const { data, isLoading, isError } = useGetAttractionIDQuery(isCurrent, {
    skip: isCurrent === null, // Пропускаем запрос, если isCurrent null
  });
  const { data: list } = useGetAttractionsQuery();
  const [mainImage, setMainImage] = useState(0);
  const [imgErrors, setImgErrors] = useState<{ [key: number]: boolean }>({});
  const [mainImgError, setMainImgError] = useState(false);

  // Обработка ошибок загрузки изображений
  const handleThumbnailError = (index: number) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  const handleMainImageError = () => {
    setMainImgError(true);
  };

  // Компонент загрузки
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader size={48} className={styles.loadingSpinner} />
        <p>{t("Загрузка...", "جار التحميل...", "Loading...")}</p>
      </div>
    );
  }

  // Компонент ошибки
  if (isError || !data) {
    return (
      <div className={styles.errorContainer}>
        <ImageOff size={48} />
        <p>
          {t(
            "Информация о достопримечательности недоступна",
            "معلومات عن المعلم غير متوفرة",
            "Attraction information is not available"
          )}
        </p>
      </div>
    );
  }

  // Проверка наличия изображений
  const hasNoImages = !data.image || data.image.length === 0;

  return (
    <>
      <h1 className={styles.title}>{data.attraction_name}</h1>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          {/* Главное изображение */}
          {hasNoImages || mainImgError ? (
            <div className={styles.noImagePlaceholder}>
              <ImageOff size={64} />
              <p>
                {t(
                  "Изображение недоступно",
                  "الصورة غير متوفرة",
                  "Image unavailable"
                )}
              </p>
            </div>
          ) : (
            <img
              src={data.image[mainImage].image}
              alt={data.attraction_name}
              className={styles.mainImage}
              onError={handleMainImageError}
            />
          )}

          {/* Галерея миниатюр */}
          {!hasNoImages && (
            <div className={styles.gallery}>
              {data.image.map((img, index) => (
                <div key={img.id} className={styles.thumbnailContainer}>
                  {imgErrors[index] ? (
                    <div className={styles.thumbnailPlaceholder}>
                      <ImageOff size={16} />
                    </div>
                  ) : (
                    <img
                      src={img.image}
                      alt={`${data.attraction_name} ${index + 1}`}
                      className={`${styles.thumbnail} ${
                        mainImage === index ? styles.activeThumbnail : ""
                      }`}
                      onClick={() => setMainImage(index)}
                      onError={() => handleThumbnailError(index)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.textContainer}>
          <p className={styles.description}>{data.description}</p>
          <ul className={styles.list}>
            <li>
              {data.type_attraction}
            </li>
            <li>
              {t("Топ", "أعلى", "Top")} {data.rank}{" "}
              {t(
                "из 20 развлечений в",
                "من 20 وسيلة ترفيهية في",
                "of 20 entertainment in"
              )}{" "}
              {"Cholpon-Ata"}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AttractionInfo;