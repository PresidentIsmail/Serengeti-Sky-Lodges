"use client";

import { useState } from "react";
import { useCabinsFormContext } from "@/context/CabinsFormContext";
import useSWR from "swr";

import { getAllCabins } from "@/supabase/cabinsApi";
import Heading from "@/components/ui/Heading";
import CabinsTable from "@/components/cabins/CabinsTable";
import InsertCabinForm from "@/components/forms/InsertCabinForm";
import Loading from "../loading";
import { Button } from "@/components/ui/button";
import UpdateCabinForm from "@/components/forms/UpdateCabinForm";
import { updateSearchText } from "hyper-search/src/actions";

const Cabins = () => {
  // fetch the cabins from supabase using SWR
  const {
    data: cabins,
    error,
    mutate,
    isLoading,
    isValidating,
  } = useSWR("/cabins", getAllCabins);

  // get the state and dispatch function from the cabinsformcontext
  const showInsertCabinForm = useCabinsFormContext().showInsertCabinForm;
  const showUpdateCabinForm = useCabinsFormContext().showUpdateCabinForm;
  const toggleInsertCabinForm = useCabinsFormContext().toggleInsertCabinForm;

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
      {!showUpdateCabinForm && (
        <Button
          onClick={toggleInsertCabinForm}
          className="mt-4 w-fit self-center  bg-orange-600 hover:bg-orange-400"
        >
          {showInsertCabinForm ? "Hide form" : "Add new cabin"}
        </Button>
      )}

      {/* insertcabinform. only shown when user clicks btn above */}
      {showInsertCabinForm && <InsertCabinForm refreshOnCabinSubmit={mutate} />}
      {/* updatecabinform. only shown when user clicks the edit btn */}
      {showUpdateCabinForm && (
        <UpdateCabinForm  refreshOnCabinSubmit={mutate} />
      )}
    </div>
  );
};

export default Cabins;
