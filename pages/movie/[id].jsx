import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import fetcher from "@/utils/fetcher";
import DashboardShell from "@/components/DashboardShell";
import LoadingState from "@/components/LoadingState";
import { getAgeRatingColor, getMonthDateAndYearOnly } from "@/utils/utils";
import SeatPicker from "@/components/SeatPicker";
import RecentOrder from "@/components/RecentOrder";

const MovieScreen = () => {
  const router = useRouter();
  const identifier = router.query.id;
  const { data } = useSWR([`/api/movie/${identifier}`, null], fetcher);
  const { data: ticketData, mutate: mutateTicketData } = useSWR(
    [`/api/ticket/${identifier}`, null],
    fetcher
  );

  if (!data) {
    return (
      <DashboardShell>
        <LoadingState />
      </DashboardShell>
    );
  }

  const {
    title,
    poster_url,
    age_rating,
    release_date,
    description,
    ticket_price,
  } = data;

  const onCheckout = async () => {
    const response = await fetch(`/api/ticket/${identifier}`).then((res) =>
      res.json()
    );
    console.log(response);
    mutateTicketData(response);
  };

  return (
    <DashboardShell>
      <div className='bg-base-100 px-4 py-8 md:px-8 md:py-12'>
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-1/3 mb-4 md:mb-0 md:ml-4'>
            <div className=' overflow-hidden flex items-center justify-center'>
              <Image
                className='rounded-lg'
                src={poster_url}
                alt={title}
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className='flex items-center mt-4'>
              <div
                className={`bg-${getAgeRatingColor(
                  age_rating
                )} text-white px-2 py-1 rounded font-bold text-sm`}
              >
                {age_rating}+
              </div>
              <p className='text-gray-300 md:text-l text-md font-medium ml-4'>
                Released on {getMonthDateAndYearOnly(release_date)}
              </p>
            </div>
            <div className='flex items-center mt-2'>
              <h2 className='text-gray-300 text-xl md:text-2xl'>
                <span className='text-primary font-bold'>
                  IDR {ticket_price}
                </span>
              </h2>
            </div>
          </div>
          <div className='md:w-2/3 md:ml-6'>
            <h1 className='lg:text-3xl text-2xl font-bold mb-4'>{title}</h1>
            <div className='bg-black bg-opacity-20 rounded-lg p-4'>
              <p className='text-white leading-relaxed'>{description}</p>
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <h2 className='lg:text-3xl text-2xl font-bold mb-4'>Seat Picker</h2>
          <SeatPicker
            ticket_price={ticket_price}
            movie_id={identifier}
            ticket_data={ticketData}
            min_age={parseInt(age_rating)}
            onCheckout={onCheckout}
          />
        </div>
        <div className='mt-8'>
          <h2 className='lg:text-3xl text-2xl font-bold mb-4'>Recent Orders</h2>
          <RecentOrder ticket_data={ticketData} />
        </div>
      </div>
    </DashboardShell>
  );
};

export default MovieScreen;
