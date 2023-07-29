"use client";

import { useAtom } from "jotai";
import { bookingsFilterOptionAtom } from "@/atoms";

const BookingsFilterBy = () => {
  const [bookingsFilterOption, setBookingsFilterOption] = useAtom(
    bookingsFilterOptionAtom,
  );

  const handleTabClick = (tab) => {
    setBookingsFilterOption(tab);
  };

  return (
    <div className="flex h-10 items-center  justify-center space-x-4 rounded-md bg-white px-3 py-2 text-sm shadow-md">
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
    </div>
  );
};

export default BookingsFilterBy;
