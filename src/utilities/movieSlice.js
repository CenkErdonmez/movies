import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  isDeleteModalOpen: false,
  isAddModalOpen: false,
  isUpdateModalOpen: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    deleteMovie: (state, action) => {
      state.movies.products = state.movies.products.filter(
        (movie) => movie.id !== action.payload
      );
    },
    addMovie: (state, action) => {
      state.movies.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.movies.products.findIndex(
        (movie) => movie.id === updatedProduct.id
      );
      if (index !== -1) {
        // Use spread operator to create a new object with updated properties
        state.movies.products[index] = {
          ...state.movies.products[index],
          title: updatedProduct.title,
          price: updatedProduct.price,
          thumbnail: updatedProduct.thumbnail,
        };
      }
    },
    openDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
    },
    openAddModal: (state) => {
      state.isAddModalOpen = true;
    },
    closeAddModal: (state) => {
      state.isAddModalOpen = false;
    },
    openUpdateModal: (state) => {
      state.isUpdateModalOpen = true;
    },
    closeUpdateModal: (state) => {
      state.isUpdateModalOpen = false;
    },
  },
});

export const {
  setMovies,
  addMovie,
  updateProduct,
  deleteMovie,
  openDeleteModal,
  closeDeleteModal,
  openAddModal,
  closeAddModal,
  openUpdateModal,
  closeUpdateModal,
} = movieSlice.actions;
export default movieSlice.reducer;
