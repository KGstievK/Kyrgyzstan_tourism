namespace REGION_LIST {
  type WhatToTryItemResponse = {
    to_name: string;
    first_description: string;
    second_description: string;
    image: string;
  }[];

  type WhatToTryItemRequest = void;

  type FavoriteResponse = {
    id: number;
    attractions?: number;
    popular_place?: number;
    kitchen?: number;
    hotels?: number;
    like: boolean;
    created_date: string;
  };

  type FavoriteRequest = {
    attractions?: number;
    popular_place?: number;
    kitchen?: number;
    hotels?: number;
    like: boolean;
  };

  type AttractionList = {
    id: number;
    attraction_name: string;
    region_category: string;
    main_image?: string;
    description: string;
    popular_places?: string;
    avg_rating?: number;
    rating_count?: number;
  };

  type PopularPlacesList = {
    id: number;
    popular_name: string;
    popular_image?: string;
    region: string;
    avg_rating?: number;
    rating_count?: number;
    address?: string;
  };

  type KitchenList = {
    id: number;
    kitchen_name: string;
    price: number;
    popular_places?: string;
    kitchen_region: string;
    type_of_cafe: string;
    average_rating?: number;
    rating_count?: number;
    main_image?: string;
  };

  type HotelsList = {
    id: number;
    name: string;
    main_image?: string;
    avg_rating?: number;
    rating_count?: number;
    region: string;
    popular_places: string;
    latitude?: number;
    longitude?: number;
  };

  type GetFavoriteResponse = {
    id: number;
    user: number;
    attractions?: AttractionList[];
    popular_place?: PopularPlacesList;
    kitchen?: KitchenList[];
    hotels?: HotelsList[];
    like?: boolean;
    created_date?: string;
  }[];

  type GetFavoriteRequest = void;

  type DeleteFavoriteResponse = void;
  type DeleteteFavoriteRequest = {
    id: number;
  };

  type PopularResponse = {
    id: number;
    popular_name: string;
    popular_image: string;
    avg_rating: number;
    rating_count: number;
    region: string;
  }[];
  type PopularRequest = void;

  type RegionResponse = {
    id: number;
    region_name: string;
    region_image: string;
    region_description: string;
    What_to_try: WhatToTryItemResponse;
    popular_places: PopularResponse;
    region_category: string;
    latitude: string;
    longitude: string;
  };

  type RegionRequest = void;

  type PopularItem = {
    popular_name: string;
    popular_image: string;
    description: string;
    popular_reviews: any[]; // Массив отзывов, если тип отзывов известен, можно заменить any на более точный тип
  };
}
