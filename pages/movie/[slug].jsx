import React from "react";
import { useRouter } from "next/router";

const MovieScreen = ({ slug }) => {
  const router = useRouter();
  const data = router.query.slug;
  return (
    <div>
      <h1>{data}</h1>
      {/* <h1>{movie.title}</h1>
      <h2>{movie.desription}</h2> */}
    </div>
  );
};

export default MovieScreen;
