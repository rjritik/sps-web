import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import ThumbnailCard from "../components/Card/ThumbnailCard";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { getQuarryByReferenceId } from "../store/slices/quarries/thunks";

const DashboardQuarryDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const { blockByQuarry, isLoading, error } = useSelector(
    (state) => state.quarries
  );

  // Get quarry name from navigation state
  const quarryName = location.state?.quarryName || "Quarry Details";

  console.log("location.state = ", location.state);

  useEffect(() => {
    if (id) {
      dispatch(getQuarryByReferenceId(id));
    }
  }, [dispatch, id]);

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
          <h4 className="text-gradient-brown font-bold">{quarryName}</h4>
          <div className="text-sm text-gray-1 font-medium">
            Total {blockByQuarry?.length || 0} {quarryName}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {blockByQuarry?.map((block) => (
          <ThumbnailCard
            key={block._id}
            className="w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]"
            data={{
              refNumber: block?.refNumber,
              type: block.type,
              color: block?.blockColor,
              qualityGrade: block?.blockQualityGrade,
              dimensions: block?.blockDimension,
              additionalDetails: block?.additionalDetails,
              dateTime: block?.dateTime,
            }}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardQuarryDetails;
