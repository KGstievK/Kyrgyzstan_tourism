"use client";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./Places.module.scss";
import imgRight from "@/assets/images/regions/Arrow_alt_lright.png";
import imgHeart from "@//assets/images/regions/Vector.png";
import Link from "next/link";
import { useGetRegionListQuery } from "@/redux/api/regions";
import { usePathname } from "next/navigation";
import Stars from "@/appPages/site/ui/stars/Stars";
const Places = () => {
  const { t } = useTranslate();
  const { data, isLoading, isError } = useGetRegionListQuery();
  const pathName = usePathname();
  const routeName = pathName.split("/")[1];  
  const popularPlacesInRegion = data?.find((place) => place.region_category.trim().toLocaleLowerCase() === routeName.trim().toLocaleLowerCase());


  return (
    <>
      <section id={scss.Places}>
        <div className="container">
          <h2>{t("Популярные места", "أماكن مشهورة", "Popular places")}</h2>
          <div className={scss.list}>
            {popularPlacesInRegion?.popular_places?.map((place, i) => (
              <div key={i} className={scss.item}>
                <img src={place.popular_image} alt="popular place" />
                <div className={scss.block}>
                  <h6>{place.popular_name}</h6>
                  <div>
                    <span className={scss.grade}>{place.avg_rating}</span>
                    <div className={scss.stars}>
                      <Stars rating={place.avg_rating} />
                    </div>
                    <span className={scss.review}>
                      {place.rating_count} {t("Отзывы", "مراجعات", "reviews")}
                    </span>
                  </div>
                </div>
                <img className={scss.heart} src={imgHeart.src} alt="like" />
                <Link
                  href={`/${routeName}/${place.id}`}
                >
                  <img className={scss.right} src={imgRight.src} alt="" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Places;
