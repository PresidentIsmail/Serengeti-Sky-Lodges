import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BookingsTableHead = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Cabin</TableHead>
        <TableHead>Guest</TableHead>
        <TableHead>Check In</TableHead>
        <TableHead>Check Out</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Amount</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BookingsTableHead;
