import { ScrollShadow } from "@heroui/react";
import Sidebar from "../Sidebar/Sidebar";

const DashboardLayout = ({ children, className }) => {
    return (
        <div className="bg-neutral-100 flex min-h-screen">
            <Sidebar />

            {/* <main className={`grow p-6 ${className ? className : ""}`}> */}
            <ScrollShadow
                as="main"
                hideScrollBar
                className={`grow p-6 h-screen ${className ? className : ""}`}
                offset={100}
                orientation="horizontal"
            >
                {children}
            </ScrollShadow>
            {/* </main> */}
        </div>
    );
};

export default DashboardLayout;
