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
      providesTags: (result, error, { entityType }) =>
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
          client: item.client,
          comment: item.comment || item.comment,
          rating: item.rating,
          count_like: item.count_like || 0,
          reviewImages:
            item.hotel_review_image ||
            item.kitchen_review_image ||
            item.review_image ||
            item.attraction_review_image ||
            [],
          createdAt: item.created_at || item.created_date,
          replyReviews:
            item.reply_hotel_reviews?.map((reply: any) => ({
              id: reply.id,
              user: reply.user,
              comment: reply.comment,
            })) ||
            item.reply_attraction_reviews?.map((reply: any) => ({
              id: reply.id,
              user: reply.user,
              comment: reply.comment,
            })) ||
            item.reply_kitchen_reviews?.map((reply: any) => ({
              id: reply.id,
              user: reply.user,
              comment: reply.comment,
            })) ||
            item.reply_popular_places?.map((reply: any) => ({
              id: reply.id,
              user: reply.user,
              comment: reply.comment,
            })) ||
            [],
        }));
      },
    }),

    // GET-запрос для отзывов отелей по ID
    getHotelReviewById: builder.query<REVIEWS.RewiewHotelResponse, number>({
      query: (id) => ({
        url: `/hotels_review_list/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Reviews", id }],
    }),

    // GET-запрос для отзывов достопримечательностей по ID
    getAttractionReviewById: builder.query<
      REVIEWS.ReviewAttractionResponse,
      number
    >({
      query: (id) => ({
        url: `/attraction_review_list/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Reviews", id }],
    }),

    // GET-запрос для отзывов кухонь по ID
    getKitchenReviewById: builder.query<REVIEWS.ReviewKitchenResponse, number>({
      query: (id) => ({
        url: `/kitchen_review_list/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Reviews", id }],
    }),

    postRewiewHotel: builder.mutation<REVIEWS.RewiewHotelResponse, FormData>({
      query: (formData) => ({
        url: "/hotels_review_create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Reviews"],
    }),
    postRewiewKitchen: builder.mutation<
      REVIEWS.ReviewKitchenResponse,
      FormData
    >({
      query: (formData) => ({
        url: "/kitchen_review_create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Reviews"],
    }),
    postRewiewAttraction: builder.mutation<
      REVIEWS.ReviewAttractionResponse,
      FormData
    >({
      query: (formData) => ({
        url: "/attraction_review_create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Reviews"],
    }),
    postRewiewPlaces: builder.mutation<REVIEWS.ReviewPlacesResponse, FormData>({
      query: (formData) => ({
        url: "/popular_places_review_create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Reviews"],
    }),
    postReplyAttraction: builder.mutation<
      REVIEWS.ReplyAttractionResponse,
      FormData
    >({
      query: (formData) => ({
        url: "/reply_attraction_review/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Reviews"],
    }),
    postReplyHotel: builder.mutation<REVIEWS.ReplyHotelResponse, FormData>({
      query: (formData) => ({
        url: "/reply_hotel_reviews/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Reviews"],
    }),
    postReplyKitchen: builder.mutation<REVIEWS.ReplyKitchenResponse, FormData>({
      query: (formData) => ({
        url: "/reply_kitchen_reviews/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Reviews"],
    }),
    postReplyPlace: builder.mutation<REVIEWS.ReplyPlaceResponse, FormData>({
      query: (formData) => ({
        url: "/reply_popular_places/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetStaticReviewsQuery,
  useGetReviewsQuery,
  useGetHotelReviewByIdQuery,
  useGetAttractionReviewByIdQuery,
  useGetKitchenReviewByIdQuery,
  usePostRewiewHotelMutation,
  usePostRewiewKitchenMutation,
  usePostRewiewAttractionMutation,
  usePostRewiewPlacesMutation,
  usePostReplyAttractionMutation,
  usePostReplyHotelMutation,
  usePostReplyKitchenMutation,
  usePostReplyPlaceMutation,
} = api;
