import { useDispatch } from "react-redux";
import { closeUpdateModal, updateProduct } from "../utilities/movieSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateModal = ({ movieId, movieTitle, moviePrice, movieThumbnail }) => {
  const dispatch = useDispatch();
  const isWhitespace = (value) => {
    return /^\s*$/.test(value);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      thumbnail: "",
    },
  });

  const onSubmit = (data, event) => {
    event.preventDefault();
    if (
      isWhitespace(data.title) ||
      isWhitespace(data.price) ||
      isWhitespace(data.thumbnail)
    ) {
      toast.error("Whitespace is not allowed");
      return;
    }
    const id = movieId;
    const dataArr = { ...data, id };
    axios
      .put(`https://dummyjson.com/products/${movieId}`, data)
      .then((response) => {
        console.log(response);
        toast.success("Product Updated");
        dispatch(updateProduct(dataArr));
      });

    dispatch(closeUpdateModal());

    reset();
  };
  const closeModal = () => {
    dispatch(closeUpdateModal());
  };

  return (
    <div className='fixed top-100 left-100 mx-auto z-10 inset-0  flex flex-col justify-center items-center '>
      <div className='flex bg-white items-center justify-center py-4 px-4  text-center'>
        <form
          className='h-full w-full py-12 flex flex-col justify-center items-center '
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-col '>
            <div className='lg:col-span-2 col-span-12 z-10 w-full'>
              <label className='flex flex-col gap-2'>
                <span className='text-md self-start '>Product Title</span>
                <input
                  placeholder={movieTitle}
                  className={`border-2  border-solid  py-[8px] px-[14px] ${
                    errors["title"] ? "border-red-600" : "border-[#ddd]"
                  }`}
                  {...register("title", {
                    required: "Product title is requried",
                  })}
                  aria-invalid={errors["title"] ? "true" : "false"}
                  type='text'
                />
              </label>
              <p
                className={`w-full h-full text-xs pt-2  ${
                  errors["title"] ? "opacity-100 text-red-600" : "opacity-0 "
                }`}
                role='alert'
              >
                {errors["title"] ? errors["title"]?.message : "hidden"}
              </p>
            </div>

            <div className='lg:col-span-2 col-span-12 w-full z-10 '>
              <label className='flex flex-col gap-2'>
                <span className='text-md self-start'>Price</span>
                <input
                  placeholder={moviePrice}
                  className={`border-2 remove-arrow border-solid  py-[8px] px-[14px] ${
                    errors["price"] ? "border-red-600" : "border-[#ddd]"
                  }`}
                  {...register("price", {
                    required: "Price is requried",
                  })}
                  aria-invalid={errors["price"] ? "true" : "false"}
                  type='price'
                />
              </label>
              <p
                className={
                  errors["price"]
                    ? "opacity-100 text-red-600 text-xs pt-2 "
                    : "opacity-0"
                }
                role='alert'
              >
                {errors["price"] ? errors["price"]?.message : "hidden"}
              </p>
            </div>
            <div className='lg:col-span-2 col-span-12 w-full z-10'>
              <label className='flex flex-col gap-2'>
                <span className='text-md self-start'>Image</span>
                <input
                  placeholder={movieThumbnail}
                  className={`border-2  border-solid  py-[8px] px-[14px] ${
                    errors["thumbnail"] ? "border-red-600" : "border-[#ddd]"
                  }`}
                  {...register("thumbnail", {
                    required: "Product image is requried",
                  })}
                  aria-invalid={errors["thumbnail"] ? "true" : "false"}
                  type='text'
                />
              </label>
              <p
                className={`w-full h-full text-xs pt-2  ${
                  errors["thumbnail"]
                    ? "opacity-100 text-red-600"
                    : "opacity-0 "
                }`}
                role='alert'
              >
                {errors["thumbnail"] ? errors["thumbnail"]?.message : "hidden"}
              </p>
            </div>

            <div className='flex justify-around items-center z-10'>
              <button
                onClick={closeModal}
                className='self-end cursor-pointer bg-red-400 p-[22px] h-[40px] text-white flex justify-center items-center outline-none drop-shadow-md border-b border-blue-50 font-bold leading-4 m-2 rounded whitespace-nowrap hover:bg-[#428de8] '
              >
                Cancel
              </button>
              <button
                className='self-end cursor-pointer bg-green-400 p-[22px] h-[40px] text-white flex justify-center items-center outline-none drop-shadow-md border-b border-blue-50 font-bold leading-4 m-2 rounded whitespace-nowrap hover:bg-[#428de8] '
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateModal;
