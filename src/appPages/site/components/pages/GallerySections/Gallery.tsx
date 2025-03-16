"use client";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./Gallery.module.scss";
import imgMetka from "@/assets/images/galleryImages/metka.png";
import { useGetGalleryQuery } from "@/redux/api/gallery";
import Stars from "@/appPages/site/ui/stars/Stars";
import {
  useGetFavoriteQuery,
  useGetPopularPlacesQuery,
} from "@/redux/api/regions";
import LikePost from "../regionSections/places/LikePost";

const Gallery = () => {
  const { t } = useTranslate();
  const { data: popular } = useGetPopularPlacesQuery();

  return (
    <section id={scss.Gallery}>
      <div className="container">
        <div className={scss.list}>
          {popular?.map((el, i) => (
            <div key={i} className={scss.item}>
              <img src={el.popular_image} alt="popular place" />
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
                  <img src={imgMetka.src} alt="" />
                  <span>{el.region}</span>
                </span>
              </div>
              <LikePost postId={el.id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
