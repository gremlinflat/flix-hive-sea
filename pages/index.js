import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const Home = () => {
  const { data } = useSWR("/api/allMovies", fetcher);
  console.log(data);
  return (
    <div>
      <Head>
        <title>FlixHive</title>
        <meta name='description' content='Cinema Tix' />
      </Head>
      <h1 className='text-3xl font-bold underline'>Hello world! </h1>
      {data ? (
        <div className='grid grid-cols-3 gap-4'>
          {data.map((movie) => (
            <div key={movie.id}>
              <Image
                src={movie.poster_url}
                alt={movie.title}
                width={300}
                height={300}
              />
              <h2>{movie.title}</h2>
              <p>{movie.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <footer>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by FlixHive - Gremlinflat_
        </a>
      </footer>
    </div>
  );
};

export default Home;
