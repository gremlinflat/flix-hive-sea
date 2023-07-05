import React, { useState } from "react";
import SeatCell from "./SeatCell";
import { useAuth } from "@/lib/auth";
import { useAlert } from "@/lib/alert";

const SeatPicker = ({
  ticket_price,
  min_age,
  movie_id,
  ticket_data,
  onCheckout,
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { getUserToken, userProfile, refreshUserProfile } = useAuth();

  const { showAlertMessage } = useAlert();

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const columns = ["1", "2", "gap", "3", "4", "5", "6", "gap", "7", "8"];

  const isSeatSelected = (row, column) => {
    return selectedSeats.includes(`${row}${column}`);
  };
  const reservedSeats =
    ticket_data
      ?.filter((ticket) => ticket.status === "booked")
      .map((ticket) => ticket.seats)
      .flat() ?? [];

  const isSeatReserved = (row, column) => {
    return reservedSeats.includes(`${row}${column}`);
  };

  const toggleSeatSelection = (row, column) => {
    const seat = `${row}${column}`;
    if (selectedSeats.length === 6 && !isSeatSelected(row, column)) {
      showAlertMessage("Oops! You can only select up to 6 seats.", "warning");
      return;
    }
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter((s) => s !== seat)
        : [...prevSelectedSeats, seat]
    );
  };

  const handleBuyTicket = async () => {
    if (selectedSeats.length > 6) {
      showAlertMessage("Oops! You can only select up to 6 seats.", "warning");
      return;
    }

    if (userProfile?.age < min_age) {
      showAlertMessage(
        `Oops! You must be at least ${min_age} years old to purchase this ticket.`,
        "warning"
      );
      return;
    }

    if (userProfile?.credit < selectedSeats.length * ticket_price) {
      showAlertMessage(
        "Oops! You do not have enough credit to purchase this ticket.",
        "warning"
      );
      return;
    }

    // if user not login
    if (!userProfile) {
      showAlertMessage(
        "Oops! You must login to purchase this ticket.",
        "warning"
      );
      return;
    }

    const userToken = await getUserToken();
    const result = await fetch(`/api/ticket/${movie_id}`, {
      method: "POST",
      body: JSON.stringify({
        seats: selectedSeats,
        price: ticket_price,
        total: selectedSeats.length * ticket_price,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        token: userToken,
      }),
    });
    if (!result) {
      showAlertMessage("Something went wrong. Please try again.", "error");
      return;
    }
    if (result) {
      showAlertMessage("Ticket purchased successfully!", "success");
      setSelectedSeats([]);
    }
    await refreshUserProfile();
    await onCheckout();
  };

  return (
    <div className='w-full'>
      <div className=' shadow-md rounded-lg my-6'>
        <div className='bg-primary mb-8 md:rounded-b-lg rounded-b-md'>
          <h2 className='text-white text-center font-bold p-2'>SCREEN</h2>
        </div>
        <table className='w-full table-auto rounded-lg'>
          <tbody className=' text-sm font-light'>
            {rows.map((row) => (
              <tr key={row} className='hover:bg-gray-100 hover:bg-opacity-5'>
                <td className='w-fit sm:px-1 sm:py-3 sm:w-12 md:px-6 text-left font-semibold'>
                  {row}
                </td>
                {columns.map((column, index) => {
                  return (
                    <SeatCell
                      key={`${row}${column}${index}`}
                      row={row}
                      column={column}
                      isSeatSelected={isSeatSelected}
                      toggleSeatSelection={toggleSeatSelection}
                      isSeatReserved={isSeatReserved(row, column)}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className='uppercase text-sm leading-normal'>
              <th className='py-3 min-w-0 sm:px-2 sm:w-12 md:px-6 text-left'>
                {""}
              </th>
              {columns.map((column, index) => (
                <th
                  key={`${column}${index}`}
                  className={`px-1 py-3 text-center w-fit sm:min-w-12 ${
                    column === "gap" ? "w-1 md:w-12" : ""
                  }`}
                >
                  {column !== "gap" && column}
                </th>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      <div className='flex justify-end items-center flex-wrap px-5 py-5'>
        <div className='px-5 py-3'>
          {selectedSeats.length > 0 && (
            <>
              <div className='font-light'>
                Seats:{" "}
                <span className='text-secondary font-medium'>
                  {selectedSeats.join(", ")}
                </span>
              </div>
              <div className='font-light'>
                Total:{" "}
                <span className=' text-secondary font-bold'>
                  IDR {selectedSeats.length * ticket_price}
                </span>
              </div>
            </>
          )}
        </div>
        <button
          className={`${
            !selectedSeats.length > 0
              ? "disabled bg-gray-400 cursor-not-allowed"
              : "bg-secondary"
          } ml-4 px-8 text-white font-bold py-3 rounded-lg text-lg w-fit h-fit`}
          onClick={handleBuyTicket}
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default SeatPicker;
