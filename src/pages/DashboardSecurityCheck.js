import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentCard from "../components/Card/ContentCard";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { getBlocksByTruck } from "../store/slices/trucks/thunks";
import { Input } from "@heroui/react";
import IconSearch from "../utils/icons/IconSearch";

const DashboardSecurityCheck = () => {
  const dispatch = useDispatch();
  const { blocksByTruck, isLoading, error } = useSelector(
    (state) => state.trucks
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getBlocksByTruck());
  }, [dispatch]);

  const filteredTrucks = blocksByTruck?.filter((truck) =>
    truck.truckNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-1">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-red-500">{error}</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="pb-6 mb-6 border-b-1 border-neutral-200">
        <Input
          isClearable
          placeholder="Search Truck Number"
          startContent={<IconSearch size={18} />}
          type="search"
          variant="bordered"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          classNames={{
            base: "max-w-80 shadow-none",
            inputWrapper: "bg-white shadow-none",
            input: "text-ellipsis",
          }}
        />
      </div>

      <div className="mb-6">
        <h4 className="text-gradient-brown font-bold">Truck Details</h4>
      </div>

      <div className="flex flex-wrap gap-6">
        {filteredTrucks.length > 0 ? (
          filteredTrucks.map((truck) => (
            <ContentCard
              key={truck?._id}
              truckId={truck?._id}
              quantity={truck?.totalBlocks}
              truckNumber={truck?.truckNumber}
              truckDetails={truck}
              className="w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]"
            />
          ))
        ) : (
          <div className="text-gray-500 ml-2">No trucks found.</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardSecurityCheck;
