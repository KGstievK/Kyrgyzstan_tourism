"use client";
import { useState } from "react";
import styles from "../culture/Culture.module.scss";
import Image from "next/image";
import { useGetCultureListQuery } from "@/redux/api/home";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import { ArrowRightIcon } from "lucide-react";

const Culture: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { t } = useTranslate();
  const { data: slides = [], isError, isLoading } = useGetCultureListQuery();
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const currentSlide = slides[currentIndex];
  if (isLoading) return <h1>Loading</h1>;
  if (isError) return null;
  return (
    <>
      <div id={styles.Sliders}>
        <div className="container">
          <div className={styles.slider}>
            <div
              className={styles.slide}
              aria-live="polite"
              aria-label={`Slide ${currentIndex + 1} of ${slides.length}`}
            >
              {currentSlide.culture_image ? (
                <Image
                  className={styles.image}
                  src={currentSlide.culture_image}
                  alt={currentSlide.culture_name}
                  width={805}
                  height={546}
                />
              ) : (
                <div className={styles.placeholder}>No Image Available</div>
              )}
            </div>

            <div className={styles.content}>
              <h2>{currentSlide.culture_name}</h2>
              <p>{currentSlide.culture_description}</p>

              <button className={styles.butt}>
                More{" "}
                <ArrowRightIcon className={styles.icon} size={16} />
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
              {slides.map((el, index) => (
                <span
                style={currentIndex === index ? {background: "#3c5f63"} : {}}
                  key={el.id}
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
    </>
  );
};

export default Culture;