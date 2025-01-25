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
}
