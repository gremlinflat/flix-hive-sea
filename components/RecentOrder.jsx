import React from "react";
import RecentOrderCell from "./RecentOrderCell";

const RecentOrder = () => {
  // const orders = [];
  const orders = [
    {
      id: "1",
      customerName: "Joh saifuiasf asfj asn",
      movieTitle: "Movie A",
      date: "2023-07-01",
      seat: "A2, s2, asf 2, 2,2  2f",
      quantity: 6,
      price: 16000,
    },
    {
      id: "2",
      customerName: "Jane",
      movieTitle: "Movie B",
      date: "2023-07-02",
      seat: "B4",
      quantity: 3,
      price: 12000,
    },
  ];

  return (
    <div className='w-full'>
      <div className='shadow-md rounded-lg my-6'>
        <div className='shadow-md rounded my-6 overflow-x-auto'>
          <table className='table table-zebra table-auto'>
            <thead>
              <tr>
                <th className='font-semibold text-sm'>Order ID</th>
                <th className='font-semibold text-sm'>Cust. Name</th>
                <th className='font-semibold text-sm'>Seat</th>
                <th className='font-semibold text-sm'>Status</th>
              </tr>
            </thead>
            <tbody>
              {!orders && (
                <tr>
                  <td colSpan='6' className='text-center text-lg font-bold'>
                    No orders yet, be the first one!
                  </td>
                </tr>
              )}
              {orders.map((order) => (
                <RecentOrderCell key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrder;
