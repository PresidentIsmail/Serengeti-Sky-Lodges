// Libs
import { format, differenceInDays } from "date-fns";

// helpers
import { formatCurrency } from "@/utils/helpers";

// UI and icon Imports
import eye from "@/assets/icons/eye.svg";
import { LuEye } from "react-icons/lu";
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
          <ContextMenuButton
            onClick={() => console.log("View booking details")}
            label="View details"
          >
            <LuEye className="h-6 w-6 text-gray-800 " />
          </ContextMenuButton>
        </ContextMenu>
      </TableCell>
    </TableRow>
  );
};

export default BookingsTableRow;
