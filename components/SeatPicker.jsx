import React from "react";

const SeatPicker = () => {
  return (
    <div className='w-full'>
      <div className='bg-white shadow-md rounded my-6 overflow-x-auto'>
        <table className='min-w-max w-full table-auto'>
          <thead>
            <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
              <th className='py-3 px-4 md:px-6 text-left'>Seat Number</th>
              <th className='py-3 px-4 md:px-6 text-center'>Status</th>
            </tr>
          </thead>
          <tbody className='text-gray-600 text-sm font-light'>
            <tr className='border-b border-gray-200 hover:bg-gray-100'>
              <td className='py-3 px-4 md:px-6 text-left whitespace-nowrap'>
                A1
              </td>
              <td className='py-3 px-4 md:px-6 text-center'>
                <span className='bg-green-200 text-green-600 py-1 px-2 md:px-3 rounded-full text-xs'>
                  Available
                </span>
              </td>
            </tr>
            <tr className='border-b border-gray-200 hover:bg-gray-100'>
              <td className='py-3 px-4 md:px-6 text-left whitespace-nowrap'>
                A2
              </td>
              <td className='py-3 px-4 md:px-6 text-center'>
                <span className='bg-red-200 text-red-600 py-1 px-2 md:px-3 rounded-full text-xs'>
                  Booked
                </span>
              </td>
            </tr>
            <tr className='border-b border-gray-200 hover:bg-gray-100'>
              <td className='py-3 px-4 md:px-6 text-left whitespace-nowrap'>
                A3
              </td>
              <td className='py-3 px-4 md:px-6 text-center'>
                <span className='bg-green-200 text-green-600 py-1 px-2 md:px-3 rounded-full text-xs'>
                  Available
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div className='flex justify-end px-4 py-4 md:px-5 md:py-5'>
          <button className='bg-primary text-white font-bold py-2 px-4 rounded'>
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatPicker;
