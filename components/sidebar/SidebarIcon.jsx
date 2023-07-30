import React from "react";

// sidebar icon
export const SidebarIcon = ({ Icon, active }) => {
  return (
    <Icon
      className={`h-5 w-5 ${
        active ? "text-violet-600" : "text-gray-500"
      } transition duration-300 group-hover:text-violet-600 group-focus:text-violet-600`}
    />
  );
};
