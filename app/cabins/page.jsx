"use client";

// libraries
import { useState } from "react";
import { useCabinsFormContext } from "@/context/CabinsFormContext";
import useSWR from "swr";

// supabase api
import { getAllCabins } from "@/supabase/cabinsApi";

// components
import Loading from "../loading";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import CabinsTable from "@/components/cabins/CabinsTable";
import InsertCabinForm from "@/components/forms/InsertCabinForm";
import UpdateCabinForm from "@/components/forms/UpdateCabinForm";
import FormModal from "@/components/modals/FormModal";
import Filter from "@/components/FIlter";

const Cabins = () => {
  // fetch the cabins from supabase using SWR
  const { data: cabins, error, mutate } = useSWR("/cabins", getAllCabins);

  // get the state and dispatch function from the cabinsformcontext
  const showInsertCabinForm = useCabinsFormContext().showInsertCabinForm;
  const showUpdateCabinForm = useCabinsFormContext().showUpdateCabinForm;
  const toggleInsertCabinForm = useCabinsFormContext().toggleInsertCabinForm;
  const toggleUpdateCabinForm = useCabinsFormContext().toggleUpdateCabinForm;

  // if there is an error fetching the data, display the error message
  if (error) return <div>Error loading cabins</div>;

  if (!cabins) return <Loading />;

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-8 flex items-baseline justify-between">
        <Heading as="h1">Cabins</Heading>
        <Filter />
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
      {showInsertCabinForm && (
        <FormModal toggleForm={toggleInsertCabinForm}>
          <InsertCabinForm refreshOnCabinSubmit={mutate} />
        </FormModal>
      )}

      {/* updatecabinform. only shown when user clicks the edit btn */}
      {showUpdateCabinForm && (
        <FormModal toggleForm={toggleUpdateCabinForm}>
          <UpdateCabinForm refreshOnCabinSubmit={mutate} />
        </FormModal>
      )}
    </div>
  );
};

export default Cabins;
