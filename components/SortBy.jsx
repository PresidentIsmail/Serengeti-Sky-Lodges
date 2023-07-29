import { useAtom } from "jotai";
import { sortOptionAtom } from "@/atoms";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SortBy = () => {
  const [sortOption, setSortOption] = useAtom(sortOptionAtom);

  return (
    <Select
      className="bg-white shadow-md"
      defaultValue={sortOption}
      onValueChange={(event) => setSortOption(event)}
    >
      <SelectTrigger className="w-fit min-w-[180px] bg-white shadow-md">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name-az">Sort by name (A-Z)</SelectItem>
        <SelectItem value="name-za">Sort by name (Z-A)</SelectItem>
        <SelectItem value="price-high">Sort by price (High to Low)</SelectItem>
        <SelectItem value="price-low">Sort by price (Low to High)</SelectItem>
        <SelectItem value="discount">Sort by discount</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortBy;
