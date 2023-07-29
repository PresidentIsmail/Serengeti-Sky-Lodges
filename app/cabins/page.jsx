"use client";

// libraries
import { useCabinsFormContext } from "@/context/CabinsFormContext";
import { useAtom } from "jotai";
import { cabinsFilterOptionAtom, cabinsSortOptionAtom } from "@/atoms";
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
import CabinsFilter from "@/components/cabins/CabinsFilter";
import CabinsSortBy from "@/components/cabins/CabinsSortBy";

const Cabins = () => {
  // fetch the cabins from supabase using SWR
  const { data: cabins, error, mutate } = useSWR("/cabins", getAllCabins);

  const [filterOption] = useAtom(cabinsFilterOptionAtom);
  const [sortOption] = useAtom(cabinsSortOptionAtom);

  // filter the cabins based on the filter option
  const filteredCabins = cabins?.filter((cabin) => {
    if (filterOption === "all") return cabin;
    if (filterOption === "withDiscount") return cabin.discount > 0;
    if (filterOption === "noDiscount") return cabin.discount === 0;
  });

  // sort the filtered cabins based on the sort option
  const sortedCabins = filteredCabins?.sort((a, b) => {
    if (sortOption === "name-az") return a.name.localeCompare(b.name);
    if (sortOption === "name-za") return b.name.localeCompare(a.name);
    if (sortOption === "price-high") return b.regularprice - a.regularprice;
    if (sortOption === "price-low") return a.regularprice - b.regularprice;
    if (sortOption === "discount") return b.discount - a.discount;
  });

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
      <div className="mb-8 grid grid-cols-1 items-baseline justify-between gap-8">
        <div>
          <Heading as="h1">Cabins</Heading>
        </div>

        <div className="flex items-center justify-between">
          <CabinsFilter />

          <CabinsSortBy />
        </div>
      </div>

      {/* table display */}
      <CabinsTable cabins={sortedCabins} error={error} mutate={mutate} />

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
