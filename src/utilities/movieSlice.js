import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    setMovies: (state, action) => {
      return action.payload;
    },
    deleteMovie: (state, action) => {
      return state.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { setMovies, deleteMovie } = movieSlice.actions;
export default movieSlice.reducer;
