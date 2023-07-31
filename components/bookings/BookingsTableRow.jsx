// Libs
import { format, differenceInDays } from "date-fns";
import Link from "next/link";

// helpers
import { formatCurrency } from "@/utils/helpers";

// UI and icon Imports
import { LuEye } from "react-icons/lu";
import { HiOutlineCheckCircle } from "react-icons/hi";
import ContextMenu from "@/components/contextMenu/ContextMenu";
import ContextMenuButton from "@/components/contextMenu/ContextMenuButton";
import StatusBadge from "./StatusBadge";
import { TableCell, TableRow } from "../ui/table";

const BookingsTableRow = ({ booking }) => {
  // Destructure the data
  const { id, startdate, enddate, status, totalprice, cabinid, guestid } =
    booking;

  // Destructure nested objects
  const { name } = cabinid;
  const { fullname, email } = guestid;

  // format dates get the time for check in and check out. format
  // the time in 24 hour format, HH:mm
  const startDateFormatted = format(new Date(startdate), "MMMM d yyyy");
  const endDateFormatted = format(new Date(enddate), "MMMM d yyyy");
  const checkInTime = format(new Date(startdate), "HH:mm");
  const checkOutTime = format(new Date(enddate), "HH:mm");

  const numberOfDays = differenceInDays(new Date(enddate), new Date(startdate));

  // format currency
  const totalPriceFormatted = formatCurrency(totalprice);

  // format data to send to the checkin page


  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{fullname}</span>
          <span className="text-gray-500">{email}</span>
        </div>
      </TableCell>
      <TableCell>
        {/* check in */}
        <div className="flex flex-col">
          <span className="font-medium">{startDateFormatted}</span>
          <span className="text-gray-500">{checkInTime}</span>
        </div>
      </TableCell>
      <TableCell>
        {/* check out */}
        <div className="flex flex-col">
          <span className="font-medium">{endDateFormatted}</span>
          <span className="text-gray-500">{checkOutTime}</span>
        </div>
      </TableCell>
      <TableCell>
        {/* status */}
        <StatusBadge>{status}</StatusBadge>
      </TableCell>
      <TableCell className="text-right">{totalPriceFormatted}</TableCell>
      {/* context menu to view booking details */}
      <TableCell>
        <ContextMenu>
          <Link href={`bookings/${id}?page=bookings`}>
            <ContextMenuButton label="View details">
              <LuEye className="h-6 w-6 text-gray-800 " />
            </ContextMenuButton>
          </Link>
          {/* if status is unconfirmed - show check-in btn */}
          {status === "unconfirmed" && (
            <Link href={`checkin/${id}?page=checkin`}>
              <ContextMenuButton label="Check in">
                <HiOutlineCheckCircle className="h-6 w-6 text-gray-800 " />
              </ContextMenuButton>
            </Link>
          )}
        </ContextMenu>
      </TableCell>
    </TableRow>
  );
};

export default BookingsTableRow;
