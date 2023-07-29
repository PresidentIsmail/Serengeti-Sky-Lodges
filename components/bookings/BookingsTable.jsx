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

const BookingsTable = ({ params }) => {
  // Fetch bookings data
  const { data: bookings, error } = useSWR("bookings", getAllBookings);

  const [bookingsFilterOption] = useAtom(bookingsFilterOptionAtom);
  const [bookingsSortOption] = useAtom(bookingsSortOptionAtom);

  // if there is no bookings data, display the loading component
  if (!bookings) return <div>Loading...</div>;

  // FILTERING - filter the bookings data
  const filteredBookings = filterBookings(bookings, bookingsFilterOption);

  // SORTING - sort the filtered bookings data
  const sortedBookings = sortBookings(filteredBookings, bookingsSortOption);

  // PAGINATION 
  const currentPage = params?.page || 1;
  const itemsPerPage = 4;
  // total number of items in your table
  const totalItemsInTable = filteredBookings.length;
  // Logic to calculate the total number of pages
  const totalPages = Math.ceil(totalItemsInTable / itemsPerPage);

  // slice the bookings data based on the current page and items per page
  const slicedBookings = sliceBookings(
    sortedBookings,
    currentPage,
    itemsPerPage,
  );

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

// Helper function to handle filtering
function filterBookings(bookings, bookingsFilterOption) {
  if (bookingsFilterOption === "all") return bookings;
  return bookings.filter((booking) => booking.status === bookingsFilterOption);
}

// Helper function to handle sorting
const sortBookings = (bookings, sortOption) => {
  return bookings.slice().sort((a, b) => {
    if (sortOption === "most-recent")
      return new Date(b.startdate) - new Date(a.startdate);
    if (sortOption === "oldest")
      return new Date(a.startdate) - new Date(b.startdate);
    if (sortOption === "amount-high") return b.totalprice - a.totalprice;
    if (sortOption === "amount-low") return a.totalprice - b.totalprice;
    return 0; // Default case
  });
};

// Helper function to slice the bookings data based on the current page and items per page
function sliceBookings(bookings, currentPage, itemsPerPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return bookings.slice(startIndex, endIndex);
}
