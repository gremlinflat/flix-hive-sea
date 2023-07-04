import React from "react";

const SeatCell = ({ row, column, isSeatSelected, toggleSeatSelection }) => {
  return (
    <td
      className={`px-1 py-1 text-center ${
        column === "gap" ? "md:w-12 text-xl" : "w-fit min-w-0"
      }`}
    >
      {column !== "gap" ? (
        <div
          className={`${
            isSeatSelected(row, column)
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          } py-2 px-0 w-full sm:px-3 rounded-sm md:rounded-lg text-xs cursor-pointer flex items-center justify-center`}
          onClick={() => toggleSeatSelection(row, column)}
        >
          {row}
          {column}
        </div>
      ) : (
        "|"
      )}
    </td>
  );
};

export default SeatCell;
