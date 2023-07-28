import React from "react";
import ReactDOM from "react-dom";

const ConfirmDeleteModal = ({ onCancel, onConfirm }) => {
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black opacity-80"></div>
      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="mr-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default ConfirmDeleteModal;
