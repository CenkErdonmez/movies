import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMovies, deleteMovie } from "./utilities/movieSlice";
function App() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=f2830338ff0c8958449c6468503f8c57"
      )
      .then((response) => {
        dispatch(setMovies(response.data));
      });
  }, []);
  console.log(movies);
  // const handleDelete = (id) => {
  //   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then((response) => {
  //       // Handle successful deletion
  //       console.log(response);
  //       console.log(`Post with ID ${id} deleted successfully.`);
  //       setData((prevData) => prevData.filter((item) => item.id !== id));
  //       // Optionally update the UI by fetching the updated data
  //       // or removing the item from the local state
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error(`Error deleting post with ID ${id}:`, error);
  //     });
  // };
  return <div className='App'></div>;
}

export default App;
