"use client";
import { useState } from "react";
import styles from "../culture/Culture.module.scss";
import Image from "next/image";

interface Slide {
  id: number;
  image: string | null;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image:
      "https://s3-alpha-sig.figma.com/img/1d5b/aa63/75df1bca16d25aae090581014af4516d?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bACj9RW0DjDacBNowiycuBoRbc04gNVmynNigRLQxg3KhETYAc9DkKUAj2jAtBELaFNfK0ZIS3c3KxnQoFg8~f~UBXYc-23Yce5cEQTJq9ATpzlwiVsJ~o1sdhhp5ha4uhcSdyDTnVMJYj7KyqnRBSFGZDROKw27UkMDQJlyfzYWXAnckXPXWJ94wwfjEnAElYVLfUZwDOSPifj2C37omdtSJtJ6N1ahsVm6RQpHzGONbh8FHZHWV4hdwAe1BRhm69iFAMSFgk87hrl0WuRkzsWpBDv-tjKLUqdH3X7dBTCQCS8X7241hHcTVCuOAnRAo9DHdVj~qmNgDXk4L~uyNw__",
    title: "National Kyrgyz Musical Instruments",
    description:
      "The Kyrgyz began to use felt for the manufacture of carpets and other household items in antiquity. Various factors influenced the development and improvement of each type of Kyrgyz carpet art: living conditions, climate, natural conditions and social factors. The most popular type of felt carpet in Kyrgyzstan today is shyrdak. It is made using mosaic technique, which is one of the most difficult, while one of the most important qualities of shirdak is durability.",
  },
  {
    id: 2,
    image:
      "https://s3-alpha-sig.figma.com/img/86ec/9318/818b152db65a13fad9b89af08ce3bae4?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UUNoCb8BdASkWc4EwW~ilKAv6O~xvOrJw~RMsesjpLXyxbji-XpOSeJabHiGlMkELCHd63DxA8~VXUGDeobritgwKEFekQvkEt2IbuBnOogzfjmFCwjGsYShjBmxUj~~urFmQg2uluPHub6mx2wYbJsUIIVS-fzPaTK~3dm-Q~w-0b1LM-0NSyjaxctBsdMoTWFnX8jWc-3Qm81A7qabm0e8qtG3vbd3gnCbRdueeoo3~nRP3rM1j1LvBP48dNCu3J8IVKPzulaROSt2Weys8mpnG670ItYye-bvU4WIqsvHj3iIqQgim5CXELIV9WkvlN9ulwwAgXG0I5hQJIF9Rw__",
    title: "Handicraft ",
    description:
      "The Kyrgyz began to use felt for the manufacture of carpets and other household items in antiquity. Various factors influenced the development and improvement of each type of Kyrgyz carpet art: living conditions, climate, natural conditions and social factors. The most popular type of felt carpet in Kyrgyzstan today is shyrdak. It is made using mosaic technique, which is one of the most difficult, while one of the most important qualities of shirdak is durability.",
  },
  {
    id: 3,
    image:
      "https://s3-alpha-sig.figma.com/img/9936/c8ea/ded1f7957e54c1e702ab72b30edce71c?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yjys-NF7JMXgs3C0Lhy-nakeon3k3xBGoTbB1R4GpLiAi72vuGWMvmPIaG7~PxHnS0eA~ttBKwD9224cy~~Gx6mGIOoObt20bgIrJqKWRKT24NIa769cwos4riOsObmHV~ZxvLuCoTtRmY7A9yw5yfRF~cxn03DAe2WR6CWwS0rNfYcryGucMVWTghu0wvMKRdvVduUFmD0D4L2Aau18ZtOtdivThdXa9YO7bqlD2QLd-Xes~5ZmUQSCTUqxp3qr-BqK7bNjzWB3E77dpNJNEwmXJIP8Wnr8r3m9ZMoazwYsW449MiOvWyq25SvkBi70K5Mk~3tWST1QzYo-vaQhNg__",
    title: "Guide to the Games of Kyrgyz Nomads",
    description:
      "The Kyrgyz began to use felt for the manufacture of carpets and other household items in antiquity. Various factors influenced the development and improvement of each type of Kyrgyz carpet art: living conditions, climate, natural conditions and social factors. The most popular type of felt carpet in Kyrgyzstan today is shyrdak. It is made using mosaic technique, which is one of the most difficult, while one of the most important qualities of shirdak is durability.",
  },
  {
    id: 4,
    image:
      "https://s3-alpha-sig.figma.com/img/d173/79c1/def0ce57952b6f81aedb3d0594facc7e?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qsJ~kEbyz3tRdUK-Hcj0n78lZptWR0mojsVmUfg~7Qmh0x4Q0VRpc2F7i6HkQu-1LVqoFEr5k3468lvnnoWciFR8n9H9yRShELVZzhpz1c8WA71~S-JFJ9IzMH~2gjnJKezM45W~STfHdgicv8N96oof4SO7RASvLrqFlyUUrmJI-3EtJYEmH-Oi-CFRTCnZPckwzk7q29HG0p7isT9w67zGSHnf8q2e6vxvwpMGQiUZuIHrmxHXhJ5WksfPRkmeOnVHMXvEoEvYUs2-3r5DVxkDRO4eENAfcqopjdny0YuSMh0rr0kIPiQzPSlMggmlh20N0D2GONb4ledInLpcpg__",
    title: "Kitchen",
    description:
      "The Kyrgyz began to use felt for the manufacture of carpets and other household items in antiquity. Various factors influenced the development and improvement of each type of Kyrgyz carpet art: living conditions, climate, natural conditions and social factors. The most popular type of felt carpet in Kyrgyzstan today is shyrdak. It is made using mosaic technique, which is one of the most difficult, while one of the most important qualities of shirdak is durability.",
  },
];

const Culture: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const currentSlide: Slide = slides[currentIndex];

  return (
    <div id={styles.Sliders}>
      <div className="container">
        <div className={styles.slider}>
          <div
            className={styles.slide}
            aria-live="polite"
            aria-label={`Slide ${currentIndex + 1} of ${slides.length}`}
          >
            {currentSlide.image ? (
              <Image
                className={styles.image}
                src={currentSlide.image}
                alt={currentSlide.title}
              />
            ) : (
              <div className={styles.placeholder}>No Image Available</div>
            )}
          </div>

          <div className={styles.content}>
            <h2>{currentSlide.title}</h2>
            <p>{currentSlide.description}</p>

            <button className={styles.butt}>
              More{" "}
              <img
                className={styles.arrow_right}
                src="/images/arrow.svg"
                alt=""
              />
            </button>
          </div>
        </div>
        <div className={styles.arrowBlock}>
          <div className={styles.arrowbtn}>
            <button
              className={styles.prev}
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              ❮
            </button>
            {slides.map((_, index) => (
              <span
                key={index}
                className={currentIndex === index ? styles.active : ""}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index + 1}
              </span>
            ))}
            <button
              className={styles.next}
              onClick={handleNext}
              aria-label="Next slide"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Culture;
