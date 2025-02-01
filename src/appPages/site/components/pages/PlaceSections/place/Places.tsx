"use client"
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import useTranslate from '@/appPages/site/hooks/translate/translate';
import { useGetPlaceQuery } from '@/redux/api/place';
import groupPng from "@/assets/images/regions/Group.png";
import scss from './Places.module.scss';

const Places: FC = () => {
    const pathName = usePathname();
    const id: number = Number(pathName.split("/")[2]);
    const { data } = useGetPlaceQuery(id);
    console.log(data);
    
    const truncatedDescription = data?.description 
        ? `${data.description.slice(0, 470)}...` 
        : '';


    return (
        <section id={scss.Places}>
            <div className="container">
                <div className={scss.region}>
                    <div className={scss.img}>
                        {data?.popular_image && (
                            <Image 
                                src={data.popular_image}
                                alt={data.popular_name || 'Place image'}
                                width={500}
                                height={300}
                            />
                        )}
                        <div className={scss.temperature}>
                            <Image 
                                src={groupPng.src}
                                alt="temperature"
                                width={24}
                                height={24}
                            />
                            <span>26°C</span>
                        </div>
                    </div>
                    <div className={scss.block}>    
                        <h2>{data?.popular_name}</h2>
                        <p>{truncatedDescription}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Places;