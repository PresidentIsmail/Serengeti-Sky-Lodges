"use client";

import useSWR from "swr";
import { useAtom } from "jotai";
import { bookingsFilterOptionAtom, bookingsSortOptionAtom } from "@/atoms";

// api functions
import { getAllBookings } from "@/supabase/bookingsApi";

// components
import { Table, TableCaption } from "@/components/ui/table";
import BookingsTableBody from "./BookingsTableBody";
import BookingsTableHead from "./BookingsTableHead";
import Pagination from "../Pagination";
import Loading from "@/app/loading";

const BookingsTable = ({ params }) => {
  // Fetch bookings data
  const { data: bookings, error } = useSWR("bookings", getAllBookings, {
    fallback: <Loading />,
  });

  // Filter and sort options
  const [bookingsFilterOption] = useAtom(bookingsFilterOptionAtom);
  const [bookingsSortOption] = useAtom(bookingsSortOptionAtom);

  if (!bookings) return <div>Loading...</div>;

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

  // Pagination
  const currentPage = params?.page || 1;
  const itemsPerPage = 4;
  // total number of items in your table
  const totalItems = filteredBookings.length;
  // Logic to calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Logic to slice the data based on the current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedBookings = sortedBookings.slice(startIndex, endIndex);

  // if there is an error fetching the data, display the error message
  if (error) return <div>Error loading bookings</div>;

  return (
    <>
      <Table>
        <BookingsTableHead />
        {/* Pass the sliced bookings data to BookingsTableBody */}
        <BookingsTableBody bookings={slicedBookings} />
      </Table>

      {/* Render the pagination component */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};

export default BookingsTable;
