import React from "react";
import Link from "next/link";

// sidebar link
export const SidebarLink = ({ href, active,  children }) => {
  return (
    <Link
      href={href}
      className={`order-transparent group flex items-center gap-3 rounded-md px-6 py-3 text-base font-semibold text-gray-600 transition-all duration-300 focus:outline-none focus:ring focus:ring-violet-300 ${
        active
          ? "border-2 border-violet-300 bg-gray-50 text-gray-800"
          : "hover:bg-gray-50 hover:text-gray-800  active:bg-gray-50 active:text-gray-800"
      }`}
    >
      {children}
    </Link>
  );
};
