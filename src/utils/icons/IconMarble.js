import React from "react";

const IconMarble = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={28}
            height={20}
            viewBox="0 0 28 20"
            fill="none"
            {...props}
        >
            <path
                d="M17.5.5v8.75H0V.5h17.5zm-1.75 7V2.25h-14V7.5h14zm3.5-7H28v8.75h-8.75V.5zm7 7V2.25H21V7.5h5.25zM10.5 19.75V11H28v8.75H10.5zm1.75-7V18h14v-5.25h-14zM0 19.75V11h8.75v8.75H0zm1.75-7V18H7v-5.25H1.75z"
                fill="url(#paint0_linear_4737_1136)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_4737_1136"
                    x1={14}
                    y1={0.5}
                    x2={14}
                    y2={19.75}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#201309" />
                    <stop offset={1} stopColor="#452D14" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default IconMarble;
