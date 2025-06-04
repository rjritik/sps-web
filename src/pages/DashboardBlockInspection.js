import ContentCard from "../components/Card/ContentCard";
import Sidebar from "../components/Sidebar/Sidebar";

const quarryData = [
    {
        id: 1,
        title: "Deccan Granites",
        icon: "icon-granite",
        total: 35,
    },
    {
        id: 2,
        title: "AGS Deccan Granites",
        icon: "icon-granite",
        total: 35,
    },
    {
        id: 3,
        title: "HSD Granites",
        icon: "icon-granite",
        total: 35,
    },
    {
        id: 4,
        title: "JKE Deccan Granites",
        icon: "icon-granite",
        total: 31,
    },
    {
        id: 5,
        title: "WER Grey Marble",
        icon: "icon-marble",
        total: 22,
    },
    {
        id: 6,
        title: "SCA Grey Marble",
        icon: "icon-marble",
        total: 22,
    },
    {
        id: 7,
        title: "1 Deccan Granites",
        icon: "icon-granite",
        total: 64,
    },
    {
        id: 8,
        title: "White Marble",
        icon: "icon-marble",
        total: 14,
    },
    {
        id: 9,
        title: "Marble",
        icon: "icon-marble",
        total: 22,
    },
];

const DashboardBlockInspection = () => {
    return (
        <div className="bg-neutral-100 flex min-h-screen">
            <Sidebar />

            <main className="grow p-6">
                <div className="mb-6">
                    <h4 className="text-gradient-brown font-bold">
                        Block Inspection
                    </h4>
                </div>

                <div className="flex flex-wrap gap-6">
                    {quarryData.map((card) => {
                        return (
                            <ContentCard
                                key={card.id}
                                className="w-[calc(33.33%-1rem)]"
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default DashboardBlockInspection;
