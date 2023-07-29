"use client";

import { useState } from "react";
import Image from "next/image";

import { addSampleCabins } from "@/data/data-cabins";
import { addSampleGuests } from "@/data/data-guests";

import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { PiSpinnerGap } from "react-icons/pi";

import logo from "@/public/img/logo-light.png";
import { SidebarLink } from "./SidebarLink";
import { SidebarIcon } from "./SidebarIcon";
import { Button } from "../ui/button";

// sidebar component
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSampleDataAdded, setIsSampleDataAdded] = useState(false);

  // function to add sample data
  const addSampleData = async () => {
    try {
      // await addSampleCabins();
      // await addSampleGuests();
      setIsSampleDataAdded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsSampleDataAdded(false);
      }, 2000);
    }
  };

  // function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav
      className={`${
        isSidebarOpen ? "w-1/3" : "w-0"
      } relative border-r-2 border-r-gray-100 bg-white  px-8 py-12`}
    >
      {/* toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute right-2 top-6 text-black hover:text-black/70"
      >
        <TbLayoutSidebarLeftCollapse
          className={`${isSidebarOpen ? "" : "rotate-180"} h-7 w-7`}
        />
      </button>

      {/* logo */}
      <Image src={logo} alt="logo" priority />

      {/* links */}
      <ul className="mt-8 flex flex-col gap-4">
        <SidebarLink href="/dashboard">
          <SidebarIcon Icon={HiOutlineHome} />
          <span>Dashboard</span>
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

      {/* btn to add sample data */}
      <div className={`${isSidebarOpen ? "" : "hidden"} mt-10`}>
        <Button
          onClick={addSampleData}
          disabled={true}
          className="flex w-full items-center justify-center gap-2"
        >
          {isSampleDataAdded ? (
            <>
              <PiSpinnerGap className="h-5 w-5 animate-spin" />
              <span>Sample data added</span>
            </>
          ) : (
            <>
              <span>Add sample data</span>
            </>
          )}
        </Button>
      </div>
    </nav>
  );
};

export default Sidebar;
