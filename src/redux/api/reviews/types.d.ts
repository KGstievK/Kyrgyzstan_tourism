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

  //! Rewiews

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
    kitchen: number,
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
    id: number
    kitchen: string
    kitchen_review_image: any[]
    comment: string
    rating: number
    nutrition_rating: number
    service_rating: number
    price_rating: number
    atmosphere_rating: number
    created_date: string
    client: number
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
    attractions: number;
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


  //! Reply

  type ReplyAttractionResponse = {
    review: number
    comment: string
    user: number
    created_date: string
  }
  type ReplyAttractionRequest = {
    review: number
    comment: string
    user: number
  }
  type ReplyHotelResponse = {
    review: number
    comment: string
    user: number
    created_date: string
  }
  type ReplyHotelRequest = {
    review: number
    comment: string
    user: number
  }
  type ReplyKitchenResponse = {
    review: number
    comment: string
    user: number
    created_date: string
  }
  type ReplyKitchenRequest = {
    review: number
    comment: string
    user: number
  }
  type ReplyPlaceResponse = {
    review: number
    comment: string
    user: number
    created_date: string
  }
  type ReplyPlaceRequest = {
    review: number
    comment: string
    user: number
  }



  export interface Review {
    [x: string]: number;
    id: number;
    entityId: number | string; 
    client: Client;
    comment: string;
    rating: number
    reviewImages: ReviewImage[];
    createdAt: string; 
    replyReviews: ReplyHotelReview[]
  }

  export interface StaticReview {
    id: number;
    name: string; 
    avgRating: number; 
    ratingCount: number;
    excellent: number;
    good: number;
    notBad: number;
    bad: number;
    terribly: number;
  }

  export interface ReplyHotelReview {
  id: number
  user: Client
  comment: string
  created_date: string
}
}
