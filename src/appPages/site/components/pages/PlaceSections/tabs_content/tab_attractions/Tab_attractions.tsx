import { useState } from "react";
import AttractionList from "./attractionList/AttractionList";
import scss from "./Tab_attractions.module.scss";
import AttractionInfo from "./attractionInfo/AttractionInfo";
import { useGetStaticReviewsQuery } from "@/redux/api/reviews";
import Reviews from "@/appPages/site/ui/reviews/Reviews";

interface AttractionsProps {
  isTab: number;
}

const Attractions: React.FC<AttractionsProps> = ({ isTab }) => {
  const [currentId, setCurrentId] = useState<number | null>(null);
  const {data} = useGetStaticReviewsQuery({entityType: "attractions"});
  const attractionStaticInfo = data?.find((attraction) => attraction.id === currentId);

  return (
    <>
    <div id={scss.Attractions}>
      <AttractionList isCurrent={currentId} setIsCurrent={setCurrentId} />
      <AttractionInfo isCurrent={currentId} />
    </div>
    <Reviews isTab={isTab} isCurrent={currentId} reviewsStatic={attractionStaticInfo} />
    </>
  );
};

export default Attractions;
