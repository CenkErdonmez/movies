import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { openDeleteModal, openUpdateModal } from "../utilities/movieSlice";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
function ProductCard({ data, setSelectedMovie }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isDeleteModalOpen = useSelector(
    (state) => state.movies.isDeleteModalOpen
  );
  const isAddModalOpen = useSelector((state) => state.movies.isAddModalOpen);
  const isUpdateModalOpen = useSelector(
    (state) => state.movies.isUpdateModalOpen
  );
  const openDeleteModalHandler = (id, title) => {
    setSelectedMovie({ id, title });
    dispatch(openDeleteModal());
  };
  const openUpdateModalHandler = (id, title, price, thumbnail) => {
    setSelectedMovie({ id, title, price, thumbnail });
    dispatch(openUpdateModal());
  };

  return (
    <>
      {data?.movies?.products?.map((movie) => (
        <div
          className={`container col-span-12 h-full lg:col-span-3 md:col-span-4 sm:col-span-6  flex flex-col mx-auto gap-4 rounded-md p-4 bg-gray-100 shadow-md ${
            isDeleteModalOpen || isAddModalOpen || isUpdateModalOpen
              ? "blur "
              : ""
          } `}
          key={movie?.id}
        >
          <Link
            className={`${
              id !== undefined ? "" : "hidden"
            } cursor-pointer text-blue-600 hover:text-red-400`}
            to={"/"}
          >
            Return to Products
          </Link>
          <h2 className='text-lg md:text-xl font-bold'>{movie?.title}</h2>

          <img
            src={movie?.thumbnail}
            alt={movie?.title}
            className={`${
              id !== undefined
                ? "lg:h-[500px] md:h-[350px] h-[250px]"
                : "h-full"
            } w-full h-full object-contain mb-2 max-h-[250px]`}
          />
          <span className={`${id !== undefined ? "" : "hidden"}`}>
            Brand : {movie?.brand}{" "}
          </span>
          <p className={`${id !== undefined ? "" : "hidden"}`}>
            Product Description : {movie?.description}{" "}
          </p>
          <div className={`${id !== undefined ? "" : "hidden"}  container`}>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={10}
              navigation
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {movie?.images?.map((imageUrl, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={imageUrl}
                    alt={movie?.title}
                    className={`${
                      id !== undefined
                        ? "lg:h-[500px] md:h-[350px] h-[250px]"
                        : "h-full"
                    } w-full object-contain mb-2`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <span className='text-gray-600'>Price: {movie?.price} $</span>
          <div className='flex flex-col md:flex-row md:justify-between gap-2'>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-500 '
              onClick={() =>
                openUpdateModalHandler(
                  movie.id,
                  movie.title,
                  movie.price,
                  movie.thumbnail
                )
              }
            >
              Update
            </button>
            <button
              className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-green-500'
              onClick={() => openDeleteModalHandler(movie.id, movie.title)}
            >
              Delete
            </button>
          </div>
          {id !== undefined ? (
            ""
          ) : (
            <Link
              to={`/details/${movie?.id}`}
              className='text-blue-500 hover:underline mt-2 self-center hover:text-red-400'
            >
              Details
            </Link>
          )}
        </div>
      ))}
    </>
  );
}

export default ProductCard;
