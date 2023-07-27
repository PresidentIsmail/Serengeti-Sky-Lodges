import React from "react";
import Image from "next/image";

import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

import logo from "@/public/img/logo-light.png";
import { SidebarLink } from "./SidebarLink";
import { SidebarIcon } from "./SidebarIcon";

const Sidebar = () => {
  return (
    <nav className="w-1/3 border-r-2 border-r-gray-100 bg-white px-8 py-12">
      {/* logo */}
      <Image src={logo} alt="logo" priority/>

      {/* links */}
      <ul className="mt-8 flex flex-col gap-4">
        <SidebarLink href="/dashboard">
          <SidebarIcon Icon={HiOutlineHome} />
          <span>Bookings</span>
        </SidebarLink>

        <SidebarLink href="/bookings">
          <SidebarIcon Icon={HiOutlineCalendarDays} />
          <span>Bookings</span>
        </SidebarLink>

        <SidebarLink href="/cabins">
          <SidebarIcon Icon={HiOutlineHomeModern} />
          <span>Cabins</span>
        </SidebarLink>

        <SidebarLink href="/users">
          <SidebarIcon Icon={HiOutlineUsers} />
          <span>Users</span>
        </SidebarLink>

        <SidebarLink href="/settings">
          <SidebarIcon Icon={HiOutlineCog6Tooth} />
          <span>Settings</span>
        </SidebarLink>
      </ul>
    </nav>
  );
};

export default Sidebar;
