// Components
import Heading from "@/components/ui/Heading";
import BookingsTable from "@/components/bookings/BookingsTable";

const Bookings = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="mb-8 grid grid-cols-1 items-baseline justify-between gap-8">
        \
        <div>
          <Heading as="h1">Bookings</Heading>
        </div>
        <div className="flex items-center justify-between">
          {/* <Filter /> */}
          somethng
          {/* <SortBy /> */}
        </div>
      </div>

      <BookingsTable />
    </div>
  );
};

export default Bookings;
