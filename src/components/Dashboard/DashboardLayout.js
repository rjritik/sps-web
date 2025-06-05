import Sidebar from "../Sidebar/Sidebar";

const DashboardLayout = ({ children, className }) => {
    return (
        <div className="bg-neutral-100 flex min-h-screen">
            <Sidebar />

            <main className={`grow p-6 ${className ? className : ""}`}>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
