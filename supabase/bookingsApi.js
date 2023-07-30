// bookingsApi.js
import { supabase } from "./supabase";

/* 
get all the following data from the bookings table:
- startdate, enddate, status, totalprice
- there are two foreign keys (cabinid linked to cabin, guestid linked to guests) i want the name from cabin and the fullname, email from guests
*/
export async function getAllBookings() {
  const table = "bookings"; // Replace "bookings" with your actual table name

  let { data: bookings, error } = await supabase.from(table).select(`
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
    `);

  if (error) {
    throw error;
  }

  return bookings;
}

/* 
get all the data for a specific booking. include all the data for the cabin and the guest
*/
export async function getBookingDataById(bookingId) {
  const table = "bookings"; // Replace "bookings" with your actual table name

  let { data: bookings, error } = await supabase
    .from(table)
    .select(
      `
      *,
      cabinid (*),
      guestid (*)
    `,
    )
    .eq("id", bookingId);

  if (error) {
    throw error;
  }

  return bookings;
}
