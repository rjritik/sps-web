import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import DashboardQuarry from "../../pages/DashboardQuarry";
import DashboardSecurityCheck from "../../pages/DashboardSecurityCheck";
import DashboardBlockInspection from "../../pages/DashboardBlockInspection";

const Navigation = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/quarry" element={<DashboardQuarry />} />
                <Route
                    exact
                    path="/security-check"
                    element={<DashboardSecurityCheck />}
                />
                <Route
                    exact
                    path="/block-inspection"
                    element={<DashboardBlockInspection />}
                />
            </Routes>
        </>
    );
};

export default Navigation;
