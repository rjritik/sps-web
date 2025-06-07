import { NavLink } from "react-router-dom";
import IconDropdownArrow from "../../utils/icons/IconDropdownArrow";

const Breadcrumb = ({ items = [] }) => {
    return (
        <ul className="text-sm text-gray-2 flex items-center gap-2 pl-5 relative before:content-[''] before:bg-brown-light-1 before:w-2 before:h-full before:absolute before:left-0 before:top-0">
            {items.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                    <NavLink
                        to={item.link}
                        className={({ isActive }) =>
                            [
                                "hover:underline",
                                isActive
                                    ? "active text-xs text-gray-5 font-medium pointer-events-none"
                                    : "",
                            ].join(" ")
                        }
                    >
                        {item.title}
                    </NavLink>
                    {index < items.length - 1 && (
                        <span className="mx-1 mt-0.5">
                            <IconDropdownArrow className="w-[0.35rem] min-w-[0.35rem] h-auto opacity-50" />
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Breadcrumb;
