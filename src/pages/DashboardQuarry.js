import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentCard from "../components/Card/ContentCard";
import { getQuarries } from "../store/slices/quarries/thunks";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { Input } from "@heroui/react";
import IconSearch from "../utils/icons/IconSearch";

const DashboardQuarry = () => {
  const dispatch = useDispatch();
  const { quarries, isLoading, error } = useSelector((state) => state.quarries);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getQuarries());
  }, [dispatch]);

  // Filtered quarries based on search term
  const filteredQuarries = useMemo(() => {
    if (!searchTerm) return quarries;
    return quarries.filter((quarry) =>
      quarry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [quarries, searchTerm]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <p>Loading quarries...</p>
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
        {/* Top search bar */}
        <div className="pb-6 mb-6 border-b-1 border-neutral-200">
          <Input
            isClearable
            placeholder="Search Quarry Name"
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
          <h4 className="text-gradient-brown font-bold">On Going Quarries</h4>
        </div>

        <div className="flex flex-wrap gap-6">
          {filteredQuarries.length > 0 ? (
            filteredQuarries.map((quarry) => (
              <ContentCard
                key={quarry._id}
                name={quarry.name}
                quantity={quarry.value}
                address={quarry.address}
                location={quarry.location}
                refId={quarry.refId}
                image={quarry.imageUrl}
                className="w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]"
              />
            ))
          ) : (
            <div className="text-gray-500 ml-2">No Quarries found.</div>
          )}
        </div>
      </>
    );
  };

  return <DashboardLayout>{renderContent()}</DashboardLayout>;
};

export default DashboardQuarry;
