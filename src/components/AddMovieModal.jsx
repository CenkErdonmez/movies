import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeAddModal, addMovie } from "../utilities/movieSlice";
import axios from "axios";
import toast from "react-hot-toast";

const AddMovieModal = () => {
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
      description: "",
      thumbnail: "",
    },
  });

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const onSubmit = (data) => {
    const randomId = generateRandomId();
    const movieDataWithId = { ...data, id: randomId };
    if (
      isWhitespace(data.title) ||
      isWhitespace(data.price) ||
      isWhitespace(data.thumbnail) ||
      isWhitespace(data.description)
    ) {
      toast.error("Whitespace is not allowed");
      return;
    }
    axios.post("https://dummyjson.com/products/add", data).then((response) => {
      console.log(response);
      toast.success("Product Added");
      dispatch(addMovie(movieDataWithId));
    });

    dispatch(closeAddModal());

    reset();
  };

  const closeModal = () => {
    dispatch(closeAddModal());
  };

  return (
    <div className='fixed top-100 left-100 mx-auto z-10 inset-0  flex flex-col justify-center items-center '>
      <div className='flex items-center justify-center pt-4 px-4 pb-20 text-center' />

      <div className=' bg-white p-8 mx-auto my-16 rounded-lg w-96'>
        <form
          className='h-full w-full py-12 flex flex-col justify-center items-center '
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-col '>
            <div className='lg:col-span-2 col-span-12 w-full'>
              <label className='flex flex-col gap-2'>
                <span className='text-md'>Product Title</span>
                <input
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
                <span className='text-md'>Price</span>
                <input
                  className={`border-2 remove-arrow border-solid  py-[8px] px-[14px] ${
                    errors["price"] ? "border-red-600" : "border-[#ddd]"
                  }`}
                  {...register("price", {
                    required: "Price is requried",
                  })}
                  aria-invalid={errors["price"] ? "true" : "false"}
                  type='number'
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
                <span className='text-md'>Product Description</span>
                <input
                  className={`border-2  border-solid  py-[8px] px-[14px] ${
                    errors["description"] ? "border-red-600" : "border-[#ddd]"
                  }`}
                  {...register("description", {
                    required: "Product description is requried",
                  })}
                  aria-invalid={errors["description"] ? "true" : "false"}
                  type='text'
                />
              </label>
              <p
                className={`w-full h-full text-xs pt-2  ${
                  errors["description"]
                    ? "opacity-100 text-red-600"
                    : "opacity-0 "
                }`}
                role='alert'
              >
                {errors["description"]
                  ? errors["description"]?.message
                  : "hidden"}
              </p>
            </div>

            <div className='lg:col-span-2 col-span-12 w-full z-10'>
              <label className='flex flex-col gap-2'>
                <span className='text-md'>Image</span>
                <input
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
                className={`w-full h-full text-xs pt-2 font-raleway ${
                  errors["thumbnail"]
                    ? "opacity-100 text-red-600"
                    : "opacity-0 "
                }`}
                role='alert'
              >
                {errors["thumbnail"] ? errors["thumbnail"]?.message : "hidden"}
              </p>
            </div>

            <div className='flex justify-around gap-2 z-10'>
              <button
                onClick={closeModal}
                className='self-end cursor-pointer bg-red-400 p-[22px] h-[40px] text-white flex justify-center items-center outline-none drop-shadow-md border-b border-blue-50 font-bold leading-4 m-2 rounded whitespace-nowrap hover:bg-blue-500 '
              >
                Cancel
              </button>
              <button
                className='self-end cursor-pointer bg-[#24bbc4] p-[22px] h-[40px] text-white flex justify-center items-center outline-none drop-shadow-md border-b border-blue-50 font-bold leading-4 m-2 rounded whitespace-nowrap hover:bg-green-500 '
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

export default AddMovieModal;
