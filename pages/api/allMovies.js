export default async (req, res) => {
  let URL = "https://seleksi-sea-2023.vercel.app/api/movies";
  try {
    const data = await fetch(URL).then((response) => response.json());

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
