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
    id?: number;
    client_hotel: ClientHotel;
    hotel: string;
    hotel_review_image: any[];
    comment: string;
    rating: number;
    created_date: string;
  };
  type RewiewHotelRquest = {
    client_hotel: number;
    comment: string;
    hotel: number | null;
    rating: number;
    images: string[];
  };

  type ReviewKitchenResponse = {
    id: number
    client_kitchen: ClientKitchen
    kitchen_region: string
    kitchen_review_image: any[]
    comment: string
    rating: number
    nutrition_rating: number
    service_rating: number
    price_rating: number
    atmosphere_rating: number
    created_at: string
  }
  type ReviewKitchenRequest = {
    client_kitchen: number
    kitchen_region: number
    comment: string
    rating: number
    nutrition_rating: number
    service_rating: number
    price_rating: number
    atmosphere_rating: number
    images: string[]
  }
  // Универсальный отзыв
  export interface Review {
    id: number;
    entityId: number | string; // ID сущности (hotel, kitchen_region, attractions)
    client: Client;
    comment: string;
    rating?: number; // Отсутствует в некоторых данных, добавим опционально
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
