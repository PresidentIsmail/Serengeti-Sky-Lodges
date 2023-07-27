import React from "react";

import Heading from "../ui/Heading";

const Header = () => {
  return (
    <header className="border-b-[1px] border-b-gray-100 bg-white px-8 py-4">
      <Heading as="h3">Header</Heading>
    </header>
  );
};

export default Header;
