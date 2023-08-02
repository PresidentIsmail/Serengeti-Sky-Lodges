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
import SalesChart from "@/components/dashboard/SalesChart";
import WeeksActivity from "@/components/dashboard/WeeksActivity";

const Dashboard = ({ searchParams }) => {
  // fetch all bookings
  const {
    data: bookings,
    error,
    mutate,
  } = useSWR("/dashboard", getBookingsForDashboard);

  const filter = searchParams.days || "last14";

  if (error)
    return <div>failed to load, an error occured: {error.message}</div>;
  if (!bookings)
    return (
      <div className="grid">
        <div className="text-gray-500">loading bookings...</div>
        <Loader />
      </div>
    );

  // filter bookings by filter param, default is last14. return all bookings for the last 7 days, 30 days or 90 days
  const filteredBookings = bookings.filter((booking) => {
    const today = new Date();

    // booking date is a few days before where status is checked-in
    const bookingDate = new Date(booking.startdate);

    // check if the booking date is within the last 7 days
    if (filter === "last14") {
      return isWithinInterval(bookingDate, {
        start: subDays(today, 14),
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
    <div className="grid gap-8 ">
      <DashboardHeader filter={filter} />

      <div className="grid gap-4 first-line:grid-cols-1 lg:grid-cols-2">
        {/* grid layout of stat cards */}
        <StatsRow filteredBookings={filteredBookings} filter={filter} />
        {/* display of this weeks guests */}
        <WeeksActivity bookings={filteredBookings} />
      </div>

      {/* sales chart */}
      <SalesChart bookings={filteredBookings} />
    </div>
  );
};

export default Dashboard;
