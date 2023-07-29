import React, { useState } from "react";
import { TableBody } from "../ui/table";
import CabinsTableRow from "./CabinsTableRow";

const CabinsTableBody = ({ cabins, error, mutate }) => {
  // Local state to manage the display of the Context menu
  const [expandedItemIndex, setExpandedItemIndex] = useState(null);

  return (
    <TableBody>
      {cabins.map((cabin, index) => (
        <CabinsTableRow
          key={cabin.id}
          index={index}
          expandedItemIndex={expandedItemIndex}
          setExpandedItemIndex={setExpandedItemIndex}
          cabin={cabin}
          refreshOnCabinDelete={mutate}
        />
      ))}
    </TableBody>
  );
};
export default CabinsTableBody;
