"use client";

import { useAtom } from "jotai";
import { bookingsSortOptionAtom } from "@/atoms";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookingsSortBy = () => {
  const [bookingSortOption, setBookingSortOption] = useAtom(
    bookingsSortOptionAtom,
  );
  return (
    <Select
      className="bg-white shadow-md"
      defaultValue={bookingSortOption}
      onValueChange={(event) => setBookingSortOption(event)}
    >
      <SelectTrigger className="w-fit min-w-[180px] bg-white shadow-md">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="most-recent">Sort by most recent</SelectItem>
        <SelectItem value="oldest">Sort by oldest</SelectItem>
        <SelectItem value="amount-high">
          Sort by amount (High to Low)
        </SelectItem>
        <SelectItem value="amount-low">Sort by amount (Low to High)</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default BookingsSortBy;
