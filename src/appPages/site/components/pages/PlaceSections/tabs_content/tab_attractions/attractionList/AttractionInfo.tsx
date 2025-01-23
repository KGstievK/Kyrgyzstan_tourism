"use client";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./Try.module.scss";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useGetAttractionIDQuery } from "@/redux/api/place";

interface AttractionProps {
  setIsCurrent: (id: number) => void;
  isCurrent: number | null;
}

const AttractionInfo: FC<AttractionProps> = ({isCurrent,setIsCurrent}) => {
  const { t } = useTranslate();
  const { data, isLoading, isError } = useGetAttractionIDQuery(isCurrent);
  const [currentContent, setCurrentContent] = useState<number>(0);


  return (
    <section id={scss.Try}>
      <div className="container">
        <h2>
          {data?.attraction_name}?
        </h2>
        <div className={scss.content}>
          <div className={scss.imgs}>
            <img src={data?.image[currentContent]?.image} alt="" />
            <div>
              <div className={scss.bg}>
                <img src={region?.What_to_try[currentContent]?.image} alt="" />
              </div>
              {region?.What_to_try.map((el, i) =>
                i !== currentContent ? (
                  <div key={i} className={scss.bg}>
                    <div></div>
                    <img src={el.image} alt="" />
                  </div>
                ) : null
              )}
            </div>
          </div>
          <div className={scss.item}>
            <h4>
              {t(
                "Что входит в состав блюда",
                "ما الذي يحتويه الطبق",
                "What is included in the dish"
              )}
            </h4>
            <p>{region?.What_to_try[currentContent]?.second_description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttractionInfo;
