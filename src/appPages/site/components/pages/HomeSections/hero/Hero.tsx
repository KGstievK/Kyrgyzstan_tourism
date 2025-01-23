import { FC } from 'react';
import scss from "./Hero.module.scss";
import imgFC from "@/assets/images/homeImages/fc.png";
import imgMail from "@/assets/images/homeImages/mail.png";
import imgVk from "@/assets/images/homeImages/vk.png";
import imgInst from "@/assets/images/homeImages/inst.png";
import imgVrc from "@/assets/images/homeImages/vec.svg";
import Image from "next/image";

interface SocialIcon {
  src: string;
  alt: string;
  className: string;
}

export const Hero: FC = () => {
  const socialIcons: SocialIcon[] = [
    { src: imgInst.src, alt: "Instagram", className: scss.ins },
    { src: imgFC.src, alt: "Facebook", className: scss.facebook },
    { src: imgVk.src, alt: "VKontakte", className: scss.vk },
    { src: imgMail.src, alt: "Mail", className: scss.mail },
  ];

  return (
    <section id={scss.Hero}>
      <div className={`container ${scss.container}`}>
        <div className={scss.Hero}>
          <div className={scss.iconsblock}>
            <h1 className={scss.pages}>Welcome to the amazing Kyrgyzstan!</h1>

            <div className={scss.icons1}>
              {socialIcons.map((icon, index) => (
                <Image
                  key={index}
                  className={icon.className}
                  src={icon.src}
                  alt={icon.alt}
                  width={24}
                  height={24}
                />
              ))}
            </div>
          </div>

          <div className={scss.pageblock}>
            <div className={scss.input_container}>
              <input
                className={scss.homeinput}
                type="text"
                placeholder="Where to go?"
                aria-label="Search destination"
              />
            </div>
            <button className={scss.homebtn} aria-label="Search">
              <Image 
                src={imgVrc.src} 
                alt="Search icon"
                width={20}
                height={20}
              />
            </button>
          </div>

          <p className={scss.hometext}>
            Are you ready to embark on an exciting journey through the stunning
            country of Central Asia? We are ready to help you plan the perfect
            trip to Kyrgyzstan.
          </p>
        </div>
      </div>
      <div className={scss.heroTwo}>
        <div className={`container ${scss.heroTwoContainer}`}>
          <h1 className={scss.twoText}>Kyrgyzstan</h1>
          <p className={scss.twoTitle}>
            Kyrgyz Republic is a landlocked country located in the heart of
            Central Asia. The capital is Bishkek. The mountainous region of the
            Tian Shan covers over 80% of the country. Kyrgyzstan is occasionally
            referred to as "the Switzerland of Central Asia". The country is
            divided into seven provinces, which are Batken, Chuy, Jalal-Abad,
            Issyk-Kul, Naryn, Osh and Talas.
          </p>
        </div>
      </div>
    </section>
  );
};
