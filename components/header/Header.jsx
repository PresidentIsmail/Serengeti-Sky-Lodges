// components and icons
import Heading from "../ui/Heading";
import UserMenuComponentWithNoSSR from "./UserMenuComponentWithNoSSR";

const Header = () => {
  return (
    <header className="flex justify-between border-b-[1px] border-b-gray-100 bg-white px-8 py-4">
      <Heading as="h3">Header</Heading>

      {/* user profile */}
      <UserMenuComponentWithNoSSR />
    </header>
  );
};

export default Header;
