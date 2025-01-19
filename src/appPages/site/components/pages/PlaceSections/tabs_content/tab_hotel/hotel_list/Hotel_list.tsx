// import Stars from '@/appPages/site/ui/stars/Stars';
// import scss from '../Tab_hotel.module.scss';

// const Hotel_list = () => {
//   return (
//     <>
//       <h4>{t("", "", "The best attractions nearby")}</h4>
//       <div className={scss.list}>
//         {hotels.map((el, index) => (
//           <div key={index} className={scss.item}>
//             <img src={hotelImg.src} alt="popular place" />
//             <div className={scss.block}>
//               <h6>{formatString(t("", "", el.name))}</h6>
//               <div>
//                 <Stars rating={el.average_rating} />
//                 <span className={scss.review}>{el.rating_count} reviews</span>
//               </div>
//             </div>
//             <img className={scss.heart} src={imgHeart.src} alt="" />
//             <button onClick={() => setIsCurrent(el.id)}>
//               <img className={scss.right} src={imgRight.src} alt="" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Hotel_list;
