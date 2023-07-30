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
import { HiDotsVertical } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TableRow, TableCell } from "@/components/ui/table";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import ContextMenu from "@/components/cabins/ContextMenu";

const placeholderImage = "https://placehold.co/600x400/png";

const CabinsTableRow = ({
  cabin,
  refreshOnCabinDelete,
  index,
  expandedItemIndex,
  setExpandedItemIndex,
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

  const expended = expandedItemIndex === index;
  // function to toggle the display of one context menu at a time
  const toggleContextMenu = () => {
    if (expended) {
      setExpandedItemIndex(null);
    } else {
      setExpandedItemIndex(index);
    }
  };

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
          <div className="relative">
            {/* icon that will display the menu */}
            <span className="sr-only">Open options</span>
            <Button
              onClick={toggleContextMenu}
              className="relative mr-4 rounded-full bg-white p-2 hover:bg-gray-100"
            >
              <HiDotsVertical className="h-6 w-6 text-gray-800 " />
            </Button>
            {/* Context Menu */}
            {expended && (
              <ContextMenu
                toggleConfirmDeleteModal={toggleConfirmDeleteModal}
                toggleUpdateCabinForm={handleEditCabin}
              />
            )}
          </div>
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
