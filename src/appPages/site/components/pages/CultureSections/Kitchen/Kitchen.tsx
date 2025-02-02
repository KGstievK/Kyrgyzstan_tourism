import useTranslate from "@/appPages/site/hooks/translate/translate";
import styles from "./Kitchen.module.scss";
import { useGetCultureKitchenQuery } from "@/redux/api/culture";
import image from "@/assets/images/homeImages/bishkek.jpg";
import Image from "next/image";
const Kitchen = () => {
  const { t } = useTranslate();
  const { data, isError, isLoading } = useGetCultureKitchenQuery();

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

        <div className={styles.kitchen}>
          <div className={styles.grid_layout}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className={styles.image_wrapper}>
                <Image
                  src={image}
                  alt="image"
                  fill
                  className={styles.object_cover}
                />
              </div>
            ))}
          </div>

          <div className={styles.descr}>
            <h3>asdfghjklkjuyt</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
              ipsum accusantium doloremque, quidem adipisci minus possimus
              corporis alias, hic iste commodi quos dolores! Beatae sed,
              accusamus vitae sunt explicabo architecto, rem nobis saepe dicta
              deserunt aliquid doloremque corporis nostrum officiis.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
              ipsum accusantium doloremque, quidem adipisci minus possimus
              corporis alias, hic iste commodi quos dolores! Beatae sed,
              accusamus vitae sunt explicabo architecto, rem nobis saepe dicta
              deserunt aliquid doloremque corporis nostrum officiis.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
              ipsum accusantium doloremque, quidem adipisci minus possimus
              corporis alias, hic iste commodi quos dolores! Beatae sed,
              accusamus vitae sunt explicabo architecto, rem nobis saepe dicta
              deserunt aliquid doloremque corporis nostrum officiis.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
              ipsum accusantium doloremque, quidem adipisci minus possimus
              corporis alias, hic iste commodi quos dolores! Beatae sed,
              accusamus vitae sunt explicabo architecto, rem nobis saepe dicta
              deserunt aliquid doloremque corporis nostrum officiis.
            </p>
          </div>
        </div>

        {data.map((el, idx) => (
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
        ))}
      </div>
    </section>
  );
};

export default Kitchen;
