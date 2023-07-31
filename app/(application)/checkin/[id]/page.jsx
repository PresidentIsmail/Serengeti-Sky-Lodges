import Link from "next/link";
import { Suspense } from "react";

import { BiArrowBack } from "react-icons/bi";
import BookingDetails from "@/components/bookings/BookingDetails";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loading/Loader";

const Checkin = ({ searchParams, params }) => {
  const id = params.id; // get the booking id from the url
  const page = searchParams.page; // get the page number from the query string

  return (
    <>
      <header className="mb-8 flex  items-start justify-between gap-y-8">
        <Button
          asChild
          variant="link"
          className="self-start px-0 hover:decoration-blue-500"
        >
          <Link href="/bookings">
            <BiArrowBack className="mr-2 h-5 w-5 text-blue-500" />
            <span className="text-base text-blue-500">Back to Bookings</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-wide lg:text-4xl xl:text-5xl">
          Check In Booking #{id}
        </h1>
      </header>

      <Suspense fallback={<Loader />}>
        <BookingDetails bookingId={id} page={page} />
      </Suspense>
    </>
  );
};

export default Checkin;
