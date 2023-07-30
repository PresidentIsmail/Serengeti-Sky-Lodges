// UI Imports
import { TableBody } from "@/components/ui/table";
import BookingsTableRow from "./BookingsTableRow";

const BookingsTableBody = ({ bookings }) => {
  return (
    <>
      <TableBody className="">
        {bookings.map((booking) => (
          <BookingsTableRow key={booking.id} booking={booking} />
        ))}
      </TableBody>
    </>
  );
};

export default BookingsTableBody;
