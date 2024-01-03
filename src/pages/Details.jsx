import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteModal from "../components/DeleteModal";
import UpdateModal from "../components/UpdateProductModal";
function Details() {
  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(id);
  const isDeleteModalOpen = useSelector(
    (state) => state.movies.isDeleteModalOpen
  );
  const isUpdateModalOpen = useSelector(
    (state) => state.movies.isUpdateModalOpen
  );
  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then((response) => {
      console.log(response);
    });
  }, []);
  const movies = useSelector((state) => state.movies);

  const filteredProduct = movies?.movies?.products?.filter(
    (item) => item.id == id
  );
  const updatedMovies = {
    ...movies,
    movies: { ...movies.movies, products: filteredProduct },
  };
  console.log(updatedMovies);
  return (
    <>
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
      <ProductCard data={updatedMovies} setSelectedMovie={setSelectedMovie} />
    </>
  );
}

export default Details;
