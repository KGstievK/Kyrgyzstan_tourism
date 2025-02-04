
"use client"
import useTranslate from '@/appPages/site/hooks/translate/translate';
import scss from './Gallery.module.scss';
import imgHeart from "@/assets/images/regions/Vector.png"
import imgMetka from "@/assets/images/galleryImages/metka.png"
import { useGetGalleryQuery } from '@/redux/api/gallery';
import Stars from '@/appPages/site/ui/stars/Stars';



const Gallery = () => {
    const {t} = useTranslate()
    const {data, isError, status} = useGetGalleryQuery()
    console.log(status);
    
    return (
            <section id={scss.Gallery}>
                <div className="container">
                <div className={scss.list}>
                                {data?.map((el,i) => (
                                    <div key={i} className={scss.item}>
                                        <img src={el.gallery_image} alt="popular place" />
                                        <div className={scss.block}>
                                            <h6>{ el.gallery_name}</h6>
                                            <div>
                                                <span className={scss.grade}>{el.avg_rating}</span>
                                                <Stars rating={el.avg_rating}/>
                                                <span className={scss.review}>
                                                    {el.rating_count} {t("Отзывы","مراجعات","reviews")}
                                                </span>
                                            </div>
                                            <span className={scss.metka}>
                                                <img src={imgMetka.src} alt="" />
                                                <span>{el.address}</span>
                                            </span>
                                        </div>
                                        <img className={scss.heart} src={imgHeart.src} alt="" />

                                    </div>
                                ))}
                            </div>
                </div>
            </section>
    );
};

export default Gallery;