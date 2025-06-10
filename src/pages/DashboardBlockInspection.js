import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSecurityChecks } from "../store/slices/inspector/thunks";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import ThumbnailCard from "../components/Card/ThumbnailCard";
import { Input } from "@heroui/react";
import IconSearch from "../utils/icons/IconSearch";
import Filter from "../components/Filter/Filter";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

const breadcrumbItems = [{ title: "Total Block List", link: "" }];

const DashboardBlockInspection = () => {
  const dispatch = useDispatch();
  const { securityChecks, isLoading, error } = useSelector(
    (state) => state.inspector
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getSecurityChecks());
  }, [dispatch]);

  const filteredChecks = securityChecks?.filter((check) =>
    check?.blockMarkerRefNumber?.refNumber
      ?.toLowerCase()
      ?.includes(searchTerm.toLowerCase())
  );

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
        <div className="bg-white px-6 py-4 -mx-6 -mt-6 mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <h4 className="text-gradient-brown font-bold flex items-center gap-2 pl-5 relative before:content-[''] before:bg-brown-light-1 before:w-2 before:h-full before:absolute before:left-0 before:top-0">
              Block Inspections
            </h4>
            <div className="text-sm text-gray-1 font-medium">
              Total {filteredChecks?.length || 0} Blocks
            </div>
          </div>

          <div className="flex gap-4">
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

            {/* filter */}
            <Filter />
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          {filteredChecks?.map((securityCheck) => (
            <ThumbnailCard
              key={securityCheck._id}
              className="w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]"
              data={{
                refNumber: securityCheck?.blockMarkerRefNumber?.refNumber,
                type: securityCheck?.blockMarkerRefNumber?.type,
                dimensions: securityCheck?.blockMarkerRefNumber?.blockDimension,
                additionalDetails:
                  securityCheck?.blockMarkerRefNumber?.additionalDetails,
                details: securityCheck,
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
