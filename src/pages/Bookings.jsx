import React from "react";
import BookingsTable from "../features/Bookings/BookingsTable";
import BookingTableOperations from "../features/Bookings/BookingTableOperations";

function Bookings() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-700">Bookings</h2>
        <BookingTableOperations/>
      </div>
      <BookingsTable />
    </div>
  );
}

export default Bookings;
