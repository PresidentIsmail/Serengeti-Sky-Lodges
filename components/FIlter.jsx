import { useState } from "react";

const Filter = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex items-center justify-center space-x-4 rounded-lg bg-white p-4 shadow-md">
      <button
        onClick={() => handleTabClick("all")}
        className={`${
          activeTab === "all"
            ? "bg-purple-500 text-white"
            : "bg-transparent text-purple-500 hover:bg-purple-100"
        } rounded-lg px-4 py-2 transition duration-200 focus:outline-none`}
      >
        All
      </button>
      <button
        onClick={() => handleTabClick("withDiscount")}
        className={`${
          activeTab === "withDiscount"
            ? "bg-purple-500 text-white"
            : "bg-transparent text-purple-500 hover:bg-purple-100"
        } rounded-lg px-4 py-2 transition duration-200 focus:outline-none`}
      >
        With Discount
      </button>
      <button
        onClick={() => handleTabClick("noDiscount")}
        className={`${
          activeTab === "noDiscount"
            ? "bg-purple-500 text-white"
            : "bg-transparent text-purple-500 hover:bg-purple-100"
        } rounded-lg px-4 py-2 transition duration-200 focus:outline-none`}
      >
        No Discount
      </button>
    </div>
  );
};

export default Filter;
