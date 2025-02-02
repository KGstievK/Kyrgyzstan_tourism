import React from "react";
import styles from "./MainCulture.module.scss";
import Link from "next/link";
import Arrow from "@/assets/images/regions/Arrow_alt_lright.png";
import Background from "@/assets/images/cultureImages/main-culture.jpg";
const cultureNav = [
  { name: "Games", href: "/culture/games" },
  { name: "National clothes", href: "/culture/national_clothes" },
  { name: "Hand crafts", href: "/culture/hand-craftes" },
  { name: "Currency", href: "/culture/currency" },
  { name: "National instruments", href: "/culture/national_instruments" },
  { name: "Kitchen", href: "/culture/kitchen" },
];
const MainCulture = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.main}>
          <img className={styles.background} src={Background.src} alt="" />
          <div className={styles["main-text"]}>
              <h1 className={styles.heading}>Culture</h1>
              <p className={styles.descr}>
                The culture of Kyrgyzstan was formed under the strong influence
                of nomadic life. In addition, it was influenced by the cultures
                of Russia, Persia and Turkey, and yet it remained quite original
                and unique. The connection of Kyrgyz culture with nature can be
                traced everywhere: from design to music. One of the most famous
                examples of Kyrgyz culture is the Manas epic, an incredibly long
                poem that was passed down orally from one generation to the
                next.
              </p>
            <ul className={styles.link}>
              {cultureNav.map((el, idx) => (
                <Link key={idx} href={el.href}>
                  <li className={styles.li}>
                    {el.name} <img src={Arrow.src} alt="->" />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCulture;
