import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentCard from "../components/Card/ContentCard";
import { getQuarries } from "../store/slices/quarries/thunks";
import DashboardLayout from "../components/Dashboard/DashboardLayout";

const DashboardQuarry = () => {
    const dispatch = useDispatch();
    const { quarries, isLoading, error } = useSelector(
        (state) => state.quarries
    );

    useEffect(() => {
        dispatch(getQuarries());
    }, [dispatch]);

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
                <div className="mb-6">
                    <h4 className="text-gradient-brown font-bold">
                        On Going Quarries
                    </h4>
                </div>

                <div className="flex flex-wrap gap-6">
                    {quarries.map((quarry) => (
                        <ContentCard
                            key={quarry?._id}
                            name={quarry?.name}
                            quantity={quarry?.value}
                            address={quarry?.address}
                            location={quarry?.location}
                            refId={quarry?.refId}
                            image={quarry?.imageUrl}
                            className="w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]"
                        />
                    ))}
                </div>
            </>
        );
    };

    return <DashboardLayout>{renderContent()}</DashboardLayout>;
};

export default DashboardQuarry;
