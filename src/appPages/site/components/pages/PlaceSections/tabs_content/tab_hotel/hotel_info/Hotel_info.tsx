import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "../Tab_hotel.module.scss";
import { useGetHotelIDQuery } from "@/redux/api/place";
import { FC } from "react";
import imgLike from "@/assets/images/placeImages/like.png";
import imgShare from "@/assets/images/placeImages/share.png";
import imgBed from "@/assets/images/placeImages/bed.png";
import imgContact from "@/assets/images/placeImages/contact.png";
import imgProper from "@/assets/images/placeImages/proper.png";

interface propsType {
  isCurrent: number | null;
}

const Hotel_info: FC<propsType> = ({ isCurrent }) => {
  const { t } = useTranslate();
  const { data, isError } = useGetHotelIDQuery(isCurrent);

  if (isError) {
    return null;
  }

  return (
    <div className={scss.hotel_item}>
      <h4>{t("", "", data?.name || "")}</h4>
      <div className={scss.imgs}>
        {data?.hotel_image.map((img, i) => (
          <img key={i} src={img} />
        ))}
      </div>
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
              <button>
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
            <p>
              {t(
                "",
                "",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              )}
            </p>
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
              <button>{t("", "", "Show All 10 Amenities")}</button>
            </div>
          </div>
          <div className={scss.safe}>
            <h6>{t("", "", "Safety and Hygiene")}</h6>
            <div className={scss.safe_list}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <img src={imgBed.src} alt="" />
                  <span>{t("", "", "Daily Cleaning")}</span>
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
            <button>{t("", "", "Reserve Now")}</button>
            <div className={scss.call}>
              <div>
                <img src={imgProper.src} alt="" />
                <span>{t("", "", "Property Inquiry")}</span>
              </div>
              <div>
                <img src={imgContact.src} alt="" />
                <span>{t("", "", "Contact Host")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel_info;
