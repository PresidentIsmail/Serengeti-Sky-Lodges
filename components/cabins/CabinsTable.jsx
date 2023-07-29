import CabinsTableHead from "./CabinsTableHead";
import CabinsTableBody from "./CabinsTableBody";
import { Table } from "@/components/ui/table";

const CabinsTable = ({ cabins, error, mutate }) => {
  return (
    <Table>
      <CabinsTableHead />
      <CabinsTableBody cabins={cabins} error={error} mutate={mutate} />
    </Table>
  );
};

export default CabinsTable;
