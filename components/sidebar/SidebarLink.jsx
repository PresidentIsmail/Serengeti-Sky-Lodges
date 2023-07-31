import React from "react";
import Link from "next/link";

// sidebar link
export const SidebarLink = ({ href, active,  children }) => {
  return (
    <Link
      href={href}
      className={`order-transparent group flex items-center gap-3 rounded-md px-8 py-[0.75rem] text-lg font-semibold text-gray-600 transition-all duration-300 focus:outline-none  ${
        active
          ? "border-2 border-violet-300 bg-gray-100 text-gray-800"
          : "hover:bg-gray-100 hover:text-gray-800  active:bg-gray-50 active:text-gray-800"
      }`}
    >
      {children}
    </Link>
  );
};
