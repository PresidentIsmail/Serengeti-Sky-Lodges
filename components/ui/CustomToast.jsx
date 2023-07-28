// CustomToast.js
import React from 'react';

const CustomToast = ({ message }) => {
  return (
    <div
      className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg"
      role="alert"
    >
      {message}
    </div>
  );
};

export default CustomToast;
