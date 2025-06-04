import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import ContentCard from "../components/Card/ContentCard";
import { getQuarries } from "../store/slices/quarries/thunks";

const DashboardQuarry = () => {
    const dispatch = useDispatch();
    const { quarries, isLoading, error } = useSelector((state) => state.quarries);

    useEffect(() => {
        dispatch(getQuarries());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="bg-neutral-100 flex min-h-screen">
                <Sidebar />
                <main className="grow p-6">
                    <div className="flex items-center justify-center h-full">
                        <p>Loading quarries...</p>
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
                        On Going Quarries
                    </h4>
                </div>

                <div className="flex flex-wrap gap-6">
                    {quarries.map((quarry) => (
                         <ContentCard
                         key={quarry.id}
                         className="w-[calc(33.33%-1rem)]"
                     />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default DashboardQuarry;
