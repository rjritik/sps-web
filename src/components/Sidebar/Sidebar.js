import { Image } from "@heroui/react";
import React from "react";

const Sidebar = () => {
    return (
        <aside className="bg-white p-6 w-72 min-w-72 shadow-sm">
            <Image
                src="/images/logo.svg"
                alt="logo"
                width={109}
                height={32}
                className="rounded-none shadow-none"
            />
        </aside>
    );
};

export default Sidebar;
