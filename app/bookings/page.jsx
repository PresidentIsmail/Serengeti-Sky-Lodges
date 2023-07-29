import { Suspense } from "react";

// Components
import Heading from "@/components/ui/Heading";
import BookingsTable from "@/components/bookings/BookingsTable";
import BookingsSortBy from "@/components/bookings/BookingsSortBy";
import BookingsFilterBy from "@/components/bookings/BookingsFilterBy";
import Loading from "@/app/loading";

const Bookings = () => {
  return (
    <>
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
        <Suspense fallback={<Loading />}>
          <BookingsTable />
        </Suspense>
      </div>
    </>
  );
};

export default Bookings;
