import { generateMovieIdentifier } from "@/utils/utils";

export default async (req, res) => {
  let URL = "https://seleksi-sea-2023.vercel.app/api/movies";
  const identifier = req.query.id;
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
