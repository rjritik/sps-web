import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import ContentCard from "../components/Card/ContentCard";
import { getBlockInspections } from "../store/slices/inspector/thunks";

const DashboardBlockInspection = () => {
    const dispatch = useDispatch();
    const { blockInspections, isLoading, error } = useSelector(
        (state) => state.inspector
    );

    console.log("blockInspections = ", blockInspections);

    useEffect(() => {
        dispatch(getBlockInspections());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="bg-neutral-100 flex min-h-screen">
                <Sidebar />
                <main className="grow p-6">
                    <div className="flex items-center justify-center h-full">
                        <p>Loading block inspections...</p>
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
                        Block Inspections
                    </h4>
                </div>

                <div className="flex flex-wrap gap-6">
                    {blockInspections.map((inspection) => (
                        <ContentCard
                            key={inspection._id}
                            className="w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]"
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default DashboardBlockInspection;
