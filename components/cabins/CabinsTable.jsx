import CabinsTableHead from "./CabinsTableHead";
import CabinsTableBody from "./CabinsTableBody";
import { Table } from "@/components/ui/table";

const CabinsTable = ({ cabins, error, mutate }) => {
  return (
    <Table className="text-base">
      <CabinsTableHead />
      <CabinsTableBody cabins={cabins} error={error} mutate={mutate} />
    </Table>
  );
};



export default CabinsTable;
