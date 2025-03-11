import { FC } from "react";
import scss from "../Cafe_item.module.scss";
import MapWithMarker from "./MapWithMarker";
import { Laptop2, Mail, MapPin, PhoneIcon, Pointer } from "lucide-react";
import { FaMarkdown } from "react-icons/fa";
import useTranslate from "@/appPages/site/hooks/translate/translate";

interface Cafe_rightProps {
  cafeLocation?: PLACE.KitchenLocationResponse[]; // Опциональный параметр
}

const Cafe_right: FC<Cafe_rightProps> = ({ cafeLocation }) => {
  if (!cafeLocation) {
    return <div>Loading location data...</div>; // Fallback UI
  }
  const { t } = useTranslate();
  return (
    <div className={scss.right}>
      <h5>
        {t(
          "Местоположение и контактные данные",
          "الموقع وتفاصيل الاتصال",
          "Location and contact details"
        )}
      </h5>
      <div className={scss.mapContainer}>
        <MapWithMarker
          latitude={cafeLocation[0].latitude || 0}
          longitude={cafeLocation[0].longitude || 0}
          //  latitude={42.8746}
          //  longitude={74.5698}
        />
      </div>
      <div className={scss.contactInfo}>
        <p>
          <span>
            <MapPin color="white" style={{ fill: "black" }} />
          </span>{" "}
          {cafeLocation[0].address}
        </p>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <a
            href={cafeLocation[0].Website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <Laptop2 />
            </span>{" "}
            {t("Веб-сайт", "موقع إلكتروني", "Website")} ↗
          </a>
          <a href={`mailto:${cafeLocation[0].email}`}>
            <span>
              <Mail />
            </span>{" "}
            {t("Электронная почта", "البريد الإلكتروني", "Email")} ↗ 
          </a>
        </div>
        <p>
          <span>
            <PhoneIcon fontSize={8} />
          </span>{" "}
          {cafeLocation[0].phone_number}
        </p>
      </div>
    </div>
  );
};

export default Cafe_right;
