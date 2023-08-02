"use client";

// third-party
import useSWR from "swr";
import { isWithinInterval, subDays } from "date-fns";

// api
import { getBookingsForDashboard } from "@/supabase/bookingsApi";

// components
import Loader from "@/components/loading/Loader";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsRow from "@/components/dashboard/StatsRow";

const Dashboard = ({ searchParams }) => {
  // fetch all bookings
  const {
    data: bookings,
    error,
    mutate,
  } = useSWR("/dashboard", getBookingsForDashboard);

  const filter = searchParams.days || "last7";

  if (error) return <div>failed to load</div>;
  if (!bookings)
    return (
      <div className="grid">
        <div className="text-gray-500">loading bookings...</div>
        <Loader />
      </div>
    );


  /* 
  sample booking object
  enddate : "2023-04-03T00:00:00"
  id : 3
  numnights : 2
  startdate : "2023-04-01T00:00:00"
  status : "unconfirmed"
  totalprice : 200
  */

  // filter bookings by filter param, default is last7. return all bookings for the last 7 days, 30 days or 90 days
  const filteredBookings = bookings.filter((booking) => {
    const today = new Date();

    // booking date is a few days before where status is checked-in
    const bookingDate = new Date(booking.startdate);

    // check if the booking date is within the last 7 days
    if (filter === "last7") {
      return isWithinInterval(bookingDate, {
        start: subDays(today, 7),
        end: today,
      });
    }

    // check if the booking date is within the last 30 days
    if (filter === "last30") {
      return isWithinInterval(bookingDate, {
        start: subDays(today, 30),
        end: today,
      });
    }

    // check if the booking date is within the last 90 days
    if (filter === "last90") {
      return isWithinInterval(bookingDate, {
        start: subDays(today, 90),
        end: today,
      });
    }
  });

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader />

      {/* grid layout of stat cards */}
      <StatsRow filteredBookings={filteredBookings} filter={filter} />

      {/* sales chart */}
    </div>
  );
};

export default Dashboard;
