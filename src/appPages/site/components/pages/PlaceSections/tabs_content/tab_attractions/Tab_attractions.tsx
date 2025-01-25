import { useState } from "react";
import AttractionList from "./attractionList/AttractionList";
import scss from "./Tab_attractions.module.scss";
import AttractionInfo from "./attractionInfo/AttractionInfo";

const Attractions = () => {
  const [currentId, setCurrentId] = useState<number | null>(null);

  return (
    <section id={scss.Attractions}>
      <AttractionList isCurrent={currentId} setIsCurrent={setCurrentId} />
      <AttractionInfo isCurrent={currentId} />
    </section>
  );
};

export default Attractions;
