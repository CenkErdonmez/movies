import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { closeDeleteModal, deleteMovie } from "../utilities/movieSlice";
import toast from "react-hot-toast";
const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const closeDeleteModalHandler = () => {
    dispatch(closeDeleteModal());
  };

  const handleDelete = () => {
    dispatch(deleteMovie(props.movieId));
    toast.success("Product Deleted");
    if (id !== undefined) {
      navigate("/");
    }
    closeDeleteModalHandler();
  };

  return (
    <div className='fixed top-100 left-100 mx-auto z-10 inset-0  flex flex-col justify-center items-center gap-4'>
      <div className='flex flex-col bg-white  items-center justify-center py-4 px-4  text-center'>
        <p className='py-4'>Delete Product: {props.movieTitle} ?</p>
        <div className='flex gap-4'>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-green-500'
            onClick={closeDeleteModalHandler}
          >
            Cancel
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-500'
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
