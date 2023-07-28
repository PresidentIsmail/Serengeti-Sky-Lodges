"use client";

import React from "react";
import useSWR from "swr";

import { getAllCabins } from "@/supabase/cabinsApi";
import  CabinsTableRow  from "./CabinsTableRow";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";


const CabinsTable = () => {
  // fetch the cabins from supabase using SWR
  const {
    data: cabins,
    error,
    mutate,
  } = useSWR("/cabins", getAllCabins);

  if (error) return <div>Error loading cabins.</div>;
  if (!cabins) return <div>Loading...</div>;

  return (
    <Table className="text-base">
      <TableHeader>
        <TableRow>
          <TableHead>Cabin</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Discount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cabins.map((cabin) => (
          <CabinsTableRow
            key={cabin.id}
            cabin={cabin}
            onCabinDelete={mutate}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default CabinsTable;
