"use client";

import useSWR from "swr";

import { getAllCabins } from "@/supabase/cabinsApi";
import Heading from "@/components/ui/Heading";
import CabinsTable from "@/components/cabins/CabinsTable";
import InsertCabinForm from "@/components/forms/InsertCabinForm";
import Loading from "../loading";

const Cabins = () => {
  // fetch the cabins from supabase using SWR
  const {
    data: cabins,
    error,
    mutate,
    isLoading,
    isValidating,
  } = useSWR("/cabins", getAllCabins);

  // if there is an error fetching the data, display the error message
  if (error) return <div>Error loading cabins</div>;

  if (!cabins) return <Loading />;




  return (
    <div>
      <div className="mb-8 flex items-baseline justify-between">
        <Heading as="h1">Cabins</Heading>
        <p className="text-xl">Filter/Sort</p>
      </div>

      {/* table display */}
      <CabinsTable cabins={cabins} error={error} mutate={mutate} />

      {/* add cabin form */}
      <InsertCabinForm refreshOnCabinSubmit={mutate} />
    </div>
  );
};

export default Cabins;
