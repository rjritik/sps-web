import React from "react";

const IconFilter = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 24 24"
            height="200px"
            width="200px"
            {...props}
        >
            <path fill="none" d="M0 0h24v24H0z" stroke="none" />
            <path
                d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"
                stroke="none"
            />
        </svg>
    );
};

export default IconFilter;
