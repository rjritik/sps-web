const IconStatistic = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={17}
            viewBox="0 0 18 17"
            fill="none"
            {...props}
        >
            <path
                d="M5.667 8.833V8M9 8.833v-2.5m3.333 2.5V4.667M5.667 15.5L9 12.167l3.333 3.333M1.5 1.333h15m-14.167 0h13.334v10c0 .46-.373.834-.834.834H3.167a.833.833 0 01-.834-.834v-10z"
                stroke="url(#paint0_linear)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear"
                    x1="9"
                    y1="1.333"
                    x2="9"
                    y2="15.5"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#201309" />
                    <stop offset="1" stopColor="#452D14" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default IconStatistic;
