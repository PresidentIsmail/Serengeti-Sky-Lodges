// Libs
import { Suspense } from "react";

// Components
import Heading from "@/components/ui/Heading";
import BookingsTable from "@/components/bookings/BookingsTable";
import BookingsFilterBy from "@/components/bookings/BookingsFilterBy";
import BookingSortByComponentWithNoSSR from "@/components/bookings/BookingSortByComponentWithNoSSR ";
import Loader from "@/components/loading/Loader";

const Bookings = ({ searchParams }) => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <div className="mb-8 grid grid-cols-1 items-baseline justify-between gap-8">
        <div>
          <Heading as="h1">Bookings</Heading>
        </div>
        <div className="flex items-center justify-between">
          <BookingsFilterBy />
          <BookingSortByComponentWithNoSSR />
        </div>
      </div>

      <Suspense fallback={<Loader />}>
        <BookingsTable page={searchParams.page} />
      </Suspense>
    </div>
  );
};

export default Bookings;
