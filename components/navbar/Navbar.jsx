import dynamic from "next/dynamic";

// components and icons
import Heading from "../ui/Heading";
import UserMenuComponentWithNoSSR from "./UserMenuComponentWithNoSSR";

// different way to import the UserMenu component as above
const UserMenu = dynamic(() => import("@/components/navbar/UserMenu"), {
  ssr: false,
});

const Navbar = () => {
  return (
    <header className="flex justify-between border-b-[1px] border-b-gray-100 bg-white px-8 py-4">
      <Heading as="h3">Header</Heading>

      {/* user profile */}
      <UserMenu />
    </header>
  );
};

export default Navbar;
