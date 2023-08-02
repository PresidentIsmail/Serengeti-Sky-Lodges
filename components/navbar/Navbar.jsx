"use client";

import dynamic from "next/dynamic";
import { useAtom } from "jotai";
import { userFullNameAtom } from "@/atoms";

// components and icons
import Heading from "../ui/Heading";
import UserMenuComponentWithNoSSR from "./UserMenuComponentWithNoSSR";

// different way to import the UserMenu component as above
const UserMenu = dynamic(() => import("@/components/navbar/UserMenu"), {
  ssr: false,
});

const Navbar = () => {
  const [user] = useAtom(userFullNameAtom);

  console.log("user", user);

  // determine whether it is morning, afternoon or evening
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;
  if (hours < 12) {
    timeOfDay = "morning";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }

  return (
    <header className="flex justify-between items-center border-b-[1px] border-b-gray-100 bg-white px-8 py-4 pe-16 ps-8">
      <h2 className="font-semibold text-lg">
        Good {timeOfDay}, <span className="text-gray-500">{user}</span>
      </h2>

      {/* user profile */}
      <UserMenu />
    </header>
  );
};

export default Navbar;
