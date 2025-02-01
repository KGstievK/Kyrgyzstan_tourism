import { useState } from "react";
import AttractionList from "./attractionList/AttractionInfo";
import scss from "./Tab_attractions.module.scss";

const Attractions = () => {
  const [currentId, setCurrentId] = useState<number | null>(null);

  return (
    <section id={scss.Attractions}>
      <AttractionList isCurrent={currentId} setIsCurrent={setCurrentId} />
    </section>
  );
};

export default Attractions;
