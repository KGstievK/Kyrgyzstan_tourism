import React, { useState } from "react";
import scss from "../about/About.module.scss";
import Image from "next/image";
import imgNone from "@/assets/images/universalImage/none.png";
import img from "@/assets/images/homeImages/bishkek.jpg";
import useTranslate from "@/appPages/site/hooks/translate/translate";
const About = () => {
  const { t } = useTranslate();
  const [error, setError] = useState(false);

  return (
    <div id={scss.About}>
      <div className="container">
        <div className={scss.About}>
          <h1 className={`${scss.herotitle} ${scss.hidden}`}>
            {t("Бишкек", "عن بيشكيك", "Bishkek")}
          </h1>
          <Image
            src={error || !img ? imgNone : img}
            alt={"Bishkek"}
            width={400}
            height={300}
            style={{
              objectFit: "cover",
              backgroundColor: "#f0f0f0",
              width: "100%",
              height: "300px",
            }}
            onError={() => setError(true)}
          />
          <div>
            <h1 className={scss.herotitle}>Bishkek</h1>
            <p className={scss.herotext}>
              This is the capital of a picturesque mountainous country -
              Kyrgyzstan, from where tourists make trips to the world-famous,
              crystal-clear Issyk-Kul and other natural attractions of the Tien
              Shan. Framed by mountains, the city is rich in beautiful views,
              monumental monuments, parks and museum antiquities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
