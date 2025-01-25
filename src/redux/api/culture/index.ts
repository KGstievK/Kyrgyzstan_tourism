import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getGames: build.query<ATTRACTIONS.GamesResponse, ATTRACTIONS.GamesRequest>({
      query: () => ({
          url: `/games`,
          method: "GET",
        }),
        providesTags: ["games"],
      },
    ),
  }),
});

export const { useGetGamesQuery } = api;