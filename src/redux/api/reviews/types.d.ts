namespace REVIEWS {
  // Клиент
  export interface Client {
    id: number;
    first_name: string;
    last_name: string;
    user_picture: string | null;
    from_user: string;
  }

  // Изображение
  export interface ReviewImage {
    id: number;
    image: string;
  }

  type RewiewHotelResponse = {
    id: number;
    client: Client;
    hotel: number;
    comment: string;
    hotel_review_image: any[];
    count_like: number;
    reply_hotel_reviews: any[];
  };

  type ReviewAttractionResponse = {
    id: number;
    client: Client;
    attractions: string;
    comment: string;
    attraction_review_image: AttractionReviewImage[];
    count_like: number;
    reply_attraction_reviews: ReplyAttractionReview[];
  };

  type ReviewKitchenResponse = {
    id: number;
    client: Client;
    kitchen_region: string;
    comment: string;
    created_at: string;
    kitchen_review_image: KitchenReviewImage[];
    count_like: number;
    reply_kitchen_reviews: ReplyKitchenReview[];
  };

  type RewiewHotelResponse = {
    id?: number;
    client: Client;
    hotel: string;
    hotel_review_image: any[];
    comment: string;
    rating: number;
    created_date: string;
  };
  type RewiewHotelRequest = {
    client: number;
    comment: string;
    hotel: number | null;
    rating: number;
    images: string[];
  };

  type ReviewKitchenResponse = {
    id: number;
    client: Client;
    kitchen_region: string;
    kitchen_review_image: any[];
    comment: string;
    rating: number;
    nutrition_rating: number;
    service_rating: number;
    price_rating: number;
    atmosphere_rating: number;
    created_at: string;
  };
  type ReviewKitchenRequest = {
    client: number;
    kitchen_region: number;
    comment: string;
    rating: number;
    nutrition_rating: number;
    service_rating: number;
    price_rating: number;
    atmosphere_rating: number;
    images: string[];
  };

  type ReviewAttractionResponse = {
    id: number;
    client: Client;
    attractions: string;
    attraction_review_image: any[];
    comment: string;
    rating: number;
    created_date: string;
  };
  type ReviewAttractionRequest = {
    client: number;
    attractions: number;
    comment: string;
    rating: number;
    images: string[];
  };
  type ReviewPlacesRequest = {
    client: number;
    popular: number;
    comment: string;
    rating: number;
    images: string[];
  };
  type ReviewPlacesResponse = {
    id: number;
    client: Client;
    popular: string;
    review_image: any[];
    comment: string;
    rating: number;
    created_date: string;
  };
  export interface Review {
    [x: string]: number;
    id: number;
    entityId: number | string; // ID сущности (hotel, kitchen_region, attractions)
    client: Client;
    comment: string;
    count_like: number;
    reviewImages: ReviewImage[];
    createdAt: string; // Унифицируем дату
  }

  export interface StaticReview {
    id: number;
    name: string; // kitchen_name, popular_name, name, attraction_name
    avgRating: number; // avg_rating или average_rating
    ratingCount: number;
    excellent: number;
    good: number;
    notBad: number;
    bad: number;
    terribly: number;
  }
}
