import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentCard from "../components/Card/ContentCard";
import { getTrucks } from "../store/slices/trucks/thunks";
import DashboardLayout from "../components/Dashboard/DashboardLayout";

const DashboardSecurityCheck = () => {
    const dispatch = useDispatch();
    const { trucks, isLoading, error } = useSelector((state) => state.trucks);

    console.log("trucks = ", trucks);

    useEffect(() => {
        dispatch(getTrucks());
    }, [dispatch]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <p>Loading trucks...</p>
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
                        Security Check - Trucks
                    </h4>
                </div>

                <div className="flex flex-wrap gap-6">
                    {trucks.map((truck) => (
                        <ContentCard
                            key={truck._id}
                            truckId={truck?._id}
                            invoiceNumber={
                                truck?.additionalDetails?.invoiceNumber
                            }
                            truckNumber={truck?.additionalDetails?.truckNumber}
                            quantity={truck?.additionalDetails?.purchasingUnit}
                            className="w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]"
                        />
                    ))}
                </div>
            </>
        );
    };

    return <DashboardLayout>{renderContent()}</DashboardLayout>;
};

export default DashboardSecurityCheck;
