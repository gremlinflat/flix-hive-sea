import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import DashboardShell from "@/components/DashboardShell";
import LoadingState from "@/components/LoadingState";
import Image from "next/image";
import { getMonthDateAndYearOnly } from "@/utils/utils";
const MovieScreen = ({ id }) => {
  const router = useRouter();
  const identifier = router.query.id;
  const { data } = useSWR(`/api/movie/${identifier}`, fetcher);

  if (!data) {
    return <LoadingState />;
  }

  const {
    title,
    poster_url,
    age_rating,
    release_date,
    description,
    ticket_price,
  } = data;

  return (
    <DashboardShell>
      <div className='bg-base-100 min-h-screen px-8 py-12'>
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-1/3'>
            <div className='rounded-lg overflow-hidden mb-6'>
              <Image src={poster_url} alt={title} width={600} height={900} />
            </div>
            <div className='flex items-center mb-2'>
              <span className='bg-success text-white px-2 py-1 rounded font-bold text-sm'>
                {age_rating}+
              </span>
              <p className='text-gray-300 text-xl font-medium ml-4'>
                Released on {getMonthDateAndYearOnly(release_date)}
              </p>
            </div>
            <div className='flex items-center mb-2'>
              <h2 className='text-gray-300 text-2xl'>
                <span className='text-primary font-bold'>
                  {" "}
                  IDR {ticket_price}
                </span>
              </h2>
            </div>
          </div>
          <div className='md:w-2/3 md:ml-12'>
            <h1 className='text-3xl font-bold mb-4'>{title}</h1>
            <div className='bg-black bg-opacity-20 rounded-lg p-4'>
              <p className='text-white leading-relaxed'>{description}</p>
            </div>
          </div>
        </div>
        <div className='mt-12'>
          <h2 className='text-2xl font-bold mb-4'>Seat Picker</h2>
          {/* Place your seat picker component here */}
          <div className='w-full'>
            <div className='bg-white shadow-md rounded my-6'>
              <table className='min-w-max w-full table-auto'>
                <thead>
                  <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                    <th className='py-3 px-6 text-left'>Seat Number</th>
                    <th className='py-3 px-6 text-center'>Status</th>
                  </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light'>
                  <tr className='border-b border-gray-200 hover:bg-gray-100'>
                    <td className='py-3 px-6 text-left whitespace-nowrap'>
                      A1
                    </td>
                    <td className='py-3 px-6 text-center'>
                      <span className='bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs'>
                        Available
                      </span>
                    </td>
                  </tr>
                  <tr className='border-b border-gray-200 hover:bg-gray-100'>
                    <td className='py-3 px-6 text-left whitespace-nowrap'>
                      A2
                    </td>
                    <td className='py-3 px-6 text-center'>
                      <span className='bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs'>
                        Booked
                      </span>
                    </td>
                  </tr>
                  <tr className='border-b border-gray-200 hover:bg-gray-100'>
                    <td className='py-3 px-6 text-left whitespace-nowrap'>
                      A3
                    </td>
                    <td className='py-3 px-6 text-center'>
                      <span className='bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs'>
                        Available
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className='flex justify-end px-5 py-5'>
                <button className='bg-primary text-white font-bold py-2 px-4 rounded'>
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-12'>
          <h2 className='text-2xl font-bold mb-4'>Recent Orders</h2>
          <div className='w-full'>
            <div className='bg-white shadow-md rounded my-6'>
              <table className='min-w-max w-full table-auto'>
                <thead>
                  <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                    <th className='py-3 px-6 text-left'>Order ID</th>
                    <th className='py-3 px-6 text-left'>Customer Name</th>
                    <th className='py-3 px-6 text-center'>Movie Title</th>
                    <th className='py-3 px-6 text-center'>Date</th>
                    <th className='py-3 px-6 text-center'>Quantity</th>
                    <th className='py-3 px-6 text-center'>Total Price</th>
                    <th className='py-3 px-6 text-center'>Status</th>
                  </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light'>
                  <tr className='border-b border-gray-200 hover:bg-gray-100'>
                    <td className='py-3 px-6 text-left whitespace-nowrap'>
                      <div className='flex items-center'>
                        <span>1</span>
                      </div>
                    </td>
                    <td className='py-3 px-6 text-left'>
                      <div className='flex items-center'>
                        <span>John Doe</span>
                      </div>
                    </td>
                    <td className='py-3 px-6 text-center'>
                      <div className='flex items-center justify-center'>
                        <span>Avengers: Endgame</span>
                      </div>
                    </td>
                    <td className='py-3 px-6 text-center'>
                      <div className='flex items-center justify-center'>
                        <span>2021-08-01</span>
                      </div>
                    </td>
                    <td className='py-3 px-6 text-center'>
                      <div className='flex items-center justify-center'>
                        <span>2</span>
                      </div>
                    </td>
                    <td className='py-3 px-6 text-center'>
                      <div className='flex items-center justify-center'>
                        <span>IDR 100.000</span>
                      </div>
                    </td>
                    <td className='py-3 px-6 text-center'>
                      <span className='bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs'>
                        Approved
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default MovieScreen;
