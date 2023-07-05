import React from "react";
import Link from "next/link";
import { generateMovieIdentifier } from "@/utils/utils";

const TransactionCell = ({ ticket, onCancel }) => {
  const handleCancel = () => {
    onCancel(ticket.id);
  };
  return (
    <tr key={ticket.id}>
      <td className='font-semibold text-sm md:text-lg'>{ticket.id}</td>
      <td className='font-semibold text-sm md:text-lg'>
        <Link href={`/movie/${ticket.movie_id}`}>{ticket.movie_title}</Link>
      </td>
      <td className='font-semibold text-sm md:text-lg'>
        {ticket.seats.join(", ")}
      </td>
      <td className='font-semibold text-sm md:text-lg'>IDR {ticket.total}</td>
      <td className='font-semibold text-sm md:text-lg text-center'>
        <span
          className={`${
            ticket.status === "booked"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          } py-2 px-0 w-min sm:px-3 rounded-sm md:rounded-lg text-xs flex items-center justify-center capitalize font-semibold`}
        >
          {ticket.status}
        </span>
      </td>
      <td className='font-semibold text-sm md:text-lg text-center'>
        {ticket.status == "booked" ? (
          <span
            className='flex h-min min-h-0 btn btn-error py-2 px-0 sm:px-3 rounded-sm md:rounded-lg text-xs capitalize font-semibold'
            onClick={handleCancel}
          >
            cancel
          </span>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default TransactionCell;
