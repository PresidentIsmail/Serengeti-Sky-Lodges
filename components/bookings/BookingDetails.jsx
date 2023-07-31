"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import toast from "react-hot-toast";

// data access layer
import {
  getBookingDataById,
  updateBookingStatus,
} from "@/supabase/bookingsApi";

// ui components and icons
import { HiHome, HiUser, HiMail, HiFlag } from "react-icons/hi";
import { GiMoneyStack, GiBed, GiWoodCabin } from "react-icons/gi";
import { FiClock, FiCalendar, FiEdit } from "react-icons/fi";
import Loader from "@/components/loading/Loader";
import StatusBadge from "@/components/bookings/StatusBadge";
import { Button } from "@/components/ui/button";
import CheckInButton from "../CheckInButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "../ui/badge";

/* 
structure of the data object
[
  {
    "id": 3,
    "created_at": "2023-07-30T05:28:04.192449+00:00",
    "startdate": "2023-09-15T12:00:00",
    "enddate": "2023-09-22T09:45:36",
    "numnights": null,
    "numguests": 2,
    "cabinprice": 625,
    "extrasprice": null,
    "totalprice": 1250,
    "status": "unconfirmed",
    "hasbreakfast": false,
    "ispaid": false,
    "observation": "",
    "cabinid": {
      "id": 3,
      "created_at": "2023-07-29T10:10:44.097826+00:00",
      "name": "003",
      "maxcapacity": 4,
      "regularprice": 300,
      "discount": 0,
      "description": "Experience luxury family living in our medium-sized wooden cabin 003. Perfect for families of up to 4 people, this cabin offers a comfortable and inviting space with all modern amenities. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace, and a fully-equipped kitchen. The bedrooms feature plush beds and spa-like bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
      "image": null
    },
    "guestid": {
      "id": 4,
      "created_at": "2023-07-29T10:09:40.002592+00:00",
      "fullname": "Jonas Mueller",
      "email": "jonas@example.eu",
      "nationality": "Germany",
      "countryflag": "https://flagcdn.com/de.svg",
      "nationalid": "1233212288"
    }
  }
]
*/

