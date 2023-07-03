import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  getMonthAndYearOnly,
  getAgeRatingColor,
  generateMovieIdentifier,
} from "@utils/utils";

const MovieCard = ({ movie }) => {
  const router = useRouter();

  const handleClick = () => {
    const movieId = generateMovieIdentifier(movie);
    router.push(`/movie/${movieId}`);
  };

  return (
    <div
      className='card bg-base-100 shadow-xl relative'
      // onClick={handleClick}
    >
      <figure className='relative group'>
        <Image
          src={movie.poster_url}
          alt={movie.title}
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: "100%", height: "auto" }}
        />
        <div
          className={`badge badge-${getAgeRatingColor(
            movie.age_rating
          )} badge-s absolute top-2 right-2 text-md font-bold`}
        >
          {movie.age_rating}+
        </div>
        <div className='description-overlay absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center'>
          <div className='bg-black bg-opacity-80 py-4 px-4 rounded w-full h-full'>
            <p className='text-white text-lg h-full overflow-hidden'>
              <span className='text-ellipsis max-w-full line-clamp-[10]'>
                {movie.description}
              </span>
            </p>
          </div>
        </div>
      </figure>
      <div className='card-body p-4 gap-0'>
        <h2 className='card-title'>{movie.title}</h2>
        <p className='text-secondary'>
          Aired on {getMonthAndYearOnly(movie.release_date)}
        </p>
      </div>
      <div className='card-actions flex items-center justify-between px-4 py-3'>
        <div>
          <div className='text-primary text-lg font-bold'>
            IDR {movie.ticket_price}
          </div>
          <div className='text-sm'>per ticket</div>
        </div>
        <button className='btn btn-primary' onClick={handleClick}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
