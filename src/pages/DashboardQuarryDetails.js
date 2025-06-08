import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import ThumbnailCard from "../components/Card/ThumbnailCard";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { getQuarryByReferenceId } from "../store/slices/quarries/thunks";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { Button, Input } from "@heroui/react";
import IconSearch from "../utils/icons/IconSearch";
import Filter from "../components/Filter/Filter";
import AddBlockRefModal from "../components/Modal/AddBloackRefModal";


const breadcrumbItems = [
  { title: "On Going Quarries", link: "/quarry" },
  { title: "SCA Grey Granite", link: "" },
];

const DashboardQuarryDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const { blockByQuarry, isLoading, error } = useSelector(
    (state) => state.quarries
  );
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onOpenChange = (open) => setIsOpen(open);

  // Get quarry name from navigation state
  const quarryName = location.state?.quarryName || "Quarry Details";

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
    <div className="bg-white px-6 py-4 -mx-6 -mt-6 mb-6">
        <Breadcrumb items={breadcrumbItems} />
    </div>

    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
            <h4 className="text-gradient-brown font-bold">
                {quarryName}
            </h4>
            <div className="text-sm text-gray-1 font-medium">
                Total {blockByQuarry?.length || 0} {quarryName}
            </div>
        </div>

        <div className="flex flex-wrap gap-4">
            {/* search input */}
            <Input
                isClearable
                placeholder="Search Block Marker Reference No"
                startContent={<IconSearch size={18} />}
                type="search"
                variant="bordered"
                classNames={{
                    base: "w-screen max-w-80 shadow-none",
                    inputWrapper: "bg-white shadow-none",
                    input: "text-ellipsis",
                }}
            />

            {/* filter */}
            <Filter />

            {/* button */}
            <Button color="primary" onPress={()=>onOpen()}>Add New Block</Button>
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
                    details: block,
                }}
            />
        ))}
    </div>
    {isOpen && (
        <AddBlockRefModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title="Add New Block"
        />
      )}
</DashboardLayout>

     
  );
};

export default DashboardQuarryDetails;
