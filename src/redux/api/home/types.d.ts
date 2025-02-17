namespace HOME {
  type AttractionsResponse = {
    id: number;
    attraction_name: string;
    region_category: string;
    main_image: any;
    description: string;
    avg_rating: number;
    rating_count: number;
    popular_places: number;
  }[];

  type AttractionsRequest = void;

  type CultureListResponse = {
    id: number;
    culture_name: string;
    culture_description: string;
    culture_image: string;
  }[];

  type CultureListRequest = void;
}
