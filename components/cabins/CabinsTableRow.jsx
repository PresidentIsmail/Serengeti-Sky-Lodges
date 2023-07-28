"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCabinsFormContext } from "@/context/CabinsFormContext";

import { deleteCabin } from "@/supabase/cabinsApi";

import { CiEdit } from "react-icons/ci";
import { PiSpinnerBold, PiTrash } from "react-icons/pi";
import { formatCurrency } from "@/utils/helpers";
import { Button } from "../ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TableRow, TableCell } from "@/components/ui/table";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";


const placeholderImage = "https://placehold.co/600x400/png";

const CabinsTableRow = ({ cabin, refreshOnCabinDelete }) => {
  const {
    id: cabinId,
    name,
    maxcapacity,
    regularprice,
    discount,
    image,
  } = cabin;
  const [isLoading, setIsLoading] = useState(false);
  // get the state and dispatch function from the cabinsformcontext
  const toggleUpdateCabinForm = useCabinsFormContext().toggleUpdateCabinForm;
  const setCabins = useCabinsFormContext().setCabins;
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  // function to toggle the confirm delete modal
  const toggleConfirmDeleteModal = () => {
    setShowConfirmDeleteModal((prevState) => !prevState);
  };

  // when the user clicks the edit button, show the update cabin form and pass the cabin data to it
  const handleEditCabin = () => {
    toggleUpdateCabinForm();
    setCabins(cabin);
  };

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
    <>
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
        <TableCell>{maxcapacity}</TableCell>
        <TableCell className="font-semibold">
          {formatCurrency(regularprice)}
        </TableCell>
        <TableCell className="text-right text-green-600">
          {formatCurrency(discount)}
        </TableCell>
        <TableCell className="text-right">
          {/* Button to edit a cabin */}
          <Button
            onClick={() => handleEditCabin(cabin)}
            size="sm"
            className="mr-2 bg-green-700 hover:bg-green-700/80"
          >
            <CiEdit className="mr-2 h-5 w-5" />
            Edit
          </Button>

          {/* Button to delete a cabin */}
          <Button
            onClick={toggleConfirmDeleteModal}
            variant="destructive"
            size="sm"
            disabled={isLoading}
            className=" hover:hover:bg-red-500/80"
          >
            {isLoading ? (
              <>
                <PiSpinnerBold className="mr-2 h-5 w-5 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <PiTrash className="mr-2 h-5 w-5" />
                Delete
              </>
            )}
          </Button>
        </TableCell>
      </TableRow>

       {/* 
          show confirm delete modal when user clicks delete,t
          if user confirms, send submit
      */}
      {showConfirmDeleteModal && (
        <ConfirmDeleteModal
          onCancel={toggleConfirmDeleteModal}
          onConfirm={() => handleDeleteCabin(cabinId)}
        />
      )}
    </>
  );
};

export default CabinsTableRow;
