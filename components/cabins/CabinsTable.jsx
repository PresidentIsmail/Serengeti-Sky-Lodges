"use client";

import React from "react";
import useSWR from "swr";
import Image from "next/image";

import { getAllCabins, deleteCabin } from "@/supabase/cabinsApi";
import { formatCurrency } from "@/utils/helpers";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "../ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const CabinsTable = () => {
  // fetch the cabins from supabase
  const { data: cabins, error, mutate } = useSWR("/cabins", getAllCabins);

  if (error) return <div>Error loading cabins.</div>;
  if (!cabins) return <div>Loading...</div>;

  return (
    <Table className="text-base">
      <TableHead>
        <TableRow>
          <TableCell>Cabin</TableCell>
          <TableCell>Capacity</TableCell>
          <TableCell>Price</TableCell>
          <TableCell className="text-right">Discount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cabins.map((cabin) => (
          <CabinsTableRow key={cabin.id} cabin={cabin} onCabinDelete={mutate} />
        ))}
      </TableBody>
    </Table>
  );
};

// separate component for the table row
const CabinsTableRow = ({ cabin, onCabinDelete }) => {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  // function to delete a cabin. takes in the cabin id
  async function handleDeleteCabin(cabinId) {
    console.log("deleting cabin with id:", cabinId);
    try {
      await deleteCabin(cabinId);
      // refresh the cabins list
      onCabinDelete();
    } catch (error) {
      console.error("Error deleting cabin:", error);
    }
  }

  return (
    <TableRow className="h-full align-middle">
      <TableCell className="font-medium">
        <div className="h-[auto] w-[200px]">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={image || "https://placehold.co/600x400/png"}
              alt={name}
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{maxCapacity}</TableCell>
      <TableCell className="font-semibold">
        {formatCurrency(regularPrice)}
      </TableCell>
      <TableCell className="text-right text-green-600">
        {formatCurrency(discount)}
      </TableCell>
      <TableCell className="text-right">
        <Button
          onClick={() => handleDeleteCabin(cabinId)}
          variant="destructive"
          size="sm"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CabinsTable;
