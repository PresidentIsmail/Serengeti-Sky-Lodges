"use client";

// third-party
import Link from "next/link";
import { useState } from "react";

const DashboardFilter = () => {
  const [selectedOption, setSelectedOption] = useState("last7"); // Initialize the selected option state, e.g., 'last7', 'last30', 'last90'

  return (
    <div className="flex h-10 items-center  justify-center space-x-4 rounded-md bg-white px-3 py-2 text-sm shadow-md">
      <Link href="dashboard?days=last7">
        <button
          onClick={() => setSelectedOption("last7")}
          className={`${
            selectedOption === "last7"
              ? "bg-black text-white"
              : "bg-transparent text-black hover:bg-purple-100"
          } rounded-md px-3 py-1 transition duration-200 focus:outline-none`}
        >
          Last 7 Days
        </button>
      </Link>

      <Link href="dashboard?days=last30">
        <button
          onClick={() => setSelectedOption("last30")}
          className={`${
            selectedOption === "last30"
              ? "bg-black text-white"
              : "bg-transparent text-black hover:bg-purple-100"
          } rounded-md px-3 py-1 transition duration-200 focus:outline-none`}
        >
          Last 30 Days
        </button>
      </Link>

      <Link href="dashboard?days=last90">
        <button
          onClick={() => setSelectedOption("last90")}
          className={`${
            selectedOption === "last90"
              ? "bg-black text-white"
              : "bg-transparent text-black hover:bg-purple-100"
          } rounded-md px-3 py-1 transition duration-200 focus:outline-none`}
        >
          Last 90 Days
        </button>
      </Link>
    </div>
  );
};

export default DashboardFilter;
