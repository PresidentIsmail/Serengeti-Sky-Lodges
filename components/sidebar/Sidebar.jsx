"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { addSampleCabins } from "@/data/data-cabins";
import { addSampleGuests } from "@/data/data-guests";
import { addSampleBookings } from "@/data/data-bookings";

import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { VscAccount } from "react-icons/vsc";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { PiSpinnerGap } from "react-icons/pi";

import logo from "@/public/img/logo-light.png";
import { SidebarLink } from "./SidebarLink";
import { SidebarIcon } from "./SidebarIcon";
import { Button } from "../ui/button";

// sidebar component
const Sidebar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [addingSampleData, setAddingSampleData] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    // Set the default active link based on the current page
    setActiveLink(getBasePath(pathname));
  }, [pathname]);

  // Function to extract the base path from the URL
  function getBasePath(path) {
    const segments = path.split("/");
    return `/${segments[1]}`; // Assuming the base path is the second segment
  }

  // function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // function to add sample data
  const addSampleData = async () => {
    try {
      setAddingSampleData(true);
      // await addSampleCabins();
      // await addSampleGuests();
      await addSampleBookings();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setAddingSampleData(false);
      }, 2000);
    }
  };

  return (
    <nav
      className={`relative ${
        isSidebarOpen ? "px-8 " : "px-6"
      } min-w-max overflow-hidden border-r-2 border-r-gray-100 py-12`}
    >
      {/* sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute right-2 top-6 z-10 text-black transition-colors hover:text-violet-500"
      >
        <TbLayoutSidebarLeftCollapse
          className={`${isSidebarOpen ? "" : "rotate-180"} h-7 w-7`}
        />
      </button>

      {/* sidebar content */}
      <div
        className={`${
          isSidebarOpen ? "" : "hidden"
        } relative h-full w-full  bg-white  `}
      >
        {/* logo */}
        <div className="relative h-32 w-auto">
          <Image src={logo} alt="logo" fill priority />
        </div>

        {/* links */}
        <div className="mt-8 flex h-full w-max flex-col gap-4">
          <SidebarLink href="/dashboard" active={activeLink === "/dashboard"}>
            <SidebarIcon
              Icon={HiOutlineHome}
              active={activeLink === "/dashboard"}
            />
            <span>Dashboard</span>
          </SidebarLink>

          <SidebarLink href="/bookings" active={activeLink === "/bookings"}>
            <SidebarIcon
              Icon={HiOutlineCalendarDays}
              active={activeLink === "/bookings"}
            />
            <span>Bookings</span>
          </SidebarLink>

          <SidebarLink href="/cabins" active={activeLink === "/cabins"}>
            <SidebarIcon
              Icon={HiOutlineHomeModern}
              active={activeLink === "/cabins"}
            />
            <span>Cabins</span>
          </SidebarLink>

          <SidebarLink href="/users" active={activeLink === "/users"}>
            <SidebarIcon
              Icon={HiOutlineUsers}
              active={activeLink === "/users"}
            />
            <span>Create Users</span>
          </SidebarLink>

          <SidebarLink href="/settings" active={activeLink === "/settings"}>
            <SidebarIcon
              Icon={HiOutlineCog6Tooth}
              active={activeLink === "/settings"}
            />
            <span>Settings</span>
          </SidebarLink>

          {/* seperate the aount btn from the rest */}
          <SidebarLink href="/account" active={activeLink === "/account"}>
            <SidebarIcon Icon={VscAccount} active={activeLink === "/account"} />
            <span>Account</span>
          </SidebarLink>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

/* 

        <div className={`${isSidebarOpen ? "" : "hidden"} mt-10`}>
          <Button
            onClick={addSampleData}
            disabled={true}
            className="flex w-full items-center justify-center gap-2"
          >
            {addingSampleData ? (
              <>
                <PiSpinnerGap className="h-5 w-5 animate-spin" />
                <span>adding data...</span>
              </>
            ) : (
              <>
                <span>Add sample data</span>
              </>
            )}
          </Button>
        </div>
*/
