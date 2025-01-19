namespace REGION_LIST {
    type WhatToTryItemResponse = {
        to_name: string;
        first_description: string,
        second_description: string,
        image: string; 
    }[]
    
    type WhatToTryItemRequest = void
    
    type PopularResponse = {
        id: number
        popular_name: string
        popular_image: string
        avg_rating: number
        rating_count: number
        region: string
    }[]
    type PopularRequest = void
    
    type RegionResponse = {
        id: number
        region_name: string
        region_image: string
        region_description: string
        What_to_try: WhatToTryItemResponse
        popular_places: PopularResponse
        region_category: string
    
    }[]

    type RegionRequest = void
    
    
    type PopularItem = {
        popular_name: string;
        popular_image: string;
        description: string;
        popular_reviews: any[]; // Массив отзывов, если тип отзывов известен, можно заменить any на более точный тип
    }
     
}