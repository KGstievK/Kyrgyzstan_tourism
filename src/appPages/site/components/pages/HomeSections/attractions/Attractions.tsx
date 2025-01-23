"use client";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./Attractions.module.scss";
import imgRight from "@/assets/images/regions/Arrow_alt_lright.png";
import imgHeart from "@/assets/images/regions/Vector.png";
import imgNone from "@/assets/images/universalImage/none.png";
import Link from "next/link";
import Stars from "@/appPages/site/ui/stars/Stars";
import { useGetAttractionsQuery } from "@/redux/api/home";
import Image from "next/image";
import { useState } from "react";

const Attractions = () => {
  const { t } = useTranslate();
  const SLICES_DATA = 6;
  const { data, isLoading, isError } = useGetAttractionsQuery();
  const AttractionDataList = data?.slice(0, SLICES_DATA);

  const textSlice = (text: string) => text.slice(0, 266);
  const [error, setError] = useState(false);

  return (
    <>
      <section id={scss.Places}>
        <div className="container">
          <h2>{t("Популярные места", "أماكن مشهورة", "Popular places")}</h2>
          <div className={scss.list}>
            {AttractionDataList?.map((place) => (
              <div key={place.id} className={scss.item}>
                <Image
                  src={error || !place.main_image ? imgNone : place.main_image}
                  alt={place.attraction_name}
                  width={400}
                  height={300}
                  style={{
                    objectFit: "cover",
                    backgroundColor: "#f0f0f0",
                    width: '100%',
                    height: '300px'
                  }}
                  onError={() => setError(true)}
                />
                <div className={scss.block}>
                  <h6>{place.attraction_name}</h6>
                  <div>
                    <span className={scss.grade}>{place.avg_rating}</span>
                    <div className={scss.stars}>
                      <Stars rating={place.avg_rating} />
                    </div>
                    <span className={scss.review}>
                      {place.rating_count} {t("Отзывы", "مراجعات", "reviews")}
                    </span>
                  </div>
                  <p className={scss.descr}>{textSlice(place.description)}</p>
                </div>
                <Image 
                  className={scss.heart} 
                  src={imgHeart.src} 
                  alt="like"
                  width={24}
                  height={24}
                />
                <Link href={`/${place.region_category}/${place.id}`}>
                  <Image 
                    className={scss.right} 
                    src={imgRight.src} 
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Attractions;