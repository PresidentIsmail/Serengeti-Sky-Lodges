// api functions
import { getAllBookings } from "@/supabase/bookingsApi";

// components
import { Table, TableCaption } from "@/components/ui/table";
import BookingsTableBody from "./BookingsTableBody";
import BookingsTableHead from "./BookingsTableHead";
import Pagination from "../Pagination";

const BookingsTable = async ({ params }) => {
  const bookings = await getAllBookings();

  // Pagination
  const currentPage = params?.page || 1;
  const itemsPerPage = 4; // Change this to the desired number of items per page
  const totalItems = bookings.length; // Replace this with the total number of items in your table
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Logic to slice the data based on the current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedBookings = bookings.slice(startIndex, endIndex);

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
