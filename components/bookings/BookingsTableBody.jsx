// api functions
import { getAllBookings } from "@/supabase/bookingsApi";

// UI Imports
import { TableBody } from "@/components/ui/table";
import BookingsTableRow from "./BookingsTableRow";

const BookingsTableBody = async () => {
  const bookings = await getAllBookings();

  return (
    <TableBody>
      {bookings.map((booking) => (
        <BookingsTableRow key={booking.id} booking={booking} />
      ))}
    </TableBody>
  );
};

export default BookingsTableBody;
