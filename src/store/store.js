import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../utilities/movieSlice";
export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});
