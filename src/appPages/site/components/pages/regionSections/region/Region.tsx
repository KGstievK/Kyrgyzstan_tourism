"use client";
import scss from "./Region.module.scss";

import groupPng from "@/assets/images/regions/Group.png";
import { useGetRegionListQuery } from "@/redux/api/regions";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Region = () => {
  const { data, isLoading, isError } = useGetRegionListQuery();

  const pathName = usePathname();
  const routeName = pathName.split("/")[1];

  const region = data?.find(
    (el) => el.region_category.toLocaleLowerCase() === routeName.toLowerCase()
  );

  if (!region) return null;
  return (
    <>
      <section id={scss.Region}>
        <div className="container">
          <div className={scss.region}>
            <div className={scss.img}>
              
              <Image 
                src={region?.region_image} 
                alt={region?.region_name}
                width={590}
                height={423}
              />
              <div className="">
                <img src={groupPng.src} alt="temperature" />
                <span>26°C</span>
              </div>
            </div>

            <div className={scss.block}>
              <h2>{region?.region_name}</h2>
              <p>{region?.region_description.slice(0, 470)}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Region;
