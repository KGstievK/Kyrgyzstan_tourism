import { FC } from "react";
import scss from "./Stars.module.scss";

interface StarsProps {
  rating?: number;
}

const Stars: FC<StarsProps> = ({ rating = 0 }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className={scss.stars}>
      {stars.map((star) => (
        <div key={star} className={scss.starContainer}>
          <div
            className={scss.starFill}
            style={{
              width: `${
                star <= rating
                  ? 100
                  : star - rating < 1
                  ? (rating - (star - 1)) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Stars;
