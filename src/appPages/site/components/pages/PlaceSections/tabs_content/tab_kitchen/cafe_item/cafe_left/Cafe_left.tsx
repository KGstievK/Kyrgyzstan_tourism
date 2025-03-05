import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "../Cafe_item.module.scss";
import Stars from "@/appPages/site/ui/stars/Stars";
import { FC } from "react";
import icon from "@/assets/images/placeImages/Icon.png";
import icon2 from "@/assets/images/placeImages/Icon2.png";
import icon4 from "@/assets/images/placeImages/Icon4.png";
import icon5 from "@/assets/images/placeImages/Icon5.png";
import { usePathname } from "next/navigation";
import { useGetKitchensQuery } from "@/redux/api/place";
interface Props {
  data: PLACE.kitchenIdResponse | null;
}

const Cafe_left: FC<Props> = ({ data }) => {
  const { t } = useTranslate();
  const { data: cafes = [] } = useGetKitchensQuery();

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
  const pathName = usePathname();
  const routeID: number = Number(pathName.split("/")[2]);

  // Filter cafes for current place
  const kitchens = cafes.filter((el) => el.popular_places === routeID);
  return (
    <div className={scss.left}>
      <h5>
        {t("Рейтинги и отзывы", "التقييمات والمراجعات", "Ratings and reviews")}
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
          № 1 <span>{t("", "", `of ${kitchens?.length} Restaurants in `)}</span>
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
  );
};

export default Cafe_left;
