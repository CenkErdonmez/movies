import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setMovies, openAddModal } from "../utilities/movieSlice";
import DeleteModal from "./DeleteModal";
import AddMovieModal from "./AddMovieModal";
import UpdateModal from "./UpdateProductModal";
import ProductCard from "./ProductCard";

function Movies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const isDeleteModalOpen = useSelector(
    (state) => state.movies.isDeleteModalOpen
  );
  const isAddModalOpen = useSelector((state) => state.movies.isAddModalOpen);
  const isUpdateModalOpen = useSelector(
    (state) => state.movies.isUpdateModalOpen
  );
  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=10").then((response) => {
      dispatch(setMovies(response?.data));
    });
  }, []);

  const openAddModalHandler = () => {
    dispatch(openAddModal());
  };

  return (
    <div
      className={`flex container flex-col justify-center items-center mx-auto `}
    >
      {isDeleteModalOpen && selectedMovie && (
        <DeleteModal
          movieId={selectedMovie.id}
          movieTitle={selectedMovie.title}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateModal
          movieId={selectedMovie.id}
          movieTitle={selectedMovie.title}
        />
      )}
      <div className='flex container justify-center w-full items-center gap-4'>
        <button
          className={`${
            isDeleteModalOpen || isUpdateModalOpen ? "hidden" : ""
          } bg-blue-500 text-white px-4 py-2 rounded-md mb-2 md:mb-0 md:mr-2 my-6 `}
          onClick={openAddModalHandler}
        >
          Add Product
        </button>
        <button
          className={`${
            isDeleteModalOpen || isUpdateModalOpen ? "hidden" : ""
          } bg-blue-500 text-white px-4 py-2 rounded-md mb-2 md:mb-0 md:mr-2 my-6 `}
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload Data
        </button>
      </div>
      {isAddModalOpen && <AddMovieModal />}

      <div
        className={`grid grid-cols-12  justify-center items-center w-full gap-4 py-4 px-2 ${
          isDeleteModalOpen || isAddModalOpen || isUpdateModalOpen
            ? "blur "
            : ""
        } `}
      >
        <ProductCard data={movies} setSelectedMovie={setSelectedMovie} />
      </div>
    </div>
  );
}

export default Movies;
