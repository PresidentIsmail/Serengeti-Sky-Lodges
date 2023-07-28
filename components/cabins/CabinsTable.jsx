"use client";

import React from "react";

import Loading from "@/app/loading";
import CabinsTableRow from "./CabinsTableRow";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";

const CabinsTable = ({ cabins, error, mutate }) => {
  

  return (
    <Table className="text-base">
      <TableHeader>
        <TableRow>
          <TableHead>Cabin</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Discount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cabins.map((cabin) => (
          <CabinsTableRow
            key={cabin.id}
            cabin={cabin}
            refreshOnCabinDelete={mutate}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default CabinsTable;
