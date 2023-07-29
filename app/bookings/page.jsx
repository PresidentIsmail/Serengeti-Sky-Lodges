// Libs

// Components
import Heading from "@/components/ui/Heading";
import BookingsTable from "@/components/bookings/BookingsTable";
import BookingsSortBy from "@/components/bookings/BookingsSortBy";
import BookingsFilterBy from "@/components/bookings/BookingsFilterBy";

const Bookings = ({ searchParams }) => {
  const params = searchParams;

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-8 grid grid-cols-1 items-baseline justify-between gap-8">
        <div>
          <Heading as="h1">Bookings</Heading>
        </div>
        <div className="flex items-center justify-between">
          <BookingsFilterBy />
          <BookingsSortBy />
        </div>
      </div>

      <BookingsTable params={params} />
    </div>
  );
};

export default Bookings;
