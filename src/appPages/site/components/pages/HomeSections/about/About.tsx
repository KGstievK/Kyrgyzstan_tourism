import React from "react";
import scss from "../about/About.module.scss";

const About = () => {
  return (
    <div id={scss.About}>
      <div className="container">
        <div className={scss.About}>
          <h1 className={`${scss.herotitle} ${scss.hidden}`}>Bishkek</h1>
          <img
            className={scss.heroimg}
            src="https://s3-alpha-sig.figma.com/img/e21a/2f1b/57c2f97ad93d1513f9bc8ffc5c3ff37a?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TFKesmmRMPRFb~UFkxa1fM12YqvlXtke33dnsVeymhzZIy4388qC8XSmTpIF~0ICgBWtO5M5sBZu9OIbiEPdwNa6XPFiZN4egd8GAgpmMknyaDvpy0TZWZ8efUyESyvwxrTluUk0zriafqLjsM-NFB8sVk5TG-vgfeBWFKHYm5pK3yli4B5go4xn7Lhq2vyRb9Hr7K6bVZ5yLyuNr61kU4paWv4f8n6uHJ~h1Jw3PEOWMCsTkOqog9JO3P-B3V18HlcEfKuoZZRPHwGyFsdtDak7Cu2CdhmL2-N~zLCro24DRWKSPUxKPyo~KyrDwkZbvxASwASvhN7m3AuL4UoAYQ__"
            alt=""
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
