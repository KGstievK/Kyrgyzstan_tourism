import { useState, useRef, useEffect } from "react";
import scss from "./PlaceHistory.module.scss";
import { useGetPopularPlacesQuery } from "@/redux/api/regions";
import Link from "next/link";
import Stars from "@/appPages/site/ui/stars/Stars";
import imgHeart from "@/assets/images/placeImages/Vector.png";
import imgRight from "@/assets/images/placeImages/Arrow_alt_lright.png";
import useTranslate from "@/appPages/site/hooks/translate/translate";

const PlaceHistory = () => {
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const { data } = useGetPopularPlacesQuery();
  const { t } = useTranslate();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Route name for the link - you might need to adjust this based on your routing setup
  const routeName = "places"; 
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/default-image.jpg"; // Replace with your fallback image
  };

  // Function to handle scroll and load more places when reaching end
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // If we're near the end of the scroll (within 200px), load more
    if (scrollWidth - (scrollLeft + clientWidth) < 200 && !loadingMore) {
      loadMorePlaces();
    }
  };

  // Simulate loading more places (in a real app, this would fetch the next page)
  const loadMorePlaces = () => {
    setLoadingMore(true);
    // In a real app, you'd fetch more data here with the next page parameter
    // For this example, we'll just increment the page state to simulate that
    setTimeout(() => {
      setPage(prevPage => prevPage + 1);
      setLoadingMore(false);
    }, 800);
  };

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Loading state
  if (!data) {
    return (
      <div className={scss.placeHistory}>
        <div className={scss.loadingState}>
          <div className={scss.loadingSpinner}>
            <span className={scss.spinnerIcon}>⟳</span>
          </div>
          <p>{t("Загрузка...", "جار التحميل...", "Loading...")}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className={scss.placeHistory}>
        <div className={scss.emptyState}>
          <p>{t("Нет доступных мест", "لا توجد أماكن متاحة", "No places available")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={scss.placeHistory}>
      <div 
        className={scss.list} 
        ref={scrollContainerRef}
      >
        {data.map((place, i) => (
          <div key={i} className={scss.item}>
            <img 
              src={place.popular_image} 
              alt="popular place" 
              onError={handleImageError}
            />
            <div className={scss.block}>
              <h6>{place.popular_name}</h6>
              <div>
                <span className={scss.grade}>{place.avg_rating}</span>
                <div className={scss.stars}>
                  <Stars rating={place.avg_rating} width={9} height={9} />
                </div>
                <span className={scss.review}>
                  {place.rating_count} {t("Отзывы", "مراجعات", "reviews")}
                </span>
              </div>
            </div>
            <img 
              className={scss.heart} 
              src={imgHeart.src} 
              alt="like" 
              onError={handleImageError}
            />
          </div>
        ))}
        {loadingMore && (
          <div className={scss.loadingItem}>
            <div className={scss.loadingSpinner}>
              <span className={scss.spinnerIcon}>⟳</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceHistory;