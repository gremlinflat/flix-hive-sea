import React from "react";
import MovieCard from "./MovieCard";

const MovieContainer = ({ movies }) => {
  return (
    <div className='container max-w-6xl mx-auto content-center py-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {movies.map((movie) => (
          <MovieCard key={movie.id + movie.title} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieContainer;
