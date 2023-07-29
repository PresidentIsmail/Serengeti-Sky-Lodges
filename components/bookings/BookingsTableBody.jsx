"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { bookingsFilterOptionAtom, bookingsSortOptionAtom } from "@/atoms";

// UI Imports
import { TableBody } from "@/components/ui/table";
import BookingsTableRow from "./BookingsTableRow";


const BookingsTableBody = ({ bookings }) => {
  const [bookingsFilterOption] = useAtom(bookingsFilterOptionAtom);
  const [bookingsSortOption] = useAtom(bookingsSortOptionAtom);


  // filter the bookings based on the filter option
  const filteredBookings = bookings?.filter((booking) => {
    if (bookingsFilterOption === "all") return true;
    if (bookingsFilterOption === "checked-in")
      return booking.status === "checked-in";
    if (bookingsFilterOption === "checked-out")
      return booking.status === "checked-out";
    if (bookingsFilterOption === "unconfirmed")
      return booking.status === "unconfirmed";
    return false; // handle the case when none of the options match
  });

  /* 
sample bookings data:
{id: 1, startdate: '2023-08-01T12:00:00', enddate: '2023-08-08T09:45:36', status: 'checked-in', totalprice: 1080, …}
*/

  // sort the bookings based on the sort option
  const sortedBookings = filteredBookings?.sort((a, b) => {
    if (bookingsSortOption === "most-recent")
      return new Date(b.startdate) - new Date(a.startdate);
    if (bookingsSortOption === "oldest")
      return new Date(a.startdate) - new Date(b.startdate);
    if (bookingsSortOption === "amount-high")
      return b.totalprice - a.totalprice;
    if (bookingsSortOption === "amount-low") return a.totalprice - b.totalprice;
    return false; // handle the case when none of the options match
  });

 

  return (
    <>
      <TableBody>
        {sortedBookings.map((booking) => (
          <BookingsTableRow key={booking.id} booking={booking} />
        ))}
      </TableBody>
    </>
  );
};

export default BookingsTableBody;
