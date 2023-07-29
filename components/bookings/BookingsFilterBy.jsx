"use client";

import { useAtom } from "jotai";
import { bookingsFilterOptionAtom } from "@/atoms";
import Link from "next/link";

const BookingsFilterBy = () => {
  const [bookingsFilterOption, setBookingsFilterOption] = useAtom(
    bookingsFilterOptionAtom,
  );

  const handleTabClick = (tab) => {
    setBookingsFilterOption(tab);
  };

  return (
    <div className="flex h-10 items-center  justify-center space-x-4 rounded-md bg-white px-3 py-2 text-sm shadow-md">
      <Link href="bookings?page=1">
        <button
          onClick={() => handleTabClick("all")}
          className={`${
            bookingsFilterOption === "all"
              ? "bg-black text-white"
              : "bg-transparent text-black hover:bg-purple-100"
          } rounded-md px-3 py-1 transition duration-200 focus:outline-none`}
        >
          All
        </button>
      </Link>

      <Link href="bookings?page=1">
        <button
          onClick={() => handleTabClick("checked-out")}
          className={`${
            bookingsFilterOption === "checked-out"
              ? "bg-black text-white"
              : "bg-transparent text-black hover:bg-purple-100"
          } rounded-md px-3 py-1 transition duration-200 focus:outline-none`}
        >
          Checked Out
        </button>
      </Link>

      <Link href="bookings?page=1">
        <button
          onClick={() => handleTabClick("checked-in")}
          className={`${
            bookingsFilterOption === "checked-in"
              ? "bg-black text-white"
              : "bg-transparent text-black hover:bg-purple-100"
          } rounded-md px-3 py-1 transition duration-200 focus:outline-none`}
        >
          Checked In
        </button>
      </Link>

      <Link href="bookings?page=1">
        <button
          onClick={() => handleTabClick("unconfirmed")}
          className={`${
            bookingsFilterOption === "unconfirmed"
              ? "bg-black text-white"
              : "bg-transparent text-black hover:bg-purple-100"
          } rounded-md px-3 py-1 transition duration-200 focus:outline-none`}
        >
          Unconfirmed
        </button>
      </Link>
    </div>
  );
};

export default BookingsFilterBy;
