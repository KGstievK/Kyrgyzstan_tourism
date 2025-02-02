import useTranslate from "@/appPages/site/hooks/translate/translate";
import scss from "./AttractionInfo.module.scss";
import { FC, useState } from "react";
import imgNone from "@/assets/images/universalImage/none.png";
import { useGetAttractionIDQuery } from "@/redux/api/place";
import Image from "next/image";
interface AttractionInfoProps {
  isCurrent: number | null;
}
const AttractionInfo: FC<AttractionInfoProps> = ({ isCurrent }) => {
  const { t } = useTranslate();
  const { data, isLoading, isError } = useGetAttractionIDQuery(isCurrent);
  const [currentContent, setCurrentContent] = useState<number>(0);
  const [errorImg, setErrorImg] = useState(false);
  if (isLoading) return null;
  if (isError) return null;

  return (
    <div className={scss.Attraction}>
      <h2>{data?.attraction_name}</h2>
      <div className={scss.content}>
        <div className={scss.imgs}>
          <Image
            src={
              errorImg || !data?.image[currentContent].image
                ? imgNone
                : data?.image[currentContent].image
            }
            alt={t("Изображение", "صورة", "Image")}
            width={486}
            height={543}
            unoptimized
            style={{
              objectFit: "cover",
              backgroundColor: "#f0f0f0",
            }}
            onError={() => setErrorImg(true)}
          />
          <div>
            {data?.image?.map((el, i) =>
              i !== currentContent ? (
                <div key={el.id} className={scss.bg}>
                  <div></div>
                  <Image
                    src={errorImg || !el.image ? imgNone : el.image}
                    onClick={() => setCurrentContent(i)}
                    alt={t("Изображение", "صورة", "Image")}
                    unoptimized
                    style={{
                      objectFit: "cover",
                      backgroundColor: "#f0f0f0",
                    }}
                    onError={() => setErrorImg(true)}
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
        <div className={scss.item}>
          <p>{data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AttractionInfo;
