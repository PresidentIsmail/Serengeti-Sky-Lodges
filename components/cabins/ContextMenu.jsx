import React from "react";

import { PiSpinnerBold, PiTrash } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { Button } from "../ui/button";

const ContextMenu = ({ toggleConfirmDeleteModal, toggleUpdateCabinForm }) => {
  return (
    <div className=" absolute right-16 top-0 overflow-hidden rounded-xl  bg-white shadow-md">
      <div className="flex cursor-pointer flex-col">
        <>
          <ContextMenuButton onClick={toggleUpdateCabinForm} label="Edit" />
          <ContextMenuButton onClick={toggleConfirmDeleteModal} label="Delete" />
        </>
      </div>
    </div>
  );
};

const ContextMenuButton = ({ onClick, label }) => {
  // convert to lowercase
  label = label.toLowerCase();
  // capitalize first letter
  label = label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <Button
      onClick={onClick}
      size="sm"
      className="flex justify-start gap-2  bg-white  px-6 py-6 text-base font-semibold text-gray-500  transition hover:bg-neutral-100"
    >
      <span className="">
        {label === "Delete" && <PiTrash className="mr-2  h-6 w-6" />}
        {label === "Edit" && <CiEdit className="mr-2  h-6 w-6" />}
      </span>
      <span className="text-gray-500">{label}</span>
    </Button>
  );
};

/*
  <Button
      onClick={onClick}
size="sm"
className="px-4  py-3 grid items-center font-semibold  transition hover:bg-neutral-100"
>
<CiEdit className="mr-2 h-5 w-5" />
{label}
</Button>
 */

export default ContextMenu;
