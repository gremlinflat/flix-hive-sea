import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import DashboardShell from "@/components/DashboardShell";
import MovieContainer from "@/components/MovieContainer";
import LoadingState from "@/components/LoadingState";

const Home = () => {
  const { data } = useSWR(["/api/allMovies", null], fetcher);
  return (
    <DashboardShell>
      {data ? <MovieContainer movies={data} /> : <LoadingState />}
    </DashboardShell>
  );
};

export default Home;
