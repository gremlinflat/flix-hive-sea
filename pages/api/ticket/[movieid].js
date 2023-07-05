import { generateMovieIdentifier } from "@/utils/utils";

const handler = async (req, res) => {
  const identifier = req.query.movieid;
  try {
    const data = await fetch(URL).then((response) => response.json());
    const movie = data.filter(
      (movie) => generateMovieIdentifier(movie) === identifier
    );
    res.status(200).json(movie[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
