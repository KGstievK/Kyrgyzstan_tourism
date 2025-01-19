// import scss from '../Tab_hotel.module.scss';

// const Hotel_info = () => {
//     return (
//         <div className={scss.hotel_item}>
//               <h4>{t("", "", hotelItemSlice.name)}</h4>
//               <div className={scss.imgs}>
//                 {hotelItemSlice.hotel_image.map((img,i) => <img key={i} src={img}/>)}
//               </div>
//               <div className={scss.info}>
//                 <div className={scss.left}>
//                   <div className={scss.titles}>
//                     <div className={scss.title}>
//                       <h5>{t("", "", "Well Furnished Apartment")} </h5>
//                       <p>{hotelItemSlice.address}</p>
//                     </div>
//                     <div className={scss.links}>
//                       <button>
//                         <img src={imgLike.src} alt="" />
//                       </button>
//                       <button>
//                         <img src={imgShare.src} alt="" />
//                       </button>
//                     </div>
//                   </div>
//                   <div className={scss.list}>
//                       <div>
//                         <img src={imgBed.src} alt="" />
//                         <span>{hotelItemSlice.bedroom} Bedrooms</span>
//                       </div>
//                       <div>
//                         <img src={imgBed.src} alt="" />
//                         <span>{hotelItemSlice.bathroom} Bathrooms</span>
//                       </div>
//                       <div>
//                         <img src={imgBed.src} alt="" />
//                         <span>{hotelItemSlice.cars}cars/{hotelItemSlice.bikes}bikes</span>
//                       </div>
//                       <div>
//                         <img src={imgBed.src} alt="" />
//                         <span>{hotelItemSlice.pets} Pets Allowed</span>
//                       </div>
//                   </div>
//                   <div className={scss.descr}>
//                     <h6>{t("", "", "Apartment Description")}</h6>
//                     <p>
//                       {t(
//                         "",
//                         "",
//                         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
//                       )
                      
//                       }
//                     </p>
//                   </div>
//                   <div className={scss.amen}>
//                     <h6>{t("", "", "Offered Amenities")}</h6>
//                     <div className={scss.amenities}>
//                       {hotelItemSlice.amenities.map((item, index) => (
//                         <div key={index}>
//                           <img src={imgBed.src} alt="" />
//                           <span>{item}</span>
//                         </div>
//                       ))}
//                       <button>{t("", "", "Show All 10 Amenities")}</button>
//                     </div>
//                   </div>
//                   <div className={scss.safe}>
//                     <h6>{t("", "", "Safety and Hygiene")}</h6>
//                     <div className={scss.safe_list}>
//                       {Array.from({ length: 4 }).map((_, index) => (
//                         <div key={index}>
//                           <img src={imgBed.src} alt="" />
//                           <span>{t("", "", "Daily Cleaning")}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="">
//                   <div className={scss.right}>
//                     <div className={scss.price}>$ {hotelItemSlice.price_short_period} - $ {hotelItemSlice.price_long_period}</div>
//                     <ul>
//                       <li>{t("", "", "Short Period: $ ")} {hotelItemSlice.price_short_period}</li>
//                       <li>{t("", "", "Medium Period: $ ")}{hotelItemSlice.price_medium_period}</li>
//                       <li>{t("", "", "Long Period: $ ")}{hotelItemSlice.price_long_period}</li>
//                     </ul>
//                     <button>{t("", "", "Reserve Now")}</button>
//                     <div className={scss.call}>
//                       <div>
//                         <img src={imgProper.src} alt="" />
//                         <span>{t('','','Property Inquiry')}</span>
//                       </div>
//                       <div>
//                         <img src={imgContact.src} alt="" />
//                         <span>{t('','','Contact Host')}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//     );
// };

// export default Hotel_info;