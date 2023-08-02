// third party imports

// helpers
import { formatCurrency } from "@/utils/helpers";

// icons and components
import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from "react-icons/hi2";
import StatCard from "./StatCard";

const StatsRow = ({ filteredBookings, filter }) => {
  let days = 7;
  if (filter === "last30") {
    days = 30;
  }
  if (filter === "last90") {
    days = 90;
  }

  // get total bookings
  const totalBookings = filteredBookings.length;
  //  get the total revenue for the filtered bookings
  const totalRevenue = filteredBookings.reduce((acc, booking) => {
    return acc + booking.totalprice;
  }, 0);

  // get the total number of bookings for the filtered bookings where the status is checkedin
  const totalCheckins = filteredBookings.filter(
    (booking) => booking.status === "checked-in",
  ).length;

  // get the total number of bookings for the filtered bookings where the status is checkedout
  const totalCheckouts = filteredBookings.filter(
    (booking) => booking.status === "checked-out",
  ).length;

  //   calculate the occupancy rate
  const occupancyRate = Math.round(
    ((totalCheckins / totalBookings) * 100),
  );

  return (
    <div className="grid grid-cols-2 gap-4 lg:order-last">
      {/* bookings */}
      <StatCard title="Bookings" value={totalBookings}>
        <HiOutlineBriefcase className="h-12 w-12 rounded-full bg-blue-100 p-2 text-blue-500" />
      </StatCard>

      {/* Checkins */}
      <StatCard title="Checkins" value={totalCheckins}>
        <HiOutlineCalendarDays className="h-12 w-12 rounded-full bg-purple-100 p-2 text-purple-500" />
      </StatCard>

      {/* Occupancy Rate */}
      <StatCard title="Occupancy Rate" value={occupancyRate + "%"}>
        <HiOutlineChartBar className="h-12 w-12 rounded-full bg-yellow-100 p-2 text-yellow-500" />
      </StatCard>

      {/* Revenue */}
      <StatCard title="Revenue" value={formatCurrency(totalRevenue)}>
        <HiOutlineBanknotes className="h-12 w-12 rounded-full bg-green-100 p-2 text-green-500" />
      </StatCard>
    </div>
  );
};

export default StatsRow;
