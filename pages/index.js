import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import DashboardShell from "@/components/DashboardShell";

const Home = () => {
  const { data } = useSWR("/api/allMovies", fetcher);
  console.log(data);
  return (
    <DashboardShell>
      <div className='flex flex-col items-center justify-center w-full h-full'>
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
      </div>
    </DashboardShell>
  );
};

export default Home;
