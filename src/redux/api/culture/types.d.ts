namespace ATTRACTIONS {
  type GamesResponse = {
    id: number;
    culture: {
      id: number;
      culture_name: string;
    };
    games_name: string;
    games_description: string;
    games_image: string;
  }[];
  type GamesRequest = void;

  type CultureKitchenResponse = {
    id: number;
    culture: {
      id: number;
      culture_name: string;
    };
    kitchen_name: string;
    kitchen_description: string;
    kitchen_image: CultureKitchenImage[];
  }[];
 type CultureKitchenImage = {
    id: number
    image: string
  }

  type CultureKitchenRequest = void;

  type CultureNationalClothesResponse = {
    id: number
    culture: number
    clothes_name: string
    clothes_description: string
    clothes_image: string
  }[]

  type CultureNationalClothesRequest = void;

}
