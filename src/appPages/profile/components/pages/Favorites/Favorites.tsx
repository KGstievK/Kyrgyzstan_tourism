"use client"
import { FC } from "react";
import Image from "next/image";
import scss from "./Favorites.module.scss";
import { CiSearch } from "react-icons/ci";
import { MdArrowOutward } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { IoEllipseSharp, IoEllipseOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import images from "../../../../../assets/images/Favorites/user.png";
import { useGetFavoriteItemsQuery } from "@/redux/api/auth";

const Favorites: FC = () => {
  const { data: favoriteItems, isLoading, error } = useGetFavoriteItemsQuery();

  const renderFavoriteItem = (item: any) => {
    let name = "";
    let image = "";
    let address = "";
    let avgRating = 0;
    let ratingCount = 0;

    if (item.attractions) {
      name = item.attractions.attraction_name;
      image = item.attractions.main_image;
      address = item.attractions.region_category;
      avgRating = item.attractions.avg_rating;
      ratingCount = item.attractions.rating_count;
    } else if (item.popular_region) {
      name = item.popular_region.popular_name;
      image = item.popular_region.popular_image;
      address = item.popular_region.region;
      avgRating = item.popular_region.avg_rating;
      ratingCount = item.popular_region.rating_count;
    } else if (item.gallery) {
      name = item.gallery.gallery_name;
      image = item.gallery.gallery_image;
      address = item.gallery.address;
      avgRating = item.gallery.avg_rating;
      ratingCount = item.gallery.rating_count;
    } else if (item.hotels) {
      name = item.hotels.name;
      image = item.hotels.main_image;
      address = item.hotels.region;
      avgRating = item.hotels.avg_rating;
      ratingCount = item.hotels.rating_count;
    }

    const renderStars = (rating: number) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          i <= Math.round(rating) ? (
            <IoEllipseSharp key={i} />
          ) : (
            <IoEllipseOutline key={i} />
          )
        );
      }
      return stars;
    };

    return (
      <div className={scss.Favorite_images_block_1} key={item.id}>
        <div className={scss.images_likes}>
          <FcLike className={scss.like} />
        </div>
        <Image src={image} alt={name} width={300} height={200} className={scss.regions_images} />
        <div className={scss.info}>
          <h3>{name}</h3>
          <div className={scss.reyting}>
            <p>{avgRating}/5</p>
            {renderStars(avgRating)}
            <span>{ratingCount} reviews</span>
          </div>
          <div className={scss.address}>
            <FaLocationDot /> <p>{address}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={scss.Favorites}>
      <div className={scss.content}>
        <div className={scss.Users_input}>
          <div className={scss.inputs}>
            <div className={scss.input_search}>
              <input type="text" />
              <CiSearch className={scss.search} />
            </div>
            <MdArrowOutward className={scss.arrow} />
          </div>
          <div className={scss.user}>
            <div className={scss.user_text}>
              <h3>Charles Deo</h3>
              <h4>Moscow, Rossia</h4>
            </div>
            <Image src={images} alt="img" width={42} height={42} />
          </div>
        </div>
        <div className={scss.favorite_content}>
          <div className={scss.text}>
            <h1>Favorites</h1>
          </div>
          <div className={scss.Favorite_images}>
            {isLoading ? (
              <div>Загрузка...</div>
            ) : error ? (
              <div>Ошибка загрузки избранного</div>
            ) : !favoriteItems || favoriteItems.length === 0 ? (
              <div>Избранных элементов нет</div>
            ) : (
              favoriteItems.map((item) => renderFavoriteItem(item))
            )}
          </div>
        </div>
      </div>
    </section>
  );

};

export default Favorites;