namespace PLACE {
  // ----------------------------------------------------------------------------------------------
  // ts types for place
  type PlaceResponse = {
    popular_name: string;
    popular_image: string;
    description: string;
    popular_reviews: any[];
    latitude: string,
    longitude: string
  };

  type PlaceRequest = number;
  // ----------------------------------------------------------------------------------------------
  // ts types for kitchen
  type KitchenResponse = {
    id: number;
    kitchen_name: string;
    price: number;
    popular_places: number;
    kitchen_region: string;
    type_of_cafe: string[];
    average_rating: number;
    rating_count: number;
    main_image: string;
  }[];

  type KitchenRequest = void;

  type KitchenLocationResponse = {
    id: number;
    address: string;
    Website: string;
    email: string;
    phone_number: string;
    kitchen: string;
    latitude: number;
    longitude: number
  };
  type kitchenIdResponse = {
    id: number;
    kitchen_name: string;
    main_image: string | null;
    kitchen_image: {
      id: number;
      image: string;
    }[];
    price: number;
    specialized_menu: string;
    meal_time: string[];
    description: string;
    average_rating: number;
    rating_count: number;
    nutrition_rating: number;
    service_rating: number;
    price_rating: number;
    atmosphere_rating: number;
    kitchen: KitchenLocation[];
  };

  type kitchenIdRequest = number | null;
  // ----------------------------------------------------------------------------------------------
  // ts types for hotel
  type HotelsResponse = {
    id: number
    name: string
    main_image: string
    avg_rating: number
    rating_count: number
    region: string
    popular_places: number
  }[];

  type HotelsRequest = void;

  type HotelReviewImage = {
    id: number;
    image: string;
  };

  type ClientHotel = {
    id: number;
    first_name: string;
    last_name: string;
    user_picture: string | null;
    from_user: string;
  };

  type HotelReview = {
    client_hotel: ClientHotel;
    hotel: number;
    comment: string;
    static: string;
    avg_rating: number;
    rating_count: number;
    hotel_review_image: HotelReviewImage[];
  };

  type HotelIDResponse = {
    id: number;
    name: string | undefined;
    hotel_image: {
      id: number;
      image: string
    }[];
    address: string;
    description: string;
    bedroom: number;
    bathroom: number;
    cars: number;
    bikes: number;
    pets: number;
    amenities: Array<{
      id: string
      amenity: string
      title: string
      icon: string
    }>
    safety_and_hygiene: string[];
    price_short_period: number;
    price_medium_period: number;
    price_long_period: number;
    hotel_reviews: HotelReview[];
  };

  type HotelIDRequest = number | null;

  type AttractionIDResponse = {
    id: number
    attraction_name: string
    main_image: string | null
    popular_places: number
    image: Image[] 
    description: string
    rating_count: number
    rank: string,
    type_attraction: string
  }

  type AttractionIDRequest = number | null
  
  type Image = {
    id: number
    image: string
  }

  type EventListResponse = {
    id: number
    title: string
    image: any
    category: {
      id: number
      category: string
    }
    date: string
    time: string
    address: string
    price: number
    ticket: string
  }[]

  type EventListRequest = {
    category: string,
    search: string,
    date: string,
    ticket: string
  }
}
