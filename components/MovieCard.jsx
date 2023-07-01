import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className='card shadow-lg compact bg-base-100'>
      <figure>
        <img
          src={movie.poster_url}
          alt={movie.title}
          className='rounded-t-lg'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{movie.title}</h2>
        <p className='card-subtitle'>{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
