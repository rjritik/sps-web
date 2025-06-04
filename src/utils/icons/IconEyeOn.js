import React from "react";

const IconEyeOn = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="none"
            width={18}
            height={18}
            {...props}
        >
            <path
                d="M9 6.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                stroke="#ACB5BB"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.5 9C3.5 5.5 6 3.5 9 3.5s5.5 2 7.5 5.5c-2 3.5-4.5 5.5-7.5 5.5S3.5 12.5 1.5 9Z"
                stroke="#ACB5BB"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default IconEyeOn;
