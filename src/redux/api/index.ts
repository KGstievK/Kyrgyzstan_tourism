import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

// const getLanguage = (): string => {
// 	return localStorage.getItem('lang') || 'en';
// };
const getLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("lang") || "en";
  }
  return null;
};

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/${getLanguage()}`,
  prepareHeaders: (headers) => {
		let token = null;
		const localStorageData = JSON.parse(localStorage.getItem('accessToken')!);
		const SessionStorageData = JSON.parse(sessionStorage.getItem('accessToken')!);
		if (localStorageData) {
			const { access } = localStorageData;
			token = access;
		}
		if (SessionStorageData) {
			const { access } = SessionStorageData;
			token = access;
		}
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		return headers;
	}
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  tagTypes: [
    "auth",
    "region",
    "places",
    "gallery",
    "place",
    "kitchens",
    "hotels",
    "kitchenID",
    "hotelID",
    "attractions",
    "attractionID",
    "games",
    "culture-kitchen",
    "culture-national-clothes",
	"national-instrument",
	"hand-crafts",
	"currency"
  ],
  endpoints: () => ({}),
});
