import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSecurityChecks } from "../store/slices/inspector/thunks";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import ThumbnailCard from "../components/Card/ThumbnailCard";

const DashboardBlockInspection = () => {
  const dispatch = useDispatch();
  const { securityChecks, isLoading, error } = useSelector(
    (state) => state.inspector
  );

  useEffect(() => {
    dispatch(getSecurityChecks());
  }, [dispatch]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <p>Loading block inspections...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">Error: {error}</p>
        </div>
      );
    }

    return (
      <>
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <h4 className="text-gradient-brown font-bold">Block Inspections</h4>
          <div className="text-sm text-gray-1 font-medium">
            Total {securityChecks?.length || 0} Blocks
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          {securityChecks.map((securityCheck) => (
            <ThumbnailCard
              key={securityCheck._id}
              className="w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]"
              data={{
                refNumber: securityCheck?.blockMarkerRefNumber?.refNumber,
                type: securityCheck?.blockMarkerRefNumber?.type,
                dimensions: securityCheck?.blockMarkerRefNumber?.blockDimension,
                additionalDetails:
                  securityCheck?.blockMarkerRefNumber?.additionalDetails,
                parentPage: "block-inspection",
              }}
            />
          ))}
        </div>
      </>
    );
  };

  return <DashboardLayout>{renderContent()}</DashboardLayout>;
};

export default DashboardBlockInspection;
