import { FC, useState } from "react";
import styles from "./AttractionInfo.module.scss";
import { useGetAttractionIDQuery } from "@/redux/api/place";

interface AttractionInfoProps {
  isCurrent: number | null;
}
const AttractionInfo: FC<AttractionInfoProps> = ({ isCurrent }) => {
  const { data, isLoading, isError } = useGetAttractionIDQuery(isCurrent);
  const [mainImage, setMainImage] = useState(0);
  
  return (
    <>
      <h1 className={styles.title}>{data?.attraction_name}</h1>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img src={data?.image[mainImage].image} alt="Main" className={styles.mainImage} />
          <div className={styles.gallery}>
            {data?.image.map((img, index) => (
              <img
                key={img.id}
                src={img.image}
                alt={`Thumbnail ${index + 1}`}
                className={styles.thumbnail}
                onClick={() => setMainImage(index)}
              />
            ))}
          </div>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.description}>
            {data?.description}
          </p>
          <ul className={styles.list}>
            <li>139 reviews</li>
            <li>Administrative centers</li>
            <li>Top 1 of 20 entertainment in Cholpon-Ata</li>
            <li>Contacts</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AttractionInfo;