const BookingDetails = ({ bookingId, page }) => {
  // fetch the booking data from supabase using SWR
  const { data, mutate } = useSWR(bookingId, getBookingDataById);
  // State for checkbox
  const [isPaid, setIsPaid] = useState(null);

  // useEffect to set the checkbox to checked if the booking is paid
  useEffect(() => {
    if (data) {
      setIsPaid(data.ispaid === "true");
    }
  }, [data]);

  // function to change whether the checkbox is checked or not
  const handleCheckboxChange = () => {
    setIsPaid((prev) => !prev);
  };

  // id there is no data yet, display a loading message
  if (!data)
    return (
      <>
        <div className="pt-16 text-lg">Loading Data...</div>
        <Loader />
      </>
    );

  // destructuring the data object
  const {
    id,
    created_at,
    startdate,
    enddate,
    numnights,
    numguests,
    cabinprice,
    extrasprice,
    totalprice,
    status,
    hasbreakfast,
    ispaid,
    observation,
    cabinid,
    guestid,
  } = data;
  // destructuring the cabinid object
  const {
    name,
    maxcapacity,
    regularprice,
    discount,
    description,
    image: cabinImg,
  } = cabinid;
  // destructuring the guestid object
  const {
    fullname: guestName,
    email: guestEmail,
    nationality: guestNationality,
    countryflag: guestCountryflag,
    nationalid: guestNationalid,
  } = guestid;

  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Function to format dates
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // function to format the date to month and day
  const formatMonthDay = (dateString) => {
    const options = { month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // calculate the number of nights from the start and end dates
  const start = new Date(startdate);
  const end = new Date(enddate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // function to set the status to confirmed and the ispaid to true for the booking. takes in the booking id
  async function handleCheckIn(id) {
    try {
      // update the booking status to checked-in and ispaid to true
      await updateBookingStatus(id, "checked-in", true);

      // Show a success toast
      toast.success("Booking has been checked in successfully!");

      // mutate the data to update the UI
      mutate();
    } catch (error) {
      // Show an error toast
      toast.error("Failed to check in the booking. Please try again.");
      console.error("Error checking in the booking:", error);
    }
  }

  return (
    <>
      <div className="space-y-8 rounded-lg bg-white p-8 shadow-lg">
        {/* Booking details */}
        <div className="border-b-2 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
          <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 lg:grid-cols-2">
            <div className="flex items-center space-x-2">
              <FiCalendar className="h-6 w-6 text-blue-500" />
              <p className="text-gray-600">
                Booking made on: {formatDate(created_at)}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <FiCalendar className="h-6 w-6 text-blue-500" />
              <p className="text-gray-600">
                Booked for {diffDays} {diffDays === 1 ? "night" : "nights"} from{" "}
                {formatMonthDay(startdate)} to {formatDate(enddate)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <FiClock className="h-6 w-6 text-blue-500" />
              <p className="text-gray-600">
                {diffDays} {diffDays === 1 ? "Night" : "Nights"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <HiHome className="h-6 w-6 text-blue-500" />
              <p className="text-gray-600">Cabin: {name}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-gray-600">
              Status: <StatusBadge>{status}</StatusBadge>
            </div>
          </div>
          {/* only display if there is an observation/request */}
          {observation && (
            <div className="mt-6">
              <p className="font-semibold text-gray-800">
                Request: {observation}
              </p>
            </div>
          )}
        </div>

        {/* Payment details */}
        <div className="border-b-2 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <GiMoneyStack className="h-6 w-6 text-green-500" />
              <p className="text-gray-600">
                Cabin Price: {formatCurrency(cabinprice)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <GiMoneyStack className="h-6 w-6 text-green-500" />
              <p className="text-gray-600">
                Extras Price: {formatCurrency(extrasprice)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <GiMoneyStack className="h-6 w-6 text-green-500" />
              <p className="text-gray-600">
                Total Price: {formatCurrency(totalprice)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <FiEdit className="h-6 w-6 text-green-500" />
              <p className="text-gray-600">
                Payment Status:{" "}
                {ispaid ? (
                  <Badge className="border-green-600 bg-green-100 text-green-600">
                    Paid
                  </Badge>
                ) : (
                  <Badge className="border-red-600 bg-red-100 text-red-600">
                    Not Paid
                  </Badge>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Guest details */}
        <div className={`${page === "bookings" ? "border-b-2" : ""} pb-4`}>
          <h2 className="text-2xl font-bold text-gray-800">Guest Details</h2>
          <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 lg:grid-cols-2">
            <div className="flex items-center space-x-2">
              <HiUser className="h-6 w-6 text-red-500" />
              <p className="text-gray-600">Name: {guestName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <HiMail className="h-6 w-6 text-red-500" />
              <p className="text-gray-600">Email: {guestEmail}</p>
            </div>
            <div className="flex items-center space-x-2">
              <HiFlag className="h-6 w-6 text-red-500" />
              <p className="text-gray-600">Nationality: {guestNationality}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FiEdit className="h-6 w-6 text-red-500" />
              <p className="text-gray-600">ID No: {guestNationalid}</p>
            </div>
          </div>
        </div>

        {/* Cabin details */}
        {/* only show cabin details on bookings/[id] page */}
        {page === "bookings" && (
          <div className="pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Cabin Details</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center rounded-lg bg-yellow-100 p-3">
                <GiWoodCabin className="h-8 w-8 text-yellow-500" />
                <p className="ml-2 font-semibold text-gray-800">Name: {name}</p>
              </div>
              <div className="flex items-center rounded-lg bg-yellow-100 p-3">
                <GiBed className="h-8 w-8 text-yellow-500" />
                <p className="ml-2 font-semibold text-gray-800">
                  Max Capacity: {maxcapacity}
                </p>
              </div>
              <div className="flex items-center rounded-lg bg-yellow-100 p-3">
                <GiMoneyStack className="h-8 w-8 text-yellow-500" />
                <p className="ml-2 font-semibold text-gray-800">
                  Regular Price: {formatCurrency(regularprice)}
                </p>
              </div>
              <div className="flex items-center rounded-lg bg-yellow-100 p-3">
                <GiMoneyStack className="h-8 w-8 text-yellow-500" />
                <p className="ml-2 font-semibold text-gray-800">
                  Discount: {formatCurrency(discount)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* show check-in btn if status is unconfirmed and page is bookings */}
      {status === "unconfirmed" && page === "bookings" && (
        <div className="mt-8">
          <CheckInButton>
            <Link href={`/checkin/${id}?page=checkin`}>Check in</Link>
          </CheckInButton>
        </div>
      )}

      {/* show a different checkin btn and checkbox if the page is check in and guest has not paid */}
      {page === "checkin" && !ispaid && (
        <div className="mt-8 flex justify-between">
          <div className="flex items-center space-x-2 font-semibold">
            <Checkbox
              id="isPaid"
              onClick={handleCheckboxChange}
              className=" border-green-400"
            />
            <label
              htmlFor="isPaid"
              className="text-base font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I confirm that {guestName} has paid the total amount of{" "}
              {formatCurrency(totalprice)}
            </label>
          </div>
          <div>
            <Button
              disabled={!isPaid}
              onClick={() => handleCheckIn(id)}
              className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Check In Booking #{id}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default BookingDetails;
