import scss from "./Cafe_item.module.scss";
import icon from "@/assets/images/placeImages/Icon.png";
import icon2 from "@/assets/images/placeImages/Icon2.png";
import icon4 from "@/assets/images/placeImages/Icon4.png";
import icon5 from "@/assets/images/placeImages/Icon5.png";
import { FC, } from "react";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import { useGetKitchenIDQuery } from "@/redux/api/place";
import Stars from "@/appPages/site/ui/stars/Stars";
import GalleryImages from "@/appPages/site/ui/galleryImages/GalleryImages";
interface iImage {
  id: number;
  image: string;
}
interface propsType {
  kitchens: PLACE.KitchenResponse | undefined;
  isCurrent: number | null;
}
const Cafe_item: FC<propsType> = ({ kitchens, isCurrent }) => {
  const { t } = useTranslate();
  const { data, isLoading, isError } = useGetKitchenIDQuery(isCurrent);

  const dataStars = [
    {
      icon: icon.src,
      label: "Nutrition",
      rating: data?.nutrition_rating,
    },
    {
      icon: icon2.src,
      label: "Service",
      rating: data?.service_rating,
    },
    {
      icon: icon4.src,
      label: "Price quality",
      rating: data?.price_rating,
    },
    {
      icon: icon5.src,
      label: "Atmosphere",
      rating: data?.atmosphere_rating,
    },
  ];


  const images = data?.kitchen_image ?? [];



  if (isError) {
    return null;
  }


  return (
    <div className={scss.cafe_item}>

      <h4>{data?.kitchen_name}</h4>
      <GalleryImages images={images} />
      <div className={scss.info}>
        <div>
          <div className={scss.left}>
            <h5>
              {t(
                "Рейтинги и отзывы",
                "التقييمات والمراجعات",
                "Ratings and reviews"
              )}
            </h5>

            <div className={scss.stars_review}>
              <div className={scss.grades}>{data?.average_rating ?? 0}</div>
              <div className={scss.stars}>
                {<Stars rating={data?.average_rating ?? 0} width={16} height={16} />}
                
              </div>
              <p>
                {data?.rating_count ?? 0} {t("отзывы", "مراجعات", "reviews")}
              </p>
            </div>

            <div className={scss.assess}>
              <p>
                № 1{" "}
                <span>
                  {t("", "", `of ${kitchens?.length} Restaurants in `)}
                </span>
              </p>
              <p> {t("", "", "ASSESSMENTS")}</p>
            </div>

            <ul>
              {dataStars.map((item, index) => (
                <li key={index}>
                  <div>
                    <img src={item.icon} alt="" />
                    <span>{t("", "", item.label)}</span>
                  </div>
                  <div>
                    <Stars rating={item.rating} width={12} height={12} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div className={scss.middle}>
            <h5>{t("Более подробно", "أكثر تفصيلاً", "More detailed")}</h5>
            <div>
              <p className={scss.title}>
                {t(" Диапазон цен", "نطاق السعر", "PRICE RANGE")}
              </p>
              <p
                className={scss.descr}
              >{`$${data?.price} - $${data?.price}`}</p>
            </div>
            <div>
              <p className={scss.title}>
                {t(
                  "Специализированное меню",
                  "قائمة متخصصة",
                  "Specialized menu"
                )}
              </p>
              <p className={scss.descr}>{data?.specialized_menu}</p>
            </div>
            <div>
              <p className={scss.title}>
                {t("Время приема пищи", "وقت الوجبة", "Meal time")}
              </p>
              <p className={scss.descr}>
                {data?.meal_time.map((item) => item + ", ")}
              </p>
            </div>
            <div>
              <p className={scss.title}>
                {t(
                  "Показать всю информацию",
                  "عرض جميع المعلومات",
                  "Show all information"
                )}
              </p>
              <p className={scss.descr}>{t("", "", "services, description")}</p>
            </div>
          </div>
        </div>
        <div>
          <div className={scss.right}>
            <h5>
              {t(
                "Местоположение и контактные данные",
                "تفاصيل الموقع ووسائل الاتصال",
                "Location and contact details"
              )}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cafe_item;
