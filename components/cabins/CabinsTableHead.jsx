import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";

const CabinsTableHead = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead></TableHead>
        <TableHead>Cabin</TableHead>
        <TableHead>Capacity</TableHead>
        <TableHead>Price</TableHead>
        <TableHead className="text-right">Discount</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CabinsTableHead;
