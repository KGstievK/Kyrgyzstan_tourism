import useTranslate from "@/appPages/site/hooks/translate/translate";
import styles from "./Currency.module.scss";
import { useGetGamesQuery } from "@/redux/api/culture";
import img1 from "@/assets/images/cultureImages/image 996.jpg";
import img2 from "@/assets/images/cultureImages/image 997.jpg";
import Image from "next/image";
const Currency = () => {
  const { t } = useTranslate();
  const { data, isError } = useGetGamesQuery();

  const dataImages = Array.from({ length: 10 }, (_, i) => ({
    front: img1,
    back: img2
  }))

  if (isError) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles["muted-background"]}></div>
          <h1 className={styles["top-heading"]}>
            {t(
              "Валюта",
              "العملة",
              "Currency"
            )}
          </h1>
          <p className={styles["top-paragraph"]}>
            {t(
              "Национальной валютой Кыргызстана является сом (KGS). В обращении находятся банкноты различного номинала и монеты. Обмен валюты доступен в банках и обменных пунктах.",
              "عملة قيرغيزستان الوطنية هي السوم (KGS). تتداول الأوراق النقدية والعملات المعدنية من مختلف الفئات. يتوفر صرف العملات في البنوك ومكاتب الصرافة.",
              "The national currency of Kyrgyzstan is the som (KGS). Banknotes and coins of various denominations are in circulation. Currency exchange is available at banks and exchange offices."
            )}
          </p>
        </div>

        <div className={styles.bottom}>
          <div className={styles.images}>
            {dataImages.map((el, idx) => (
              <div key={idx} className={styles.image}> 
                <div
                  className={styles.img}
                  
                  style={{
                    background: `url(${el.front}) center/cover no-repeat`,
                  }}
                >
                  <Image src={el.front} alt="currency" />
                </div>
                <div
                  className={styles.img}
                  style={{
                    background: `url(${el.back}) center/cover no-repeat`,
                  }}
                ></div>
              </div>
            ))}
          </div>
          <div className={styles.descrs}>
            <p>The national currency of Kyrgyzstan is the som, its international designation is KGS. The resolution on the introduction of the national currency was adopted by the Parliament of Kyrgyzstan on May 10, 1993. Kyrgyzstan became the second CIS country after Russia to adopt its own national currency after the collapse of the Soviet Union.</p>
            <p>The national currency of Kyrgyzstan is the som, its international designation is KGS. The resolution on the introduction of the national currency was adopted by the Parliament of Kyrgyzstan on May 10, 1993. Kyrgyzstan became the second CIS country after Russia to adopt its own national currency after the collapse of the Soviet Union.</p>
            <p>The national currency of Kyrgyzstan is the som, its international designation is KGS. The resolution on the introduction of the national currency was adopted by the Parliament of Kyrgyzstan on May 10, 1993. Kyrgyzstan became the second CIS country after Russia to adopt its own national currency after the collapse of the Soviet Union.</p>
          </div>
        </div>

        {/* {data?.map((el, idx) => (
          <div key={idx} className={styles.main}>
            <div
              className={styles.img}
              style={{
                background: `url(${el.games_image}) center/cover no-repeat`,
              }}
            ></div>
            <div className={styles["main-text"]}>
              <h3 className={styles["main-heading"]}>{el.games_name}</h3>
              <p className={styles["main-paragraph"]}>{el.games_description}</p>
            </div>
          </div>
        ))} */}
      </div>
    </section>
  );
};

export default Currency;
