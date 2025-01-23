import React, { useEffect, useState } from "react";
import scss from "./Tab_hotel.module.scss";
import Hotel_list from "./hotel_list/Hotel_list";
import Hotel_info from "./hotel_info/Hotel_info";

const Tab_hotel = () => {
  
  const [isCurrent, setIsCurrent] = useState<number | null>(null);

  return (
    <>
        <div className={scss.hotel}>
            <Hotel_list isCurrent={isCurrent} setIsCurrent={setIsCurrent} />
            <Hotel_info isCurrent={isCurrent} />
        </div>
    </>
  );
};

export default Tab_hotel;
