namespace AUTH {
  type GetResponse = {
    id?: number
    first_name: string;
    last_name: string;
    email: string;
    phone_number: number;
    user_picture: string | null;
    from_user: string;
    cover_photo: string | null;
    birth_date: string
  }[];
  type GetRequest = void;

  type PatchMeResponse = {
    id?: number
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    user_picture?: string | null;
    from_user?: string;
    cover_photo?: string | null;
    birth_date?: string
  }
  type PatchMeRequest = {
    id?: number
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    user_picture?: string | null;
    from_user?: string;
    cover_photo?: string | null;
    birth_date?: string
  }

  type PostLoginResponse = {
    access: string;
    refresh: string;
  };

  type PostLoginRequest = {
    email: string;
    password: string;
  };

  type PostRegistrationResponse = {
    access: string;
    refresh: string;
  };
  type PostRegistrationRequest = {
    email: string
    password: string
    confirm_password: string
    first_name: string
    last_name: string
    phone_number: string
    birth_date: string
  };

  type PostLogoutResponse = {};
  type PostLogoutRequest = void;

  type PatchRefreshResponse = {
    refresh: string
    access: string;
  };
  type PatchRefreshRequest = {
 
    refresh: string
  };

  type PostForgotPasswordResponse = {
    status: string;
  };
  type PostForgotPasswordRequest = {
    email: string;
  };

  type PostResetPasswordResponse = {
    message: string;
  };
  type PostResetPasswordRequest = {
    email: string;
    reset_code: string;
    new_password: string;
  };


  interface Attraction {
    id: number;
    attraction_name: string;
    region_category: string;
    main_image: string;
    description: string;
    popular_places: string[];
    avg_rating: number;
    rating_count: number;
  }
  
  interface PopularRegion {
    id: number;
    popular_name: string;
    popular_image: string;
    region: string;
    avg_rating: number;
    rating_count: number;
  }
  
  interface Gallery {
    id: number;
    gallery_name: string;
    gallery_image: string;
    address: string;
    avg_rating: number;
    rating_count: number;
  }
  
  interface Hotel {
    id: number;
    name: string;
    main_image: string;
    avg_rating: number;
    rating_count: number;
    region: string;
    popular_places: string[];
  }
  
  interface FavoriteItem {
    id: number;
    attractions?: Attraction;
    popular_region?: PopularRegion;
    gallery?: Gallery;
    hotels?: Hotel;
  }

  export interface Client {
    first_name: string;
    last_name: string;
    id: number;
    from_user: string;
    user_picture: string | null;
  }
  
  export interface ReviewImage {
    id: number;
    image: string;
  }
  
  export interface UserComment {
    id: number;
    comment: string;
    rating: number;
    created_date?: string; // Для отзывов об отелях
    created_at?: string;   // Для отзывов о кухне
    client_hotel?: Client;
    client_kitchen?: Client;
    hotel?: string;
    kitchen_region?: string;
    hotel_review_image?: ReviewImage[];
    kitchen_review_image?: ReviewImage[];
    atmosphere_rating?: number | null;
    nutrition_rating?: number | null;
    price_rating?: number | null;
    service_rating?: number | null;
  }
}
