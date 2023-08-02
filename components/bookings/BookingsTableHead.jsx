import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BookingsTableHead = () => {
  return (
    <TableHeader className="">
      <TableRow className="">
        <TableHead className="w-[100px] rounded-tl-lg">
          Cabin
        </TableHead>
        <TableHead>Guest</TableHead>
        <TableHead>Check In</TableHead>
        <TableHead>Check Out</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Amount</TableHead>
        <TableHead className=" rounded-tr-lg "></TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BookingsTableHead;
