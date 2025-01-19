// import React, { useEffect, useState } from "react";
// import scss from "./Tab_hotel.module.scss";
// import hotelImg from "@/images/hotel.jpg";
// import imgRight from "@/assets/images/placeImages/Arrow_alt_lright.png";
// import imgHeart from "@/images/Vector.png";
// import imgLike from "@/images/like.png";
// import imgShare from "@/images/share.png";
// import imgBed from "@/images/bed.png";
// import imgContact from "@/images/contact.png";
// import imgProper from "@/images/proper.png";
// import { usePathname } from "next/navigation";
// import useTranslate from "@/appPages/site/hooks/translate/translate";

// const Tab_hotel = () => {
//   const { t } = useTranslate();
//   const pathName = usePathname();
//   const routeName = pathName.split("/")[2];
  
//   const [isCurrent, setIsCurrent] = useState<number | null>(null);



//   useEffect(() => {
//     if (hotels.length > 0 && isCurrent === null) {
//       setIsCurrent(hotels[0].id);
//     }
//   }, [isCurrent]);

//   const filteredHotels = hotels.filter((el) => 
//     el.popular_places.replaceAll(" ", "").toLocaleLowerCase() === 
//     routeName.replaceAll(" ", "").toLocaleLowerCase()
//   );

//   return (
//     <>
//         <div className={scss.hotel}>

          
//         </div>
//     </>
//   );
// };

// export default Tab_hotel;
