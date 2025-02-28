import { FC } from "react";
import scss from "../Cafe_item.module.scss";
import MapWithMarker from "./MapWithMarker";
import { Laptop2, Mail, MapPin, PhoneIcon, Pointer } from "lucide-react";
import { FaMarkdown } from "react-icons/fa";

interface Cafe_rightProps {
  cafeLocation?: PLACE.KitchenLocationResponse[]; // Опциональный параметр
}

const Cafe_right: FC<Cafe_rightProps> = ({ cafeLocation }) => {
  if (!cafeLocation) {
    return <div>Loading location data...</div>; // Fallback UI
  }

  console.log(cafeLocation);

  return (
    <div className={scss.right}>
      <h5>Location and contact details</h5>
      <div className={scss.mapContainer}>
        <MapWithMarker
        //   latitude={cafeLocation[0].latitude}
        //   longitude={cafeLocation[0].longitude}
             latitude={42.8746}
             longitude={74.5698}
        />
      </div>
      <div className={scss.contactInfo}>
        <p>
          <span>
            <MapPin color="white" style={{ fill: 'black' }} />
          </span>{" "}
          {cafeLocation[0].address}
        </p>
        <div style={{display: "flex",gap: "10px", alignItems: "center"} }>
          <a
            href={cafeLocation[0].Website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <Laptop2 />
            </span>{" "}
            Website ↗
          </a>
          <a href={`mailto:${cafeLocation[0].email}`} >
            <span>
              <Mail />
            </span>{" "}
            Email ↗
          </a>
        </div>
        <p>
          <span>
            <PhoneIcon fontSize={8} />
          </span>{" "}
          {cafeLocation[0].phone_number}
        </p>
      </div>
      <a href="/edit" className={scss.editLink}>
        Edit this directory object
      </a>
    </div>
  );
};

export default Cafe_right;
