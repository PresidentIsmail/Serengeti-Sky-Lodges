"use client";

import { useState, useRef, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Button } from "../ui/button";

const ContextMenu = ({ children }) => {
  const contextMenuRef = useRef(null);
  const [showContextMenu, setShowContextMenu] = useState(false);

  // Function to toggle the display of the context menu
  const toggleContextMenu = () => {
    setShowContextMenu((prevState) => !prevState);
  };

  // Event listener to close the context menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setShowContextMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={contextMenuRef}>
      {/* icon that will display the menu */}
      <span className="sr-only">Open options</span>
      <Button
        onClick={toggleContextMenu}
        className="relative mr-4 rounded-full bg-white p-2 hover:bg-gray-100"
      >
        <HiDotsVertical className="h-6 w-6 text-gray-800 " />
      </Button>
      {/* Context Menu */}
      {showContextMenu && (
        <div className="absolute right-16 top-0 overflow-hidden rounded-xl bg-white shadow-md">
          <div className="flex cursor-pointer flex-col">{children}</div>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
