import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { closeDeleteModal, deleteMovie } from "../utilities/movieSlice";

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const closeDeleteModalHandler = () => {
    dispatch(closeDeleteModal());
  };

  const handleDelete = () => {
    dispatch(deleteMovie(props.movieId));
    if (id !== undefined) {
      navigate("/");
    }
    closeDeleteModalHandler();
  };

  return (
    <div className='fixed top-24 z-10 inset-0  '>
      <div className='flex flex-col bg-white  items-center justify-center pt-4 px-4 pb-20 text-center'>
        <p className='py-4'>Delete Product: {props.movieTitle} ?</p>
        <div className='flex gap-4'>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md'
            onClick={closeDeleteModalHandler}
          >
            Cancel
          </button>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-md'
            onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
