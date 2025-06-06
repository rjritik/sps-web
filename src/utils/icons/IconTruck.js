import React from "react";

const IconTruck = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={26}
            height={20}
            viewBox="0 0 26 20"
            fill="none"
            {...props}
        >
            <path
                d="M20 17.584c.968 0 1.75-.782 1.75-1.75 0-.969-.782-1.75-1.75-1.75s-1.75.781-1.75 1.75c0 .968.782 1.75 1.75 1.75zm1.75-10.5h-2.917V10h5.204L21.75 7.084zM6 17.584c.968 0 1.75-.782 1.75-1.75 0-.969-.782-1.75-1.75-1.75s-1.75.781-1.75 1.75c0 .968.782 1.75 1.75 1.75zm16.333-12.25l3.5 4.666v5.834H23.5c0 1.936-1.563 3.5-3.5 3.5a3.495 3.495 0 01-3.5-3.5h-7c0 1.936-1.563 3.5-3.5 3.5a3.495 3.495 0 01-3.5-3.5H.167V3A2.325 2.325 0 012.5.667h16.333v4.667h3.5zM2.5 3v10.5h.887A3.515 3.515 0 016 12.334c1.038 0 1.972.455 2.613 1.166H16.5V3h-14z"
                fill="#000"
            />
        </svg>
    );
};

export default IconTruck;
