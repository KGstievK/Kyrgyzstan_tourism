import { useState, useRef, useEffect } from "react";
import scss from "./HotelHistory.module.scss";
import { useGetHotelsQuery } from "@/redux/api/place";
import Image from "next/image";
import Stars from "@/appPages/site/ui/stars/Stars";
import imgHeart from "@/assets/images/placeImages/Vector.png";
import imgRight from "@/assets/images/placeImages/Arrow_alt_lright.png";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import { BiLike } from "react-icons/bi";
import ReviewsColumn from "@/appPages/site/ui/reviews/reviewsColumn/ReviewsColumn";

interface Hotel {
  id: number;
  name: string;
  main_image: string;
  avg_rating: number;
  rating_count: number;
}

const HotelHistory = () => {
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const { data: hotels = [], isLoading, error } = useGetHotelsQuery();
  const { t } = useTranslate();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Mock data for comments (replace with actual API call)
  const [userComments, setUserComments] = useState([
    {
      id: 1,
      client_hotel: {
        first_name: "John",
        last_name: "Doe",
        user_picture: "/default-user.png",
        from_user: "New York"
      },
      hotel: "Grand Hotel",
      comment: "Amazing stay with excellent service",
      rating: 5,
      created_date: "2025-03-01",
      hotel_review_image: [
        { image: "/image1.jpg" },
        { image: "/image2.jpg" }
      ]
    },
    {
      id: 2,
      client_kitchen: {
        first_name: "Jane",
        last_name: "Smith",
        user_picture: "/default-user.png",
        from_user: "Los Angeles"
      },
      kitchen_region: "Mediterranean Restaurant",
      comment: "Delicious food and great atmosphere",
      rating: 4,
      created_at: "2025-02-15",
      kitchen_review_image: [
        { image: "/kitchen1.jpg" }
      ]
    }
  ]);
  
  const handleImageError = (id: string) => {
    setImageError((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // Function to handle scroll and load more hotels when reaching end
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // If we're near the end of the scroll (within 200px), load more
    if (scrollWidth - (scrollLeft + clientWidth) < 200 && !loadingMore) {
      loadMoreHotels();
    }
  };

  // Simulate loading more hotels (in a real app, this would fetch the next page)
  const loadMoreHotels = () => {
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

  const renderHotelItem = (hotel: Hotel) => (
    <div key={hotel.id} className={scss.item}>
      {imageError[`hotel-${hotel.id}`] ? (
        <div className={scss.imageFallback}>
          <span>
            {t(
              "Изображение не найдено",
              "الصورة غير موجودة",
              "Image not found"
            )}
          </span>
        </div>
      ) : (
        <Image
          src={hotel.main_image}
          alt={hotel.name}
          width={341}
          height={270}
          onError={() => handleImageError(`hotel-${hotel.id}`)}
          style={{ 
            width: '100%', 
            height: 'auto', 
            objectFit: 'cover',
            aspectRatio: '341/270'
          }}
        />
      )}
      <div className={scss.block}>
        <h6>{hotel.name}</h6>
        <div>
          <Stars rating={hotel.avg_rating} width={21} height={21} />
          <span className={scss.review}>
            {hotel.rating_count} {t("отзывов", "تقييمات", "reviews")}
          </span>
        </div>
      </div>
      {imageError[`heart-${hotel.id}`] ? (
        <div className={scss.heartFallback}>♡</div>
      ) : (
        <img
          className={scss.heart}
          src={imgHeart.src}
          alt="favorite"
          onError={() => handleImageError(`heart-${hotel.id}`)}
        />
      )}
      <button>
        {imageError[`right-${hotel.id}`] ? (
          <div className={scss.rightFallback}>→</div>
        ) : (
          <img
            className={scss.right}
            src={imgRight.src}
            alt="select"
            onError={() => handleImageError(`right-${hotel.id}`)}
          />
        )}
      </button>
    </div>
  );

  return (
    <div className={scss.hotelHistory}>
      <div 
        className={scss.list} 
        ref={scrollContainerRef}
      >
        {hotels.map((hotel) => renderHotelItem(hotel))}
        {loadingMore && (
          <div className={scss.loadingItem}>
            <div className={scss.loadingSpinner}>
              <span className={scss.spinnerIcon}>⟳</span>
            </div>
          </div>
        )}
      </div>

      {/* Comments Section */}
      {/* <div className={scss.comentary}>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error loading comments</div>
        ) : !userComments || userComments.length === 0 ? (
          <div>No comments available</div>
        ) : (
          <div className={scss.people}>
            {userComments.map((comment) => {
              // Определяем, относится ли отзыв к отелю или кухне
              const isHotelReview = !!comment.client_hotel;
              const client = comment.client_hotel || comment.client_kitchen;
              const title = comment.hotel || comment.kitchen_region || "Untitled";
              const images = comment.hotel_review_image || comment.kitchen_review_image || [];
              const date = comment.created_date || comment.created_at || "Unknown date";

              return (
                <div key={comment.id} className={scss.person}>
                  <div className={scss.person_image}>
                    <Image
                      src={client?.user_picture || "/default-user.png"}
                      alt="User"
                      width={42}
                      height={42}
                      className={scss.person_imagess}
                    />
                    <div className={scss.person_text}>
                      <h3>{client ? `${client.first_name} ${client.last_name}` : "Anonymous"}</h3>
                      <p>{client?.from_user || "Unknown location"}</p>
                    </div>
                    <div className={scss.likes}>
                      <BiLike /> {comment.rating || 0}
                    </div>
                  </div>

                  <div className={scss.text}>
                    <p>{new Date(date).toLocaleDateString()}</p>
                    <h5>{title}</h5>
                    <span>{comment.comment}</span>
                    {images.length > 0 && (
                      <div className={scss.imagess_2}>
                        {images.map((img, index) => (
                          <Image
                            key={index}
                            src={`${process.env.NEXT_PUBLIC_API_URL || ''}${img.image}`}
                            alt={`review-image-${index}`}
                            width={100}
                            height={100}
                            className={scss.images_1}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div> */}
      {/* <ReviewsColumn /> */}
    </div>
  );
};

export default HotelHistory;