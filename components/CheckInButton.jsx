"use client";

import { Button } from "./ui/button";

const CheckInButton = ({ onClick, id = "", children }) => {
  return (
    <Button
      asChild
      onClick={onClick || (() => {})}
      className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      {children} 
    </Button>
  );
};

export default CheckInButton;
