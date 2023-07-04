import React from "react";

const RecentOrderCell = ({ order }) => {
  const { id, customerName, date, seat, quantity, price } = order;
  return (
    <tr>
      <td>{id}</td>
      <td>{customerName}</td>
      <td>{seat}</td>
      <td>Booked</td>
    </tr>
  );
};

export default RecentOrderCell;
