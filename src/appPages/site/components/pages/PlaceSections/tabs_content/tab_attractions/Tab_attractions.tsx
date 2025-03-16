"use client"; // Добавляем директиву для клиентского рендеринга
import { useState, useEffect } from "react"; // Добавляем useEffect
import AttractionList from "./attractionList/AttractionList";
import scss from "./Tab_attractions.module.scss";
import AttractionInfo from "./attractionInfo/AttractionInfo";
import { useGetStaticReviewsQuery } from "@/redux/api/reviews";
import Reviews from "@/appPages/site/ui/reviews/Reviews";

interface AttractionsProps {
  isTab: number;
}

const Attractions: React.FC<AttractionsProps> = ({ isTab }) => {
  // Инициализируем currentId из sessionStorage или null
  const [currentId, setCurrentId] = useState<number | null>(() => {
    const storedId = sessionStorage.getItem("currentAttractionId");
    return storedId !== null ? +storedId : null;
  });

  const { data } = useGetStaticReviewsQuery({ entityType: "attraction" });
  const attractionStaticInfo = data?.find(
    (attraction) => attraction.id === currentId
  );
  // Сохраняем currentId в sessionStorage при его изменении
  useEffect(() => {
    if (currentId !== null) {
      sessionStorage.setItem("currentAttractionId", currentId.toString());
    }
  }, [currentId]);

  return (
    <>
      <div id={scss.Attractions}>
        <AttractionList isCurrent={currentId} setIsCurrent={setCurrentId} />
        <AttractionInfo isCurrent={currentId} />
      </div>
      <Reviews
        isTab={isTab}
        isCurrent={currentId}
        reviewStatic={attractionStaticInfo}
      />
    </>
  );
};

export default Attractions;
