// third-party
import { memo } from "react";
import Link from "next/link";

// api
import { getBookingsForActivityTable } from "@/supabase/bookingsApi";

// components and icons
import { MdOutlineOpenInNew } from "react-icons/md";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "@/components/ui/badge";

const WeeksActivity = async () => {
  const bookings = await getBookingsForActivityTable();

  return (
    <Card className="flex max-w-[550px] flex-col gap-8 p-4">
      <h2 className="mb-4 text-2xl font-bold">This Week&apos;s Activity</h2>
      <div className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <BookingActivity key={booking.id} booking={booking} />
        ))}
      </div>
    </Card>
  );
};

// component to display the each booking activity for the week
const BookingActivity = memo(({ booking }) => {
  const { id, guestid, status, numnights } = booking;
  const { fullname } = guestid;
  console.log(fullname);

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* either "arriving" or "departing" */}
      <GuestStatus status={status} />

      {/* guest fullname */}
      <div className="text-sm font-semibold">{fullname}</div>

      {/* how long they staying */}
      <div className="text-sm text-gray-500">
        {numnights} {numnights > 1 ? "nights" : "night"}
      </div>

      {/* check in btn that links to checkin/:id/page=checkin if status is unconfirmed*/}
     {status === "unconfirmed" && (
         <Button
         asChild
         size="sm"
         className="rounded-full bg-violet-600 hover:bg-violet-600/70"
       >
         <Link href={`/checkin/${id}?page=checkin`}>
           <p>Check In</p>{" "}
           <span>
             <MdOutlineOpenInNew className="ml-2 h-4 w-4" />
           </span>
         </Link>
       </Button>
       )}
    </div>
  );
});
// Add a display name to the BookingActivity component
BookingActivity.displayName = "BookingActivity";

// component to display if the guest is arriving or departing as a badge. Is based on the booking status.
const GuestStatus = ({ status }) => {
  switch (status) {
    case "unconfirmed":
      return (
        <Badge className="h-6 w-max  border-green-200 bg-green-100 px-2 leading-none text-green-800">
          Arriving
        </Badge>
      );
    case "checked-in":
      return (
        <Badge className="h-6 w-max  border-red-200 bg-red-100 px-2 leading-none text-red-800">
          Departing
        </Badge>
      );
    default:
      return (
        <Badge className="h-6 w-max  border-red-200 bg-red-100 px-2 leading-none text-red-800">
          Departing
        </Badge>
      );
  }
};

export default WeeksActivity;
