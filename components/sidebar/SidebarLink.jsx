import React from "react";
import Link from "next/link";

// sidebar link
export const SidebarLink = ({ href, children }) => {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center border-b-2 border-b-gray-200 gap-3 rounded-sm border-transparent px-6 py-3 text-base font-semibold text-gray-600 transition-all duration-300 hover:bg-gray-50 hover:text-gray-800 focus:outline-none focus:ring focus:ring-violet-300 active:bg-gray-50 active:text-gray-800"
      >
        {children}
      </Link>
    </li>
  );
};
