"use client";

// third-party
import Link from "next/link";
import { useState } from "react";

const DashboardFilter = ({filter}) => {
  const [selectedOption, setSelectedOption] = useState(filter); // Initialize the selected option state, e.g., 'last14', 'last30', 'last90'

  return (
    <div className="flex h-10 items-center  justify-center space-x-4 border rounded-md bg-white px-3 py-2 text-sm shadow-md">
      <Link href="dashboard?days=last14">
        <button
          onClick={() => setSelectedOption("last14")}
          className={`${
            selectedOption === "last14"
              ? "bg-black text-white"
              : "bg-transparent text-black hover:bg-purple-100"
          } rounded-md px-3 py-1 transition duration-200 focus:outline-none`}
        >
          Last 14 Days
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
