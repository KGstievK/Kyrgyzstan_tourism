import scss from './Cafe_item.module.scss';
import icon from "@/assets/images/placeImages/Icon.png"
import icon2 from "@/assets/images/placeImages/Icon2.png"
import icon4 from "@/assets/images/placeImages/Icon4.png"
import icon5 from "@/assets/images/placeImages/Icon5.png"
// import like from "@/images/like2.png"
import { FC  } from 'react';
import useTranslate from '@/appPages/site/hooks/translate/translate';
import { useGetKitchenIDQuery } from '@/redux/api/place';
import Stars from '@/appPages/site/ui/stars/Stars';
interface propsType {    
    kitchens: PLACE.KitchenResponse | undefined;
    isCurrent: number | null
}
const Cafe_item: FC<propsType> = ({kitchens,isCurrent}) => {
    const {t} = useTranslate()
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);
    const {data, isLoading, isError} = useGetKitchenIDQuery(isCurrent)

    const dataStars = [
        {
            icon: icon.src,
            label: "Nutrition",
            rating: data?.nutrition_rating
        },
        {
            icon: icon2.src,
            label: "Service",
            rating: data?.service_rating
        },
        {
            icon: icon4.src,
            label: "Price quality",
            rating: data?.price_rating
        },
        {
            icon: icon5.src,
            label: "Atmosphere",
            rating: data?.atmosphere_rating
        }
    ]

    if (isError) {
        return null;
    }

     return (
        <div className={scss.cafe_item}>
            <h4>{data?.kitchen_name}</h4>
            <div className={scss.imgs}>
                {data?.kitchen_image.map(el => <img src={el.image} alt=''/>)}
            </div>
            <div className={scss.info}>
                <div>
                    <div className={scss.left}>
                            <h5>{t("Рейтинги и отзывы","التقييمات والمراجعات","Ratings and reviews")}</h5>
                            
                            <div className={scss.stars_review}>
                            <div className={scss.grades}>{data?.average_rating ?? 0}</div>
                            <div className={scss.stars}>
                                {stars.map((star) => (
                                <div key={star} className={scss.starContainer}>
                                    <div
                                    className={scss.starFill}
                                    style={{
                                        width: `${
                                        star <= (data?.average_rating ?? 0)
                                            ? 100
                                            : star - (data?.average_rating ?? 0) < 1
                                            ? ((data?.average_rating ?? 0) - (star - 1)) * 100
                                            : 0
                                        }%`,
                                    }}
                                    />
                                </div>
                                ))}
                            </div>
                            <p>{data?.rating_count ?? 0} {t("отзывы","مراجعات","reviews")}</p>
                            </div>


                            <div className={scss.assess}>
                                <p>№ 1 <span>{t("","",`of ${kitchens?.length} Restaurants in `)}</span></p>
                                <p> {t("","","ASSESSMENTS")}</p>
                            </div>

                            <ul>
                                {dataStars.map((item, index) => (
                                    <li key={index}>
                                        <div>
                                            <img src={item.icon} alt="" />
                                            <span>{t("","",item.label)}</span>
                                        </div>
                                        <div>
                                            <Stars rating={item.rating}/>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            
                    </div>
                </div>
                <div>
                    <div className={scss.middle}>
                        <h5>{t("Более подробно","أكثر تفصيلاً","More detailed")}</h5>
                        <div>
                            <p className={scss.title}>{t(" Диапазон цен","نطاق السعر","PRICE RANGE")}</p>
                            <p className={scss.descr}>{`$${data?.price} - $${data?.price}`}</p>
                        </div>
                        <div>
                            <p className={scss.title}>{t("Специализированное меню","قائمة متخصصة","Specialized menu")}</p>
                            <p className={scss.descr}>{data?.specialized_menu}</p>
                        </div>
                        <div>
                            <p className={scss.title}>{t("Время приема пищи","وقت الوجبة","Meal time")}</p>
                            <p className={scss.descr}>{data?.meal_time.map(item => item+", ")}</p>
                        </div>
                        <div>
                            <p className={scss.title}>{t("Показать всю информацию","عرض جميع المعلومات","Show all information")}</p>
                            <p className={scss.descr}>{t("","","services, description")}</p>
                        </div>

                    </div>
                </div>
                <div>
                    <div className={scss.right}>
                        <h5>{t("Местоположение и контактные данные","تفاصيل الموقع ووسائل الاتصال","Location and contact details")}</h5>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cafe_item;