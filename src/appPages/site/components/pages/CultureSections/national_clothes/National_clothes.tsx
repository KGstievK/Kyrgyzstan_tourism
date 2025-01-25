import useTranslate from "@/appPages/site/hooks/translate/translate";
import styles from "./CultureGames.module.scss";
import { useGetGamesQuery } from "@/redux/api/culture";
import { url } from "inspector";

const National_clothes = () => {
  const { t } = useTranslate();
  const { data, isError } = useGetGamesQuery();

  if (isError) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles["muted-background"]}></div>
          <h1 className={styles["top-heading"]}>
            {t("Национальные одежды", "الملابس الوطنية", "National clothes")}
          </h1>
          <p className={styles["top-paragraph"]}>
            {t(
              ""
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

export default National_clothes;
