import { TableBody } from "../ui/table";
import CabinsTableRow from "./CabinsTableRow";

const CabinsTableBody = ({ cabins, mutate }) => {
  return (
    <TableBody>
      {cabins.map((cabin) => (
        <CabinsTableRow
          key={cabin.id}
          cabin={cabin}
          refreshOnCabinDelete={mutate}
        />
      ))}
    </TableBody>
  );
};
export default CabinsTableBody;
