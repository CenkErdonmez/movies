import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  setMovies,
  openDeleteModal,
  openAddModal,
  openUpdateModal,
} from "../utilities/movieSlice";
import DeleteModal from "./DeleteModal";
import AddMovieModal from "./AddMovieModal";
import UpdateModal from "./UpdateProductModal";

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
  const openDeleteModalHandler = (id, title) => {
    setSelectedMovie({ id, title });
    dispatch(openDeleteModal());
  };

  const openAddModalHandler = () => {
    dispatch(openAddModal());
  };

  const openUpdateModalHandler = (id, title) => {
    setSelectedMovie({ id, title });
    dispatch(openUpdateModal());
  };
  console.log(movies);
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
        className={`flex  flex-wrap justify-center items-center py-4 gap-6 mx-auto px-4 container ${
          isDeleteModalOpen || isAddModalOpen || isUpdateModalOpen
            ? "blur "
            : ""
        } `}
      >
        {movies?.movies.products?.map((movie) => (
          <div
            className={`flex flex-col gap-4 rounded-md p-4 bg-white shadow-md w-full md:w-80 self-start`}
            key={movie?.id}
          >
            <h2 className='text-lg md:text-xl font-bold'>{movie?.title}</h2>
            <span className='text-gray-600'>Price: {movie?.price} $</span>
            <img
              src={movie?.thumbnail}
              alt={movie?.title}
              className='w-full h-40 object-cover mb-2'
            />
            <div className='flex flex-col md:flex-row md:justify-between'>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded-md mb-2 md:mb-0 md:mr-2'
                onClick={() => openUpdateModalHandler(movie.id, movie.title)}
              >
                Update
              </button>
              <button
                className='bg-red-500 text-white px-4 py-2 rounded-md'
                onClick={() => openDeleteModalHandler(movie.id, movie.title)}
              >
                Delete
              </button>
            </div>
            <Link
              to={`/details/${movie.id}`}
              className='text-blue-500 hover:underline mt-2 self-center'
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
