"use client";

// third-party
import { useRouter } from 'next/navigation'
import { toast } from "react-hot-toast";

// api
import { logoutUser } from "@/supabase/authApi";

// components and icons
import { IoLogOutOutline } from "react-icons/io5";
import Heading from "../ui/Heading";
import { Button } from "@/components/ui/button";

const Header = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/login");
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
      className="flex items-center space-x-2 rounded-full bg-gray-200 px-4 py-2 text-gray-600 transition duration-200 hover:bg-gray-300"
    >
      <IoLogOutOutline className="text-xl" />
      <span>Logout</span>
    </Button>
  );
};

export default Header;
