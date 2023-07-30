"use client";

// libs and hooks
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCabinsFormContext } from "@/context/CabinsFormContext";

// utils and api
import { deleteCabin } from "@/supabase/cabinsApi";
import { formatCurrency } from "@/utils/helpers";

// components and icons
import { PiSpinnerBold, PiTrash } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TableRow, TableCell } from "@/components/ui/table";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import ContextMenu from "@/components/contextMenu/ContextMenu";
import ContextMenuButton from "@/components/contextMenu/ContextMenuButton";

const placeholderImage = "https://placehold.co/600x400/png";

const CabinsTableRow = ({
  cabin,
  refreshOnCabinDelete,
}) => {
  const {
    id: cabinId,
    name,
    maxcapacity,
    regularprice,
    discount,
    image,
  } = cabin;
  // get the state and dispatch function from the cabinsformcontext
  const toggleUpdateCabinForm = useCabinsFormContext().toggleUpdateCabinForm;
  const setCabins = useCabinsFormContext().setCabins;
  // Local state to manage the display of the ConfirmDeleteModal for each row
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
    try {
      await deleteCabin(cabinId);
      toast.success("Cabin deleted successfully");
      refreshOnCabinDelete();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting cabin");
    }
  };

  return (
    <>
      <TableRow className="h-full align-middle">
        <TableCell>
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
        <TableCell>{name}</TableCell>
        <TableCell>{maxcapacity}</TableCell>
        <TableCell className="font-semibold">
          {formatCurrency(regularprice)}
        </TableCell>
        <TableCell className="text-right text-green-600">
          {formatCurrency(discount)}
        </TableCell>

        {/* Context Menu - displays btns to edit & dlt */}
        <TableCell className="text-right ">
          <ContextMenu>
            <ContextMenuButton onClick={handleEditCabin} label="Edit">
              <CiEdit className="mr-2 h-6 w-6" />
            </ContextMenuButton>

            <ContextMenuButton
              onClick={toggleConfirmDeleteModal}
              label="Delete"
            >
              <PiTrash className="mr-2 h-6 w-6" />
            </ContextMenuButton>
          </ContextMenu>
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
