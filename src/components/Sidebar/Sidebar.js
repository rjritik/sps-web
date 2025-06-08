import {
    Image,
    Dropdown,
    DropdownTrigger,
    User,
    DropdownMenu,
    DropdownItem,
    ScrollShadow,
} from "@heroui/react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/auth";
import IconDashboard from "../../utils/icons/IconDashboard";
import IconInbox from "../../utils/icons/IconInbox";
import IconCalendar from "../../utils/icons/IconCalendar";
import IconTruck2 from "../../utils/icons/IconTruck2";
import IconStatistic from "../../utils/icons/IconStatistic";
import IconNotification from "../../utils/icons/IconNotification";
import IconInfo from "../../utils/icons/IconInfo";
import IconSetting from "../../utils/icons/IconSetting";
import IconDropdownArrow from "../../utils/icons/IconDropdownArrow";

const iconMenu = {
    IconDashboard: IconDashboard,
    IconInbox: IconInbox,
    IconCalendar: IconCalendar,
    IconTruck: IconTruck2,
    IconStatistic: IconStatistic,
    IconNotification: IconNotification,
    IconSetting: IconSetting,
    IconInfo: IconInfo,
};

const primaryMenu = [
    {
        id: 1,
        title: "Dashboard",
        link: "/quarry",
        icon: "IconDashboard",
    },
    {
        id: 2,
        title: "Lorem 1",
        link: "/lorem-1",
        icon: "IconInbox",
    },
    {
        id: 3,
        title: "Lorem 2",
        link: "/lorem-2",
        icon: "IconCalendar",
        notification: true,
    },
    // {
    //     id: 4,
    //     title: "Lorem 3",
    //     link: "/lorem-3",
    //     icon: "IconTruck",
    // },
    // {
    //     id: 5,
    //     title: "Lorem 4",
    //     link: "/lorem-4",
    //     icon: "IconStatistic",
    // },
];

const settingMenu = [
    {
        id: 1,
        title: "Notifications",
        link: "/notifications",
        icon: "IconNotification",
        notification: true,
    },
    {
        id: 2,
        title: "Settings",
        link: "/settings",
        icon: "IconSetting",
    },
    {
        id: 3,
        title: "Support",
        link: "/support",
        icon: "IconInfo",
    },
];

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <aside className="bg-white p-6 w-72 min-w-72 shadow-md flex flex-col gap-6 relative z-[1]">
            <div>
                <Link to="/quarry">
                    <Image
                        removeWrapper
                        src="/images/logo.svg"
                        alt="logo"
                        width={109}
                        height={32}
                        className="rounded-none shadow-none"
                    />
                </Link>
            </div>

            <ScrollShadow
                hideScrollBar
                className="grow flex flex-col gap-6 max-h-[calc(100vh-195px)]"
                offset={100}
                orientation="horizontal"
            >
                {/* primary menu */}
                <ul className="mt-0">
                    {primaryMenu.map((menu) => {
                        const Icon = iconMenu[menu.icon];
                        return (
                            <li key={menu.id} className="">
                                <NavLink
                                    to={menu.link}
                                    className={({ isActive }) =>
                                        [
                                            "text-sm font-medium text-gray-2 flex items-center gap-4 px-5 py-3 transition-colors duration-200 rounded-full",
                                            isActive
                                                ? "bg-brown-light-1 active"
                                                : "bg-transparent",
                                        ].join(" ")
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {Icon && (
                                                <span className="relative">
                                                    <Icon
                                                        className={
                                                            isActive
                                                                ? "grayscale-0"
                                                                : "grayscale opacity-80"
                                                        }
                                                    />

                                                    {/* notification symbol */}
                                                    {menu?.notification && (
                                                        <span className="bg-orange-500 grayscale-0 opacity-100 border border-white w-2 min-w-2 aspect-square absolute -left-0.5 -bottom-0.5 rounded-2xl"></span>
                                                    )}
                                                </span>
                                            )}
                                            <span
                                                className={
                                                    isActive
                                                        ? "text-gradient-brown"
                                                        : "text-gray-2"
                                                }
                                            >
                                                {menu.title}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>

                {/* setting menu */}
                <ul className="pt-6 border-t-1 border-gray-2">
                    {settingMenu.map((menu) => {
                        const Icon = iconMenu[menu.icon];
                        return (
                            <li key={menu.id}>
                                <NavLink
                                    to={menu.link}
                                    className={({ isActive }) =>
                                        [
                                            "text-sm font-medium text-gray-2 flex items-center gap-4 px-5 py-3 transition-colors duration-200 rounded-full",
                                            isActive
                                                ? "bg-brown-light-1 active"
                                                : "bg-transparent",
                                        ].join(" ")
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {Icon && (
                                                <span className="relative">
                                                    <Icon
                                                        className={
                                                            isActive
                                                                ? "grayscale-0"
                                                                : "grayscale opacity-80"
                                                        }
                                                    />

                                                    {/* notification symbol */}
                                                    {menu?.notification && (
                                                        <span className="bg-orange-500 grayscale-0 opacity-100 border border-white w-2 min-w-2 aspect-square absolute -left-0.5 -bottom-0.5 rounded-2xl"></span>
                                                    )}
                                                </span>
                                            )}
                                            <span
                                                className={
                                                    isActive
                                                        ? "text-gradient-brown"
                                                        : "text-gray-2"
                                                }
                                            >
                                                {menu.title}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-auto">
                    <Image
                        src="/images/img-sidebar.jpg"
                        alt="sidebar image"
                        removeWrapper
                        width={372}
                        height={332}
                        className="mb-0 w-full max-w-full !h-auto rounded-none"
                    />
                </div>
            </ScrollShadow>

            <div className="pt-6 border-t-1 border-brown-light-2">
                <Dropdown placement="bottom-start" showArrow>
                    <DropdownTrigger className="cursor-pointer">
                        <div className="flex items-center gap-4">
                            <User
                                as="button"
                                avatarProps={{
                                    src: "/images/img-avatar.svg",
                                    className:
                                        "bg-transparent w-9 min-w-9 h-auto aspect-square rounded-full",
                                }}
                                description="Welcome back 👋" // description
                                name="Harish" // name
                                className="gap-4 justify-start opacity-100 w-[calc(100%-1.5rem)] transition-transform"
                                classNames={{
                                    wrapper:
                                        "flex-col-reverse w-[calc(100%-36px-16px)]",
                                    name: "text-sm font-medium text-left mt-1 w-full text-nowrap text-ellipsis overflow-hidden",
                                    description: "text-xs text-gray-1",
                                }}
                            />
                            <IconDropdownArrow className="w-1.5 min-w-1.5 h-auto" />
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                        <DropdownItem
                            key="logout"
                            color="danger"
                            onPress={handleLogout}
                        >
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </aside>
    );
};

export default Sidebar;
