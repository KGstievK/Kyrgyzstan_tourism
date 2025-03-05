import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./Hotel_info.module.scss";
import { useGetHotelIDQuery } from "@/redux/api/place";
import { FC } from "react";
import imgLike from "@/assets/images/placeImages/like.png";
import imgShare from "@/assets/images/placeImages/share.png";
import imgBed from "@/assets/images/placeImages/bed.png";
import safety from "@/assets/images/placeImages/safety.png";
import imgProper from "@/assets/images/placeImages/proper.png";
import GalleryImages from "@/appPages/site/ui/galleryImages/GalleryImages";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "@/appPages/site/ui/preLoader/Preloader";

interface propsType {
  isCurrent: number | null;
}

const Hotel_info: FC<propsType> = ({ isCurrent }) => {
  const { t } = useTranslate();
  const { data, isError, isLoading } = useGetHotelIDQuery(isCurrent);
  const images = data?.hotel_image ?? [];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Мой сайт",
          text: "Посмотрите этот сайт!",
          url: window.location.href,
        });
        toast.success("Ссылка успешно отправлена!");
      } catch (error) {
        toast.error("Ошибка при попытке поделиться.");
      }
    } else {
      toast.info('Ваш браузер не поддерживает функцию "Поделиться".');
    }
  };

  if (isLoading) {
    return (
      <>
        <Preloader />
      </>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <div className={scss.hotel_item}>
      <h4>{t("", "", data?.name || "")}</h4>
      <GalleryImages images={images} />

      <div className={scss.info}>
        <div className={scss.left}>
          <div className={scss.titles}>
            <div className={scss.title}>
              <h5>{t("", "", "Well Furnished Apartment")} </h5>
              <p>{data?.address}</p>
            </div>
            <div className={scss.links}>
              <button>
                <img src={imgLike.src} alt="" />
              </button>
              <button onClick={handleShare}>
                <img src={imgShare.src} alt="" />
              </button>
            </div>
          </div>
          <div className={scss.list}>
            <div>
              <img src={imgBed.src} alt="" />
              <span>{data?.bedroom} Bedrooms</span>
            </div>
            <div>
              <img src={imgBed.src} alt="" />
              <span>{data?.bathroom} Bathrooms</span>
            </div>
            <div>
              <img src={imgBed.src} alt="" />
              <span>
                {data?.cars}cars/{data?.bikes}bikes
              </span>
            </div>
            <div>
              <img src={imgBed.src} alt="" />
              <span>{data?.pets} Pets Allowed</span>
            </div>
          </div>
          <div className={scss.descr}>
            <h6>{t("", "", "Apartment Description")}</h6>
            <p>{data?.description}</p>
          </div>
          <div className={scss.amen}>
            <h6>{t("", "", "Offered Amenities")}</h6>
            <div className={scss.amenities}>
              {data?.amenities.map((item, index) => (
                <div key={index}>
                  <img src={imgBed.src} alt="" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button>{t("", "", "Show All 10 Amenities")}</button>
          </div>
          <div className={scss.safe}>
            <h6>{t("", "", "Safety and Hygiene")}</h6>
            <div className={scss.safe_list}>
              {data?.safety_and_hygiene.map((item, index) => (
                <div key={index}>
                  <img src={safety.src} alt="safety" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <div className={scss.right}>
            <div className={scss.price}>
              $ {data?.price_short_period} - $ {data?.price_long_period}
            </div>
            <ul>
              <li>
                {t("", "", "Short Period: $ ")} {data?.price_short_period}
              </li>
              <li>
                {t("", "", "Medium Period: $ ")}
                {data?.price_medium_period}
              </li>
              <li>
                {t("", "", "Long Period: $ ")}
                {data?.price_long_period}
              </li>
            </ul>
            <button>{t("", "", "Call Now")}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel_info;
