import { useDispatch } from "react-redux";
import { closeDeleteModal, deleteMovie } from "../utilities/movieSlice";

const DeleteModal = ({ movieId, movieTitle }) => {
  const dispatch = useDispatch();

  const closeDeleteModalHandler = () => {
    dispatch(closeDeleteModal());
  };

  const handleDelete = () => {
    dispatch(deleteMovie(movieId));
    closeDeleteModalHandler();
  };

  return (
    <div className='fixed top-24 z-10 inset-0  w-full'>
      <div className='flex items-center justify-center pt-4 px-4 pb-20 text-center'>
        <p>Delete Movie: {movieTitle}?</p>
        <button onClick={closeDeleteModalHandler}>Cancel</button>
        <button onClick={handleDelete}>Confirm</button>
      </div>
    </div>
  );
};

export default DeleteModal;
