import useTranslate from "@/appPages/site/hooks/translate/translate";
import styles from "./Hand_crafts.module.scss";
import { useGetHandCraftsQuery } from "@/redux/api/culture";

const Hand_crafts = () => {
  const { t } = useTranslate();
  const { data, isError } = useGetHandCraftsQuery();
  console.log("🚀 ~ constHand_crafts= ~ data:", data);

  // if (isError) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles["muted-background"]}></div>
          <h1 className={styles["top-heading"]}>
            {t("Ремесла", "الحرف اليدوية", "Hand crafts")}
          </h1>
          <p className={styles["top-paragraph"]}>
            {t(
              "Ковровое искусство занимает отдельное место в материальной культуре всех народов Центральной Азии. Это отдельная категория прикладного ремесла, имеющая свои обычаи и традиции. Ковроткачество - это искусство, имеющее многовековую историю.",
              "يحتل فن السجاد مكانة خاصة في الثقافة المادية لجميع شعوب آسيا الوسطى. هذه فئة منفصلة من الحرف التطبيقية التي لها عاداتها وتقاليدها. نسج السجاد هو فن له تاريخ عمره قرون.",
              "Carpet art occupies a separate place in the material culture of all Central Asian peoples. This is a separate category of applied craft, which has its own customs and traditions. Carpet weaving is an art that has a centuries-old history."
            )}
          </p>
        </div>
        {data?.map((el, idx) => (
          <div key={idx} className={styles.main}>
            <img src={el.hand_image} alt="" />
            <div className={styles["main-text"]}>
              <h3 className={styles["main-heading"]}>{el.hand_name}</h3>
              <p className={styles["main-paragraph"]}>{el.hand_description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hand_crafts;
