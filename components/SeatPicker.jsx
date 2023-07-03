import React, { useState } from "react";
import SeatCell from "./SeatCell";
import Alert from "./Alert";

const SeatPicker = ({ ticket_price }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const columns = ["1", "2", "gap", "3", "4", "5", "6", "gap", "7", "8"];

  const isSeatSelected = (row, column) => {
    return selectedSeats.includes(`${row}${column}`);
  };

  const toggleSeatSelection = (row, column) => {
    const seat = `${row}${column}`;
    if (selectedSeats.length === 6 && !isSeatSelected(row, column)) {
      setAlertMessage("You can only buy up to 6 tickets.");
      setAlertType("warning");
      setShowAlert(true);
      return;
    }
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter((s) => s !== seat)
        : [...prevSelectedSeats, seat]
    );
  };

  const handleBuyTicket = () => {
    if (selectedSeats.length > 6) {
      // WARNING: CANT PROCEED WITH PURCHASE
      return;
    }

    //do checkout

    //is it successful?
    //if yes, show success alert
    setAlertType("success");
    setAlertMessage("Ticket purchased successfully!");
    setShowAlert(true);

    //if no, show error alert
    // setAlertType("error");
    // setAlertMessage("Something went wrong. Please try again.");
    // setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className='w-full'>
      <div className=' shadow-md rounded-lg my-6'>
        <div className='bg-primary mb-8 rounded-lg'>
          <h2 className='text-white text-center font-bold p-2'>SCREEN</h2>
        </div>
        <table className='w-full table-auto rounded-lg'>
          <tbody className=' text-sm font-light'>
            {rows.map((row) => (
              <tr key={row} className='hover:bg-gray-100 hover:bg-opacity-5'>
                <td className='py-3 px-6 text-left font-semibold'>{row}</td>
                {columns.map((column, index) => (
                  <SeatCell
                    key={`${row}${index}`}
                    row={row}
                    column={column}
                    isSeatSelected={isSeatSelected}
                    toggleSeatSelection={toggleSeatSelection}
                  />
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className='uppercase text-sm leading-normal'>
              <th className='py-3 px-6 text-left'>{""}</th>
              {columns.map((column, index) => (
                <th
                  key={`${column}${index}`}
                  className={`py-3 px-6 text-center ${
                    column === "gap" ? "w-12" : ""
                  }`}
                >
                  {column !== "gap" && column}
                </th>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      <div className='flex justify-end items-center px-5 py-5'>
        <div className='px-5 py-3'>
          {selectedSeats.length > 0 && (
            <>
              <div className='font-light'>
                Selected Seats: {selectedSeats.join(", ")}
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
          } ml-4 px-8 text-white font-bold py-3 rounded-lg text-l`}
          onClick={handleBuyTicket}
        >
          Buy Ticket
        </button>
        {showAlert && (
          <Alert
            type={alertType}
            message={alertMessage}
            show={showAlert}
            onClose={handleCloseAlert}
          />
        )}
      </div>
    </div>
  );
};

export default SeatPicker;
