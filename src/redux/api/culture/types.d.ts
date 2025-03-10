namespace CULTURE {
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
    culture_kitchen_image: CultureKitchenImage[];
  }[];

  type CultureKitchenImage = {
    id: number;
    image: string;
  };

  type CultureKitchenRequest = void;

  type CultureKitchenMainResponse = {
    id: number;
    culture: {
      id: number;
      culture_name: string;
    };
    title: string;
    description: string;
    image_1?: string;
    image_2?: string;
    image_3?: string;
    image_4?: string;
  }[];

  type CultureNationalClothesResponse = {
    id: number;
    culture: number;
    clothes_name: string;
    clothes_description: string;
    clothes_image: string;
  }[];

  type CultureNationalClothesRequest = void;

  type CultureHand_craftsResponse = {
    id: number;
    culture: {
      id: number;
      culture_name: string;
    };
    hand_name: string;
    hand_description: string;
    hand_image: string;
  }[];

  type CultureHand_craftsRequest = void;

  type CultureNationalInstrumentsResponse = {
    id: number;
    culture: {
      id: number;
      culture_name: string;
    };
    national_name: string;
    national_description: string;
    national_image: string;
  }[];

  type CultureNationalInstrumentsRequest = void;

  type CurrencyResponse = {
    id: number;
    culture: Culture;
    currency_name: string;
    currency_description: CurrencyDescription[];
    currency_image: CurrencyImage[];
  }[];

  type CurrencyRequest = void;

  export interface Culture {
    id: number;
    culture_name: string;
  }

  export interface CurrencyDescription {
    description: string;
  }

  export interface CurrencyImage {
    front_image: string;
    back_image: string;
  }
}
