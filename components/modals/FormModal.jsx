import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const FormModal = ({ children, toggleForm }) => {
  const modalRef = useRef(null);

  // when a click is detected outside the modal, close the form
  useEffect(() => {
    const closeForm = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleForm();
      }
    };

    // add event listener to the window
    window.addEventListener("click", closeForm, true);

    // remove event listener when component unmounts
    return () => {
      window.removeEventListener("click", closeForm);
    };
  }, [toggleForm]);

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black opacity-80"></div>
      <div
        ref={modalRef}
        className="modal-content fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center"
      >
        {children}
      </div>
    </>,
    // append to the body
    document.body,
  );
};

export default FormModal;
