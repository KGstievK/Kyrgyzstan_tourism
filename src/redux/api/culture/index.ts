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
    getCultureKitchen: build.query<ATTRACTIONS.CultureKitchenResponse, ATTRACTIONS.CultureKitchenRequest>({
      query: () => ({
        url: `/culture_kitchen`,
        method: "GET",
      }),
      providesTags: ["culture-kitchen"],
    }),
    getCultureNationalClothes: build.query<ATTRACTIONS.CultureNationalClothesResponse, ATTRACTIONS.CultureNationalClothesRequest>({
      query: () => ({
        url: `/national_clothes`,
        method: "GET",
      }),
      providesTags: ["culture-national-clothes"],
    })
  }),

});

export const { useGetGamesQuery, useGetCultureKitchenQuery, useGetCultureNationalClothesQuery } = api;