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

  // Универсальная статистика
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