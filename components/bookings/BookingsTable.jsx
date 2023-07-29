

// components
import { Table, TableCaption } from "@/components/ui/table";
import BookingsTableBody from "./BookingsTableBody";
import BookingsTableHead from "./BookingsTableHead";


const BookingsTable = () => {
  
  return (
    <Table>
      <TableCaption>A list of your recent bookings.</TableCaption>

      <BookingsTableHead />

      <BookingsTableBody />
    </Table>
  );
};

export default BookingsTable;
