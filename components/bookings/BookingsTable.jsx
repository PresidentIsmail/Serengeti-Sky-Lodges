
// api functions
import { getAllBookings } from "@/supabase/bookingsApi";

// components
import { Table, TableCaption } from "@/components/ui/table";
import BookingsTableBody from "./BookingsTableBody";
import BookingsTableHead from "./BookingsTableHead";

const BookingsTable = async () => {
  const bookings = await getAllBookings();
  return (
    <Table>
      <BookingsTableHead />

     
        <BookingsTableBody bookings={bookings} />
   
    </Table>
  );
};

export default BookingsTable;
