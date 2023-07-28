"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { PiSpinnerBold } from "react-icons/pi";
import { TableRow, TableCell } from "@/components/ui/table";
import { deleteCabin } from "@/supabase/cabinsApi";
import { formatCurrency } from "@/utils/helpers";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "../ui/button";

const placeholderImage = "https://placehold.co/600x400/png";

const CabinsTableRow = ({ cabin, refreshOnCabinDelete }) => {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;
  const [isLoading, setIsLoading] = useState(false);

  // This code deletes a cabin from the database
  const handleDeleteCabin = async (cabinId) => {
    setIsLoading(true);
    try {
      await deleteCabin(cabinId);
      toast.success("Cabin deleted successfully");
      refreshOnCabinDelete();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting cabin");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TableRow className="h-full align-middle">
      <TableCell className="font-medium">
        <div className="h-[auto] w-[200px]">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={image || placeholderImage}
              alt={name}
              fill
              sizes="(max-width: 600px) 100vw, 600px"
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
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <PiSpinnerBold className="mr-2 h-5 w-5 animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CabinsTableRow;
