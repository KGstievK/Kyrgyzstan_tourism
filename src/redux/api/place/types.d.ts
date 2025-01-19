
namespace PLACE {
    type PlaceResponse = {
        popular_name: string;
        popular_image: string;
        description: string;
        popular_reviews: any[]; 
    }

    type PlaceRequest = number

    type KitchenResponse = {
        id: number; 
        kitchen_name: string; 
        price: number; 
        type_of_cafe: string[]; 
        average_rating: number; 
        rating_count: number; 
        main_image: string; 
    }[]

    type KitchenRequest = void

    type KitchenLocationResponse = {
        id: number;
        address: string;
        Website: string;
        email: string;
        phone_number: string;
        kitchen: string;
    }
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
    }

    type kitchenIdRequest = number | null


 }