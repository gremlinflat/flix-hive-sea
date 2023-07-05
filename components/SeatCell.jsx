import React from "react";

const SeatCell = ({
  row,
  column,
  isSeatSelected,
  toggleSeatSelection,
  isSeatReserved,
}) => {
  if (isSeatReserved) {
    console.log("Seat is reserved", row, column);
  }

  const getCellClassName = () => {
    if (isSeatReserved) {
      return " bg-red-200 text-red-600 font-bold cursor-not-allowed";
    } else if (isSeatSelected(row, column)) {
      return " text-bold bg-secondary font-bold text-white";
    } else {
      return "bg-gray-300 text-gray-600 font-bold cursor-pointer";
    }
  };

  const handleSeatClick = () => {
    if (!isSeatReserved) {
      toggleSeatSelection(row, column);
    }
  };

  return (
    <td
      className={`px-1 py-1 text-center ${
        column === "gap" ? "md:w-12 text-xl" : "w-fit min-w-0"
      }`}
    >
      {column !== "gap" ? (
        <div
          className={`py-2 px-0 w-full sm:px-3 rounded-sm md:rounded-lg text-xs flex items-center justify-center ${getCellClassName()}`}
          onClick={handleSeatClick}
        >
          {isSeatReserved ? "X" : `${row}${column}`}
        </div>
      ) : (
        "|"
      )}
    </td>
  );
};

export default SeatCell;
