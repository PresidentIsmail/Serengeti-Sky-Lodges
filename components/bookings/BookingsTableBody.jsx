"use client";

import { useAtom } from "jotai";
import { bookingsFilterOptionAtom } from "@/atoms";

// UI Imports
import { TableBody } from "@/components/ui/table";
import BookingsTableRow from "./BookingsTableRow";

const BookingsTableBody = ({ bookings }) => {
  const [bookingsFilterOption] = useAtom(bookingsFilterOptionAtom);

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

  return (
    <TableBody>
      {filteredBookings.map((booking) => (
        <BookingsTableRow key={booking.id} booking={booking} />
      ))}
    </TableBody>
  );
};

export default BookingsTableBody;
