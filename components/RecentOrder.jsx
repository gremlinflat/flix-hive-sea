import React from "react";
import RecentOrderCell from "./RecentOrderCell";

const RecentOrder = ({ ticket_data }) => {
  return (
    <div className='w-1/3'>
      <div className='shadow-md rounded-lg my-6'>
        <div className='shadow-md rounded my-6 overflow-x-auto'>
          <table className='table table-zebra table-auto'>
            <thead>
              <tr>
                <th className='font-semibold text-lg'>Customers</th>
                <th className='font-semibold text-lg'>Seat</th>
                <th className='font-semibold text-lg'>Status</th>
              </tr>
            </thead>
            <tbody>
              {!ticket_data || ticket_data.length === 0 ? (
                <tr>
                  <td colSpan='3' className='text-center text-lg font-semibold'>
                    No orders yet, be the first one!
                  </td>
                </tr>
              ) : (
                ticket_data.map((order) => (
                  <RecentOrderCell
                    key={order.seats + order.user_id}
                    order={order}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrder;
