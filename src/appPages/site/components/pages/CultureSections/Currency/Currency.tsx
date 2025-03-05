import useTranslate from "@/appPages/site/hooks/translate/translate";
import styles from "./Currency.module.scss";
import { useGetCurrencyQuery, useGetGamesQuery } from "@/redux/api/culture";
import img1 from "@/assets/images/cultureImages/image 996.jpg";
import img2 from "@/assets/images/cultureImages/image 997.jpg";
import imgback from "@/assets/images/cultureImages/currency_back.jpg";

import Image from "next/image";
import { useMeasure } from "react-use";
const Currency = () => {
  const { t } = useTranslate();
  const { data, isError, isLoading } = useGetCurrencyQuery();
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();
  const dataImages = Array.from({ length: 10 }, (_, i) => ({
    front: img1,
    back: img2,
  }));

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.top} ref={ref}>
          <div className={styles["muted-background"]}></div>
          <h1 className={styles["top-heading"]}>
            {t("Валюта", "العملة", "Currency")}
          </h1>
          <p className={styles["top-paragraph"]}>
            {t(
              "Национальной валютой Кыргызстана является сом (KGS). В обращении находятся банкноты различного номинала и монеты. Обмен валюты доступен в банках и обменных пунктах.",
              "عملة قيرغيزستان الوطنية هي السوم (KGS). تتداول الأوراق النقدية والعملات المعدنية من مختلف الفئات. يتوفر صرف العملات في البنوك ومكاتب الصرافة.",
              "The national currency of Kyrgyzstan is the som (KGS). Banknotes and coins of various denominations are in circulation. Currency exchange is available at banks and exchange offices."
            )}
          </p>
        </div>
        <div className={styles.bottom} style={{ top: height }}>
          <div className={styles.images}>
            {data && data[0]?.currency_image.map((el, idx) => (
              <div key={idx} className={styles.image}>
                <div className={styles.img}>
                  <Image
                    src={el.front_image}
                    alt="currency"
                    width={199}
                    height={94}
                  />
                </div>
                <div className={styles.img}>
                  <Image
                    src={el.back_image}
                    width={199}
                    height={94}
                    alt="currency"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.descrs}>
            {data && data[0]?.currency_description.map((el, idx) => (
              <p key={idx}>{el.description}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Currency;
