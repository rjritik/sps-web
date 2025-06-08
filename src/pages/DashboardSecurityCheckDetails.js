import { useLocation } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import ThumbnailCard from "../components/Card/ThumbnailCard";
import IconTruck from "../utils/icons/IconTruck";

const DashboardSecurityCheckDetails = () => {
  const location = useLocation();
  const truckDetails = location.state?.truckDetails || {};

  const { truckNumber, additionalDetails, blockDimension, blocks } =
    truckDetails;


  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <h4 className="text-gradient-brown font-bold flex items-center gap-2">
            <IconTruck /> Truck No:{" "}
            <span className="text-gray-1 font-normal">{truckNumber}</span>
          </h4>
          <div className="text-sm text-gray-1 font-medium">
            Total {blocks?.length || 0} Blocks
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {blocks?.map((block) => (
          <ThumbnailCard
            key={block._id}
            className="w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]"
            data={{
              refNumber: block?.refNumber,
              type: block?.type,
              color: block?.blockColor,
              qualityGrade: block?.blockQualityGrade,
              dimensions: block?.blockDimension,
              additionalDetails: block?.additionalDetails,
              dateTime: block.dateTime,
              parentPage: "security-check",
              details:block
            }}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardSecurityCheckDetails;
