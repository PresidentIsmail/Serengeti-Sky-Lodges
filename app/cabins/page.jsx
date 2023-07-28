import React from "react";

import Heading from "@/components/ui/Heading";
import CabinsTable from "@/components/cabins/CabinsTable";
import CabinForm from "@/components/CabinForm";

async function Cabins() {
  return (
    <div>
      <div className="mb-8 flex items-baseline justify-between">
        <Heading as="h1">Cabins</Heading>
        <p className="text-xl">Filter/Sort</p>
      </div>

      {/* table display */}
      <CabinsTable />

      {/* add cabin form */}
      <CabinForm />
    </div>
  );
}

export default Cabins;
