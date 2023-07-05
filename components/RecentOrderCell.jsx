import React from "react";

const RecentOrderCell = ({ order }) => {
  const { user_name, seats, status } = order;
  return (
    <tr>
      <td>{user_name}</td>
      <td>{seats.join(", ")}</td>
      <td>
        <span
          className={`${
            status === "booked"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          } py-2 px-0 w-min sm:px-3 rounded-sm md:rounded-lg text-xs flex items-center justify-center capitalize font-semibold`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
};

export default RecentOrderCell;
