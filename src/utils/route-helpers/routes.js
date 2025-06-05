import DashboardQuarry from "../../pages/DashboardQuarry";
import DashboardSecurityCheck from "../../pages/DashboardSecurityCheck";
import DashboardBlockInspection from "../../pages/DashboardBlockInspection";
import DashboardQuarryDetails from "../../pages/DashboardQuarryDetails";
import DashboardSecurityCheckDetails from "../../pages/DashboardSecurityCheckDetails";
import Login from "../../pages/Login";

export const routes = [
    {
        path: "/login",
        component: Login,
        isPublic: true,
    },
    {
        path: "/quarry",
        component: DashboardQuarry,
        allowedRoles: ["block_manager"],
    },
    {
        path: "/security-check",
        component: DashboardSecurityCheck,
        allowedRoles: ["security_manager"],
    },
    {
        path: "/block-inspection",
        component: DashboardBlockInspection,
        allowedRoles: ["block_inspector"],
    },
    {
        path: "/quarry-details/:id",
        component: DashboardQuarryDetails,
        allowedRoles: ["block_manager"],
    },
    {
        path: "/security-check-details/:id",
        component: DashboardSecurityCheckDetails,
        allowedRoles: ["security_manager"],
    },
];
