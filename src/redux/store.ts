import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import translateSlice from "./translate/translateSlice"
import { weatherApi } from "./weatherApi";
export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[weatherApi.reducerPath]: weatherApi.reducer,
		translate: translateSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware).concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;