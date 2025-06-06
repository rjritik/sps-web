import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentCard from "../components/Card/ContentCard";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { getBlocksByTruck } from "../store/slices/trucks/thunks";

const DashboardSecurityCheck = () => {
  const dispatch = useDispatch();
  const { blocksByTruck, isLoading, error } = useSelector(
    (state) => state.trucks
  );

  useEffect(() => {
    dispatch(getBlocksByTruck());
  }, [dispatch]);

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
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <h4 className="text-gradient-brown font-bold">Truck Details</h4>
          {/* <div className="text-sm text-gray-1 font-medium">
            Total {blocksByTruck?.length || 0} Trucks
          </div> */}
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {blocksByTruck.map((truck) => {
          return (
            <ContentCard
              key={truck?._id}
              truckId={truck?._id}
              quantity={truck?.totalBlocks}
              truckNumber={truck?.truckNumber}
              truckDetails={truck}
              className="w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]"
            />
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default DashboardSecurityCheck;
