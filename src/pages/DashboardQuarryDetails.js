import ThumbnailCard from "../components/Card/ThumbnailCard";
import DashboardLayout from "../components/Dashboard/DashboardLayout";

const DashboardQuarryDetails = () => {
    return (
        <>
            <DashboardLayout>
                <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <h4 className="text-gradient-brown font-bold">
                            Deccan Granite
                        </h4>
                        <div className="text-sm text-gray-1 font-medium">
                            Total 35 Deccan Granites
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-6">
                    <ThumbnailCard className="w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)]" />
                </div>
            </DashboardLayout>
        </>
    );
};

export default DashboardQuarryDetails;
