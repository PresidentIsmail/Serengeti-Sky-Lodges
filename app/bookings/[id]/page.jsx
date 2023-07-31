import { Button } from "@/components/ui/button";
import BookingDetails from "../../../components/bookings/BookingDetails";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

const page = ({ searchParams, params }) => {
  const id = params.id;
  const page = searchParams.page;
  console.log(searchParams);
  console.log(params);

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
          Booking #{id}
        </h1>

      </header>
      <BookingDetails bookingId={id} page={page} />
    </>
  );
};

export default page;
