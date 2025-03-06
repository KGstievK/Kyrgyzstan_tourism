import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    // Статистика
    getStaticReviews: builder.query<
      REVIEWS.StaticReview[],
      { entityType: string }
    >({
      query: ({ entityType }) => ({
        url: `/${entityType}_review_static`,
        method: "GET",
      }),
      providesTags: (result, error, { entityType}) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "StaticReviews" as const,
                id: `${entityType}-${id}`,
              })),
              { type: "StaticReviews", id: entityType },
            ]
          : [{ type: "StaticReviews", id: entityType }],
      transformResponse: (response: any[]): REVIEWS.StaticReview[] => {
        return response.map((item) => ({
          id: item.id,
          name:
            item.kitchen_name ||
            item.popular_name ||
            item.name ||
            item.attraction_name,
          avgRating: item.avg_rating || item.average_rating || 0,
          ratingCount: item.rating_count || 0,
          excellent: item.excellent || 0,
          good: item.good || 0,
          notBad: item.not_bad || 0,
          bad: item.bad || 0,
          terribly: item.terribly || 0,
        }));
      },
    }),

    

    getReviews: builder.query<
      REVIEWS.Review[],
      { entityType: string; rating?: string; month?: string }
    >({
      query: ({ entityType, rating, month }) => ({
        url: `/${entityType}_review_list`,
        method: "GET",
        params: { rating, month },
      }),
      providesTags: (result, error, { entityType }) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Reviews" as const,
                id: `${entityType}-${id}`,
              })),
              { type: "Reviews", id: entityType },
            ]
          : [{ type: "Reviews", id: entityType }],
      transformResponse: (response: any[]): REVIEWS.Review[] => {
        return response.map((item) => ({
          id: item.id,
          entityId:
            item.hotel || item.kitchen_region || item.attractions || "unknown",
          client:
            item.client_hotel ||
            item.client_kitchen ||
            item.client ||
            item.client_home,
          comment: item.comment || item.attraction_comment,
          rating: item.rating,
          reviewImages:
            item.hotel_review_image ||
            item.kitchen_review_image ||
            item.review_image ||
            item.attraction_review_image ||
            [],
          createdAt: item.created_at || item.created_date,
        }));
      },
    }),
    postRewiewHotel: builder.mutation<REVIEWS.RewiewHotelResponse, FormData>({
      query: (formData) => ({
        url: '/hotels_review_create/',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ["Reviews"]
    })
  }),
});
export const { useGetStaticReviewsQuery, useGetReviewsQuery, usePostRewiewHotelMutation } = api;
