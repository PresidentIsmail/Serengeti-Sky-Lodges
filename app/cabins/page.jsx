"use client";

import { useState } from "react";
import useSWR from "swr";

import { getAllCabins } from "@/supabase/cabinsApi";
import Heading from "@/components/ui/Heading";
import CabinsTable from "@/components/cabins/CabinsTable";
import InsertCabinForm from "@/components/forms/InsertCabinForm";
import Loading from "../loading";
import { Button } from "@/components/ui/button";

const Cabins = () => {
  // fetch the cabins from supabase using SWR
  const {
    data: cabins,
    error,
    mutate,
    isLoading,
    isValidating,
  } = useSWR("/cabins", getAllCabins);

  // State to track whether the form should be shown
  const [showForm, setShowForm] = useState(false);

  // if there is an error fetching the data, display the error message
  if (error) return <div>Error loading cabins</div>;

  if (!cabins) return <Loading />;

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-8 flex items-baseline justify-between">
        <Heading as="h1">Cabins</Heading>
        <p className="text-xl">Filter/Sort</p>
      </div>

      {/* table display */}
      <CabinsTable cabins={cabins} error={error} mutate={mutate} />

      {/* Button to toggle the form */}
      <Button
        onClick={() => setShowForm(!showForm)}
        className="mt-4 w-fit self-center  bg-orange-600 hover:bg-orange-400"
      >
        {showForm ? "Hide form" : "Add new cabin"}
      </Button>

      {/* insert cabin form. only shown when user cliks btn above */}
      {showForm && <InsertCabinForm refreshOnCabinSubmit={mutate} />}
    </div>
  );
};

export default Cabins;
