import { FC, useState } from "react";
import scss from "./History.module.scss";
import {
  MdAttractions,
  MdHotel,
  MdPlace,
} from "react-icons/md";
import HotelHistory from "./historyTabs/hotelHistory/HotelHistory";
import { IconToolsKitchen } from "@tabler/icons-react";
import PlaceHistory from "./historyTabs/placeHistory/PlaceHistory";
import KitchenHistory from "./historyTabs/kitchenHistory/KitchenHistory";
import AttractioHistory from "./historyTabs/attractionHistory/AttractionHistory";

const History: FC = () => {

  const tabsButton = [
    { id: 0, name: "place", img: <MdPlace size={18} /> },
    { id: 1, name: "Hotel", img: <MdHotel size={18} /> },
    { id: 2, name: "Kitchen", img: <IconToolsKitchen size={18} /> },
    { id: 4, name: "Attractions", img: <MdAttractions size={18} /> },
  ];

  const [isTab, setIsTab] = useState<number>(() => {
    const storedTab = sessionStorage.getItem("tabHistory");
    return storedTab !== null ? +storedTab : 0;
  });

  return (
    <section id={scss.Tabs_content}>
      <div className={scss.tabs}>
        {tabsButton.map((tab) => (
          <button
            style={
              isTab === tab.id
                ? { background: "#004A60", color: "white" }
                : { background: "transparent" }
            }
            key={tab.id}
            onClick={() => {
              sessionStorage.setItem("tabHistory", tab.id.toString());
              setIsTab(tab.id);
            }}
            className={isTab === tab.id ? scss.active : ""}
          >
            {tab.img}
            {tab.name}
          </button>
        ))}
      </div>

      <div className={scss.content}>
        {isTab === 0 && <PlaceHistory />}
        {isTab === 1 && <HotelHistory />}
        {isTab === 2 && <KitchenHistory />}
        {isTab === 4 && <AttractioHistory />}
      </div>
    </section>
  );
  
};

export default History;
