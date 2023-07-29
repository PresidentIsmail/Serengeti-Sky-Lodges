import { useAtom } from "jotai";
import { cabinsFilterOptionAtom } from "@/atoms";

const CabinsFilter = () => {
  const [filterOption, setFilterOption] = useAtom(cabinsFilterOptionAtom);

  const handleTabClick = (tab) => {
    setFilterOption(tab);
  };

  return (
    <div className="flex h-10 items-center  justify-center space-x-4 rounded-md bg-white px-3 py-2 text-sm shadow-md">
      <button
        onClick={() => handleTabClick("all")}
        className={`${
          filterOption === "all"
            ? "bg-black text-white"
            : "bg-transparent text-black hover:bg-purple-100"
        } rounded-md px-3 py-1 transition duration-200 focus:outline-none`}
      >
        All
      </button>
      <button
        onClick={() => handleTabClick("withDiscount")}
        className={`${
          filterOption === "withDiscount"
            ? "bg-black text-white"
            : "bg-transparent text-black hover:bg-purple-100"
        } rounded-md px-3 py-1 transition duration-200 focus:outline-none`}
      >
        With Discount
      </button>
      <button
        onClick={() => handleTabClick("noDiscount")}
        className={`${
          filterOption === "noDiscount"
            ? "bg-black text-white"
            : "bg-transparent text-black hover:bg-purple-100"
        } rounded-md px-3 py-1 transition duration-200 focus:outline-none`}
      >
        No Discount
      </button>
    </div>
  );
};

export default CabinsFilter;
