import { useLocation } from "react-router-dom";
import { useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import ThumbnailCard from "../components/Card/ThumbnailCard";
import IconTruck from "../utils/icons/IconTruck";
import { Input } from "@heroui/react";
import IconSearch from "../utils/icons/IconSearch";

const DashboardSecurityCheckDetails = () => {
  const location = useLocation();
  const truckDetails = location.state?.truckDetails || {};
  const { truckNumber, blocks } = truckDetails;

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlocks = blocks?.filter((block) =>
    block.refNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between ">
        <div className="flex items-center gap-4">
          <h4 className="text-gradient-brown font-bold flex items-center gap-2">
            <IconTruck /> Truck No:{" "}
            <span className="text-gray-1 font-normal">{truckNumber}</span>
          </h4>
          <div className="text-sm text-gray-1 font-medium">
            Total {blocks?.length || 0} Blocks
          </div>
        </div>

        <div>
          <Input
            isClearable
            placeholder="Search Reference Number"
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
      </div>

      <div className="flex flex-wrap gap-6">
        {filteredBlocks?.length > 0 ? (
          filteredBlocks.map((block) => (
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
                details: block,
              }}
            />
          ))
        ) : (
          <div className="text-gray-500">No blocks found.</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardSecurityCheckDetails;
