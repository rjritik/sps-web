import DashboardQuarry from "../../pages/DashboardQuarry";
import DashboardSecurityCheck from "../../pages/DashboardSecurityCheck";
import DashboardBlockInspection from "../../pages/DashboardBlockInspection";
import DashboardQuarryDetails from "../../pages/DashboardQuarryDetails";
import DashboardSecurityCheckDetails from "../../pages/DashboardSecurityCheckDetails";
import Login from "../../pages/Login";
import SecurityCheckAuditDetails from "../../pages/SecurityCheckAuditDetails";
import QuarryBlockDetails from "../../pages/QuarryBlockDetails";
import AddUpdateBlocks from "../../pages/AddUpdateBlocks";

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
        path: "/quarry/block-details",
        component: QuarryBlockDetails,
        allowedRoles: ["block_manager"],
    },
    { 
        path: "/quarry/add-update-blocks",
        component: AddUpdateBlocks,
        allowedRoles: ["block_manager"],
    },
    {
        path: "/quarry-details/:id",
        component: DashboardQuarryDetails,
        allowedRoles: ["block_manager"],
    },
    {
        path: "/security-check-details",
        component: DashboardSecurityCheckDetails,
        allowedRoles: ["security_manager"],
    },
    {
        path: "/security-check/audit-details",
        component: SecurityCheckAuditDetails,
        allowedRoles: ["security_manager"],
    },
];
