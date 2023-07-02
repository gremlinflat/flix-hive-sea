import React from "react";

const RecentOrder = () => {
  return (
    <div className='w-full'>
      <div className='bg-white shadow-md rounded my-6 overflow-x-auto'>
        <table className='min-w-max w-full table-auto'>
          <thead>
            <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
              <th className='py-3 px-4 md:px-6 text-left'>Order ID</th>
              <th className='py-3 px-4 md:px-6 text-left'>Customer Name</th>
              <th className='py-3 px-4 md:px-6 text-center'>Movie Title</th>
              <th className='py-3 px-4 md:px-6 text-center'>Date</th>
              <th className='py-3 px-4 md:px-6 text-center'>Quantity</th>
              <th className='py-3 px-4 md:px-6 text-center'>Total Price</th>
              <th className='py-3 px-4 md:px-6 text-center'>Status</th>
            </tr>
          </thead>
          <tbody className='text-gray-600 text-sm font-light'>
            <tr className='border-b border-gray-200 hover:bg-gray-100'>
              <td className='py-3 px-4 md:px-6 text-left whitespace-nowrap'>
                <div className='flex items-center'>
                  <span>1</span>
                </div>
              </td>
              <td className='py-3 px-4 md:px-6 text-left'>
                <div className='flex items-center'>
                  <span>John Doe</span>
                </div>
              </td>
              <td className='py-3 px-4 md:px-6 text-center'>
                <div className='flex items-center justify-center'>
                  <span>Avengers: Endgame</span>
                </div>
              </td>
              <td className='py-3 px-4 md:px-6 text-center'>
                <div className='flex items-center justify-center'>
                  <span>2021-08-01</span>
                </div>
              </td>
              <td className='py-3 px-4 md:px-6 text-center'>
                <div className='flex items-center justify-center'>
                  <span>2</span>
                </div>
              </td>
              <td className='py-3 px-4 md:px-6 text-center'>
                <div className='flex items-center justify-center'>
                  <span>IDR 100.000</span>
                </div>
              </td>
              <td className='py-3 px-4 md:px-6 text-center'>
                <span className='bg-purple-200 text-purple-600 py-1 px-2 md:px-3 rounded-full text-xs'>
                  Approved
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrder;
