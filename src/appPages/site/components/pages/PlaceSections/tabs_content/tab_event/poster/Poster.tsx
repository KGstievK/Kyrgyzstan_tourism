import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "../Tab_event.module.scss";
import searchImg from "@/assets/images/placeImages/search.png";
import { FC } from "react";

interface Props {
  setIsSearch: (value: string) => void;
}

const Poster: FC<Props> = ({ setIsSearch }) => {
  const { t } = useTranslate();
  return (
    <div className={scss.poster}>
      <h2>{t("", "", "Poster")}</h2>
      <div className={scss.search}>
        <img src={searchImg.src} alt="" />
        <input onChange={(e) => setIsSearch(e.target.value)} type="text" placeholder={t("Поиск", "", "Search")} />
      </div>
    </div>
  );
};

export default Poster;
