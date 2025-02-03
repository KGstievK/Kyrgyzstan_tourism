import useTranslate from "@/appPages/site/hooks/translate/translate";
import styles from "../Culture.module.scss";
import { useGetGamesQuery } from "@/redux/api/culture";

const CultureGames = () => {
  const { t } = useTranslate();
  const { data, isError } = useGetGamesQuery();
console.log(data);

  if (isError) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles["muted-background"]}></div>
          <h1 className={styles["top-heading"]}>
            {t("игры", "ألعاب", "games")}
          </h1>
          <p className={styles["top-paragraph"]}>
            {t(
              "С древних времен кыргызы придавали большое значение народным играм и развлечениям, ни один народный праздник не обходился без них. Традиционные конные игры остаются самыми любимыми и почитаемыми.",
              "منذ العصور القديمة، أولى القرغيز أهمية كبيرة للألعاب والأنشطة الشعبية، ولم يكن أي مهرجان شعبي يخلو منها. تظل الألعاب الفروسية التقليدية الأكثر حباً وتقديراً.",
              "Since ancient times, the Kyrgyz have given a great place to folk games and entertainment, not a single folk festival took place without them. Traditional equestrian games remain the most beloved and revered."
            )}
          </p>
        </div>
        {data?.map((el, idx) => (
          <div key={idx} className={styles.main}>
            <div className={styles.img} style={{background: `url(${el.games_image}) center/cover no-repeat`}}></div>
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

export default CultureGames;
