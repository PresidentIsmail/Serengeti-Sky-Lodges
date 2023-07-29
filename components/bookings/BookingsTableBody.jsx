"use client";

import useSWR from "swr";
import { useAtom } from "jotai";
import { bookingsFilterOptionAtom } from "@/atoms";

// api functions
import { getAllBookings } from "@/supabase/bookingsApi";

// UI Imports
import { TableBody } from "@/components/ui/table";
import BookingsTableRow from "./BookingsTableRow";
import Loading from "@/app/loading";

const BookingsTableBody = () => {
  const { data: bookings, error } = useSWR("/bookings", getAllBookings);

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

  // if there is an error fetching the data, display the error message
  if (error) return <div>Error loading bookings</div>;

  if (!bookings) return <Loading />;

  return (
    <TableBody>
      {filteredBookings.map((booking) => (
        <BookingsTableRow key={booking.id} booking={booking} />
      ))}
    </TableBody>
  );
};

export default BookingsTableBody;
