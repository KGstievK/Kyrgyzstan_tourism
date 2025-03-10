import useTranslate from "@/appPages/site/hooks/translate/translate";
import styles from "./Kitchen.module.scss";
import {
  useGetCultureKitchenMainQuery,
  useGetCultureKitchenQuery,
} from "@/redux/api/culture";
import sanitizeHtml from "sanitize-html";
const Kitchen = () => {
  const { t } = useTranslate();
  const { data, isError, isLoading } = useGetCultureKitchenQuery();

  const { data: main } = useGetCultureKitchenMainQuery();
  console.log("🚀 ~ Kitchen ~ main:", main);

  if (isLoading) {
    return <div>Loading...</div>; // или ваш компонент загрузки
  }

  if (isError) {
    return <div>Error loading data</div>; // или ваш компонент ошибки
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>; // или другое сообщение
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles["muted-background"]}></div>
          <h1 className={styles["top-heading"]}>
            {t("Кухня", "المطبخ", "Kitchen")}
          </h1>
          <p className={styles["top-paragraph"]}>
            {t(
              "Кыргызстан - страна, где на перекрестке Великого Шелкового пути слились традиционная кочевая культура и оседлая культура. Отличительной особенностью кыргызских блюд является то, что все они готовятся исключительно из свежих продуктов и редко заготавливаются впрок, а рецепты их приготовления, хотя и кажутся достаточно простыми, на самом деле содержат множество тонкостей, которыми довольно сложно овладеть.",
              "قيرغيزستان هي بلد حيث في مفترق طرق طريق الحرير العظيم، اندمجت الثقافة البدوية التقليدية والثقافة المستقرة. السمة المميزة للأطباق القيرغيزية هي أنها جميعها تُحضر حصرياً من المنتجات الطازجة ونادراً ما يتم تخزينها للاستخدام المستقبلي، ووصفات إعدادها، على الرغم من أنها تبدو بسيطة للغاية، في الواقع تحتوي على العديد من التفاصيل الدقيقة التي يصعب إتقانها.",
              "Kyrgyzstan is a country where at the crossroads of the Great Silk Road, the traditional nomadic culture and the sedentary culture merged. A distinctive feature of Kyrgyz dishes is that they are all prepared exclusively from fresh products and are rarely stocked up for future use, and the recipes for their preparation, although they seem quite simple, in fact contain many subtleties that are rather difficult to master."
            )}
          </p>
        </div>

        {main?.map((el) => (
          <div key={el.id} className={styles.block}>
            <div className={styles.Images}>
              <img src={el.image_1} alt="" className={styles.img1} />
              <div className={styles.images2}>
                <img src={el.image_2} alt="" className={styles.img2} />
                <img src={el.image_3} alt="" className={styles.img2} />
              </div>
              <img src={el.image_4} alt="" className={styles.img1} />
            </div>
            <div className={styles.text}>
              <h3>{el.title}</h3>
              <p
                className={styles.description1}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(el.description),
                }}
              />
            </div>
          </div>
        ))}

        {data.map((el, idx) => (
          <div key={idx} className={styles.main}>
            {el.culture_kitchen_image.map((item) => (
              <img key={item.id} src={item.image} alt="kitchen" />
            ))}
            <div className={styles["main-text"]}>
              <h3 className={styles["main-heading"]}>{el.kitchen_name}</h3>
              <p className={styles["main-paragraph"]}>
                {el.kitchen_description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Kitchen;
