import TableHeader from "../../ui/TableHeader";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

function CabinsTable() {
  const CabinsTableHeadings = [
    " ",
    "Cabin",
    "Capacity",
    "Price",
    "Discount",
    " ",
  ];
  const { cabins, isLoading, error } = useCabins();
  if (isLoading) return <div>.....</div>;
  console.log(error);

  return (
    <div className="">
      <TableHeader
        columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}
        data={CabinsTableHeadings}
      />
      <div className="border border-gray-200 overflow-hidden rounded-b-md">
        {cabins?.map((cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        ))}
      </div>
    </div>
  );
}

export default CabinsTable;
