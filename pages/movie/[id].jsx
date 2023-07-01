import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import DashboardShell from "@/components/DashboardShell";
import LoadingState from "@/components/LoadingState";

const MovieScreen = ({ id }) => {
  const router = useRouter();
  const identifier = router.query.id;
  const { data } = useSWR(`/api/movie/${identifier}`, fetcher);
  return (
    <DashboardShell>
      {data ? <h1>{data.title}</h1> : <LoadingState />}
    </DashboardShell>
  );
};

export default MovieScreen;
