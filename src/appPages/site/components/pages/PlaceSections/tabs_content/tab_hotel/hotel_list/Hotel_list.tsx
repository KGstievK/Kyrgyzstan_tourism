import { FC, useEffect, useState } from "react";
import Stars from "@/appPages/site/ui/stars/Stars";
import { useGetHotelsQuery } from "@/redux/api/place";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import imgHeart from "@/assets/images/placeImages/Vector.png";
import imgRight from "@/assets/images/placeImages/Arrow_alt_lright.png";
import scss from "./Hotel_list.module.scss";
import { usePathname } from "next/navigation";
import Image from "next/image";
import imgNone from "@/assets/images/universalImage/none.png";

interface HotelListProps {
  setIsCurrent: (id: number) => void;
  isCurrent: number | null;
}

interface Hotel {
  id: number;
  name: string;
  main_image: string;
  average_rating: number;
  rating_count: number;
}

const ITEMS_PER_PAGE = 6;

const HotelList: FC<HotelListProps> = ({ setIsCurrent, isCurrent }) => {
  const { t } = useTranslate();
  const [isLimit, setIsLimit] = useState<number>(1);
  const { data: hotels = [] } = useGetHotelsQuery();
  const placeID = usePathname().split("/")[2];
  const [errorImg, setErrorImg] = useState(false);

  const hotelsInPlace = hotels.filter(
    (el) => el.popular_places === Number(placeID)
  );

  useEffect(() => {
    if (hotelsInPlace.length > 0 && isCurrent === null) {
      setIsCurrent(hotelsInPlace[0].id);
    }
  }, [hotelsInPlace, isCurrent, setIsCurrent]);

  if (isCurrent === null) {
    return <h1>{t("Нет отелей", "لا توجد فنادق", "No hotels")}</h1>;
  }

  const renderHotelItem = (hotel: Hotel) => (
    <div key={hotel.id} className={scss.item}>
      <Image
        src={errorImg || !hotel.main_image ? imgNone : hotel.main_image}
        alt={hotel.name}
        width={341}
        height={270}
        unoptimized
        style={{
          objectFit: "cover",
          backgroundColor: "#f0f0f0",
        }}
        onError={() => setErrorImg(true)}
      />{" "}
      <div className={scss.block}>
        <h6>{hotel.name}</h6>
        <div>
          <Stars rating={hotel.average_rating} width={21} height={21}/>
          <span className={scss.review}>
            {hotel.rating_count} {t("отзывов", "تقييمات", "reviews")}
          </span>
        </div>
      </div>
      <img className={scss.heart} src={imgHeart.src} alt="favorite" />
      <button onClick={() => setIsCurrent(hotel.id)}>
        <img className={scss.right} src={imgRight.src} alt="select" />
      </button>
    </div>
  );

  const hotelGroups = hotelsInPlace.reduce<Hotel[][]>((acc, hotel, index) => {
    const groupIndex = Math.floor(index / ITEMS_PER_PAGE);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(hotel);
    return acc;
  }, []);
  const isAllItemsShown = isLimit >= hotelGroups.length;

  return (
    <>
      <div className={scss.head}>
        <h4>
          {t(
            "Лучшие достопримечательности поблизости",
            "أفضل المعالم السياحية القريبة",
            "The best attractions nearby"
          )}
        </h4>
        {hotels.length > ITEMS_PER_PAGE && !isAllItemsShown && (
          <p onClick={() => setIsLimit(hotelGroups.length)}>
            {t("Показать все", "عرض الكل", "Show all")}
          </p>
        )}
      </div>
      {hotelGroups.slice(0, isLimit).map((group, groupIndex) => (
        <div key={groupIndex} className={scss.list}>
          {group.map(renderHotelItem)}
        </div>
      ))}
    </>
  );
};

export default HotelList;
