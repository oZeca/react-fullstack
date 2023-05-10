import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import { bookApi } from "./boobkApi";
const store = configureStore({
  reducer: {
    book: bookReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export default store;
