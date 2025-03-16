import { FC, useState } from "react";
import Image from "next/image";
import { BiLike } from "react-icons/bi";
import { LuPhone } from "react-icons/lu";
import scss from "./History.module.scss";
import { IoLocationSharp } from "react-icons/io5";
import { IoLaptopOutline } from "react-icons/io5";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { TfiArrowTopRight } from "react-icons/tfi";
import {
  MdAttractions,
  MdHotel,
  MdOutlineMailOutline,
  MdPlace,
} from "react-icons/md";
import hotel from "@/assets/images/History/Hotel.png";
import hotel1 from "@/assets/images/History/Hotel1.png";
import SearchProfile from "../SearchProfile/SearchProfile";
import User from "../User/User";
import { useGetMeQuery, useGetUserCommentsQuery } from "@/redux/api/auth";
import HotelHistory from "./historyTabs/hotelHistory/HotelHistory";
import { IconToolsKitchen } from "@tabler/icons-react";
import PlaceHistory from "./historyTabs/placeHistory/PlaceHistory";
import KitchenHistory from "./historyTabs/kitchenHistory/KitchenHistory";
import AttractioHistory from "./historyTabs/attractionHistory/AttractionHistory";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import BurgerMenu from "@/appPages/site/ui/BurgerMenu/BurgerMenu";

const History: FC = () => {
  const { data: userComments, isLoading, error } = useGetUserCommentsQuery();
  const [userPreview, setUserPreview] = useState<string | null>(null);
  const { data: user } = useGetMeQuery();
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
    <section id={scss.Tabs_content} className={scss.History}>
      {user?.map((el) => (
        <div className={scss.headerMobile} key={el.id}>
          <h1 className={scss.logo}>LOGO</h1>
          <Space direction="vertical" size={16}>
            <Space wrap size={16}>
              <Avatar
                className={scss.avatar}
                icon={
                  userPreview ? (
                    <img src={userPreview} alt="avatar" />
                  ) : el.user_picture ? (
                    <img src={el.user_picture} alt="avatar" />
                  ) : (
                    <UserOutlined />
                  )
                }
              />
            </Space>
          </Space>
          <div className={scss.burgerMenu}>
            <BurgerMenu />
          </div>
        </div>
      ))}
      <div className={scss.content}>
        <div className={scss.headerUser}>
          <SearchProfile />
          <User />
        </div>
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
        {isTab === 0 && <PlaceHistory />}
        {isTab === 1 && <HotelHistory />}
        {isTab === 2 && <KitchenHistory />}
        {isTab === 4 && <AttractioHistory />}
      </div>
    </section>
  );
}

export default History;
