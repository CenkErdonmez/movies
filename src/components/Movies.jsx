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
    <div className='flex container flex-col  justify-center items-center '>
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
      <button
        className={isDeleteModalOpen || (isUpdateModalOpen && "hidden")}
        onClick={openAddModalHandler}
      >
        Add Product
      </button>
      {isAddModalOpen && <AddMovieModal />}

      {movies?.movies.products?.map((movie) => (
        <div
          className={`${
            isDeleteModalOpen || isAddModalOpen || isUpdateModalOpen
              ? "blur "
              : ""
          } flex  flex-col gap-6`}
          key={movie?.id}
        >
          <h2 className='bg-red-500 text-green-400'>{movie?.title}</h2>
          <span>{movie?.price} </span>
          <img src={movie?.thumbnail} />
          <button onClick={() => openUpdateModalHandler(movie.id, movie.title)}>
            Update
          </button>
          <button onClick={() => openDeleteModalHandler(movie.id, movie.title)}>
            Delete
          </button>
          <Link to={`/details/${movie.id}`}>Details</Link>
        </div>
      ))}
    </div>
  );
}

export default Movies;
