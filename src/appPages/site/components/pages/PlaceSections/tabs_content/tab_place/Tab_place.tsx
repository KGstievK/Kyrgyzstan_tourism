"use client";

import Map from "@/appPages/site/ui/mapMarker/Map";
import scss from "./Tab_place.module.scss";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import { usePathname } from "next/navigation";
import { useGetStaticReviewsQuery } from "@/redux/api/reviews";
import Reviews from "@/appPages/site/ui/reviews/Reviews";

interface TabPlaceProps {
  isTab: number;
}

const Tab_place: React.FC<TabPlaceProps> = ({ isTab }) => {
  const { t } = useTranslate();
  const pathName = usePathname();
  const id: number = Number(pathName.split("/")[2]);
  const { data } = useGetStaticReviewsQuery({ entityType: "places" });
  const placeStaticInfo = data?.find((place) => place.id === id);
  return (
    <>
      <div className={scss.tab_place}>
        <p>{t("", "", "Where to go")}</p>
        <form className={scss.from}>
          <input type="text" placeholder={t("", "", "From where?")} />
          <input type="text" placeholder={t("", "", "Where")} />
          <button type="submit">{t("", "", "go")}</button>
        </form>

        <div className={scss.map}>
          <Map />
        </div>
      </div>
      <Reviews isTab={isTab} isCurrent={id} reviewStatic={placeStaticInfo} />
    </>
  );
};

export default Tab_place;
