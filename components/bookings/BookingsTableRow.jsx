// Libs
import { format, differenceInDays } from "date-fns";

// helpers
import { formatCurrency } from "@/utils/helpers";

// UI Imports
import { TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";

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
    </TableRow>
  );
};

// custom bagde design based on status:
const StatusBadge = ({ children }) => {
  const statusStyles = {
    unconfirmed: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200",
      textContent: "Unconfirmed",
    },
    confirmed: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200",
      textContent: "Confirmed",
    },
    "checked-in": {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
      textContent: "Checked In",
    },
    "checked-out": {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200",
      textContent: "Checked Out",
    },
    cancelled: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200",
      textContent: "Cancelled",
    },
    default: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200",
      textContent: "Unconfirmed",
    },
  };

  const status = children.toLowerCase();
  const { bg, text, border, textContent } =
    statusStyles[status] || statusStyles["default"];

  return (
    <Badge className={`${bg} ${text} border ${border} `}>{textContent}</Badge>
  );
};

export default BookingsTableRow;
