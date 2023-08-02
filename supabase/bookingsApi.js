// bookingsApi.js
import { supabase } from "./supabase";

/* 
get all the following data from the bookings table:
- startdate, enddate, status, totalprice
- there are two foreign keys (cabinid linked to cabin, guestid linked to guests) i want the name from cabin and the fullname, email from guests
*/
export async function getAllBookings() {
  const table = "bookings"; // Replace "bookings" with your actual table name

  let { data: bookings, error } = await supabase.from(table).select(
    `
      id,
      startdate,
      enddate,
      status,
      totalprice,
      cabinid (name, regularprice),
      guestid (fullname, email),
      observation,
      numguests,
      ispaid
    `,
  );

  if (error) {
    throw error;
  }

  return bookings;
}

/* 
get all the data for a specific booking. include all the data for the cabin and the guest
*/
export async function getBookingDataById(bookingId) {
  const tableName = "bookings";

  let { data: bookings, error } = await supabase
    .from(tableName)
    .select(
      `
      *,
      cabinid (*),
      guestid (*)
    `,
    )
    .eq("id", bookingId)
    .single();

  if (error) {
    throw error;
  }

  return bookings;
}

/* 
update the ispaid and status fields for a specific booking
*/
export async function updateBookingStatus(bookingId, status, isPaid) {
  const tableName = "bookings";

  let { data: bookings, error } = await supabase
    .from(tableName)
    .update({ status, ispaid: isPaid })
    .eq("id", bookingId);

  if (error) {
    throw error;
  }

  return bookings;
}

/* 
get the following data from the bookings table, that will e used in the dashboard:
- startdate, enddate, status, totalprice
*/
export async function getBookingsForDashboard() {
  const table = "bookings";

  let { data: bookings, error } = await supabase.from(table).select(
    `
      id,
      startdate,
      enddate,
      numnights,
      status,
      totalprice,
      extrasprice
    `,
  );

  if (error) {
    throw error;
  }

  return bookings;
}

// get data to show in activity table
export async function getBookingsForActivityTable() {
  const table = "bookings";

  let { data: bookings, error } = await supabase
    .from(table)
    .select(
      `
      id,
      numnights,
      status,
      guestid (fullname)
    `,
    )
    .in("status", ["unconfirmed", "checked-in"])
    .limit(5);
  if (error) {
    throw error;
  }

  return bookings;
}
