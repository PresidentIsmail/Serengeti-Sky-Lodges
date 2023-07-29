import React, {  useState } from "react";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const ConfirmDeleteModal = ({ onCancel, onConfirm }) => {
  const modalRef = useRef(null);

  const [isDeleting, setIsDeleting] = useState(false);


  // when a click is detected outside the modal, close the form
  // useEffect(() => {
  //   const closeForm = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       toggleConfirmDeleteModal();
  //     }
  //   };

  //   // add event listener to the window
  //   window.addEventListener("click", closeForm, true);

  //   // remove event listener when component unmounts
  //   return () => {
  //     window.removeEventListener("click", closeForm);
  //   };
  // }, [toggleConfirmDeleteModal]);

  // function to handle delete btn
  const handleDelete = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black/20"></div>
      <div
        ref={modalRef}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-lg font-semibold">Confirm Delete</h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onCancel }
            className="mr-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ConfirmDeleteModal;
