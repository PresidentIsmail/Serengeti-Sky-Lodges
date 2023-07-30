import React from "react";

// data access layer
import { getBookingDataById } from "@/supabase/bookingsApi";

const BookingDetails = async ({ params }) => {
  const data = await getBookingDataById(params.id);

  return (
    <div>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default BookingDetails;
