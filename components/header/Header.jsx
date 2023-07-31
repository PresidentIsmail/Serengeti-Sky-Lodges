"use client"

// third-party
import { toast } from "react-hot-toast";

// api
import { logoutUser } from "@/supabase/authApi";

// components and icons
import { IoLogOutOutline } from "react-icons/io5";
import Heading from "../ui/Heading";
import { Button } from "@/components/ui/button";

const Header = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="flex justify-between border-b-[1px] border-b-gray-100 bg-white px-8 py-4">
      <Heading as="h3">Header</Heading>

      {/* logout btn */}
      <LogoutButton handleLogout={handleLogout} />
    </header>
  );
};


const LogoutButton = ({ handleLogout }) => {
  return (
    <Button
      onClick={handleLogout}
      className="flex items-center space-x-2 px-4 py-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition duration-200"
    >
      <IoLogOutOutline className="text-xl" />
      <span>Logout</span>
    </Button>
  );
};

export default Header;
