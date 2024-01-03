import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { openDeleteModal, openUpdateModal } from "../utilities/movieSlice";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
function ProductCard({ data, setSelectedMovie }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const openDeleteModalHandler = (id, title) => {
    setSelectedMovie({ id, title });
    dispatch(openDeleteModal());
  };
  const openUpdateModalHandler = (id, title) => {
    setSelectedMovie({ id, title });
    dispatch(openUpdateModal());
  };

  return (
    <>
      {data?.movies.products?.map((movie) => (
        <div
          className={`col-span-12 h-full lg:col-span-3 md:col-span-4 sm:col-span-6  flex flex-col gap-4 rounded-md p-4 bg-gray-100 shadow-md  self-start`}
          key={movie?.id}
        >
          <h2 className='text-lg md:text-xl font-bold'>{movie?.title}</h2>

          <img
            src={movie?.thumbnail}
            alt={movie?.title}
            className={`${
              id !== undefined
                ? "lg:h-[500px] md:h-[350px] h-[250px]"
                : "h-full"
            } w-full h-full object-fill mb-2`}
          />
          <span className={`${id !== undefined ? "" : "hidden"}`}>
            Brand : {movie?.brand}{" "}
          </span>
          <p className={`${id !== undefined ? "" : "hidden"}`}>
            Product Description : {movie?.description}{" "}
          </p>
          <div className={`${id !== undefined ? "" : "hidden"}`}>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={10}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {movie.images.map((imageUrl, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={imageUrl}
                    alt={movie?.title}
                    className={`${
                      id !== undefined
                        ? "lg:h-[500px] md:h-[350px] h-[250px]"
                        : "h-full"
                    } w-full h-full object-fill mb-2`}
                  />
                </SwiperSlide>
              ))}

              <div className='swiper-button-next'></div>
              <div className='swiper-button-prev'></div>
            </Swiper>
          </div>
          <span className='text-gray-600'>Price: {movie?.price} $</span>
          <div className='flex flex-col md:flex-row md:justify-between'>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md '
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
          {id !== undefined ? (
            ""
          ) : (
            <Link
              to={`/details/${movie.id}`}
              className='text-blue-500 hover:underline mt-2 self-center'
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
