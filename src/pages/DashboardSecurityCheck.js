import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import ContentCard from "../components/Card/ContentCard";
import { getTrucks } from "../store/slices/trucks/thunks";

const DashboardSecurityCheck = () => {
    const dispatch = useDispatch();
    const { trucks, isLoading, error } = useSelector((state) => state.trucks);

    console.log("trucks = ", trucks);

    useEffect(() => {
        dispatch(getTrucks());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="bg-neutral-100 flex min-h-screen">
                <Sidebar />
                <main className="grow p-6">
                    <div className="flex items-center justify-center h-full">
                        <p>Loading trucks...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-neutral-100 flex min-h-screen">
                <Sidebar />
                <main className="grow p-6">
                    <div className="flex items-center justify-center h-full">
                        <p className="text-red-500">Error: {error}</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-neutral-100 flex min-h-screen">
            <Sidebar />

            <main className="grow p-6">
                <div className="mb-6">
                    <h4 className="text-gradient-brown font-bold">
                        Security Check - Trucks
                    </h4>
                </div>

                <div className="flex flex-wrap gap-6">
                    {trucks.map((truck) => (
                        <ContentCard
                            key={truck._id}
                            truckNumber={truck?.additionalDetails?.truckNumber}
                            quantity={truck?.additionalDetails?.purchasingUnit}
                            className="w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]"
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default DashboardSecurityCheck;
