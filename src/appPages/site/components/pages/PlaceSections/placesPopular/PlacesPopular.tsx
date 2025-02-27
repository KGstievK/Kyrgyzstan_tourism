"use client";
import scss from "./Places.module.scss";
import imgRight from "@/assets/images/regions/Arrow_alt_lright.png";
import imgHeart from "@/assets/images/regions/Vector.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useGetRegionListQuery } from "@/redux/api/regions";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import Stars from "@/appPages/site/ui/stars/Stars";

type TabsDataType = Record<number, REGION_LIST.PopularResponse>;

const PlacesPopular = () => {
  const { t } = useTranslate();
  const [activeTab, setActiveTab] = useState(1);
  const pathName = usePathname();
  const routeName = pathName.split("/")[1];
  const routeID = pathName.split("/")[2];
  const { data } = useGetRegionListQuery();
  const findRegion = data?.find(
    (region) =>
      region.region_category.toLowerCase().replaceAll(" ", "") ===
      routeName.toLowerCase().replaceAll(" ", "")
  )?.popular_places;
  const popular_places = findRegion?.filter((el) => +el.id !== +routeID);

  const CARDS_PER_TAB = 3;
  const tabsData: TabsDataType = useMemo(() => {
    if (!findRegion || !popular_places) {
      return {};
    }

    const result: TabsDataType = {};
    const totalTabs = Math.ceil(popular_places.length / CARDS_PER_TAB);

    for (let i = 0; i < totalTabs; i++) {
      const startIndex = i * CARDS_PER_TAB;
      result[i + 1] = popular_places.slice(
        startIndex,
        startIndex + CARDS_PER_TAB
      );
    }

    return result;
  }, [findRegion]);

  const totalTabs = Object.keys(tabsData).length;

  return (
    <>
      <section id={scss.Places}>
        <div className="container">
          <h2>{t("", "", "Popular places")}</h2>
          <div className={scss.list}>
            {tabsData[activeTab]?.map((item, i) => (
              <div key={i} className={scss.item}>
                <img src={item.popular_image} alt="" />
                <div className={scss.block}>
                  <h6>{item.popular_name}</h6>
                  <div>
                    <span className={scss.grade}>{item.avg_rating}</span>
                    <Stars rating={item.avg_rating} />
                    <span className={scss.review}>
                      {item.rating_count} reviews
                    </span>
                  </div>
                </div>
                <img className={scss.heart} src={imgHeart.src} alt="" />
                <Link href={`/${routeName}/${item.id}`}>
                  <img className={scss.right} src={imgRight.src} alt="" />
                </Link>
              </div>
            ))}
          </div>
          {!tabsData[activeTab] && ""}
          {totalTabs > 1 && (
            <div className={scss.tabs}>
              {Array.from({ length: totalTabs }, (_, i) => i + 1).map(
                (el, i) => (
                  <button
                    style={{
                      background: activeTab === el ? "#3C5F63" : "transparent",
                    }}
                    key={el}
                    onClick={() => setActiveTab(el)}
                  >
                    {" "}
                    {el}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PlacesPopular;
