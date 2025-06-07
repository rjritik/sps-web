const IconDashboard = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            width={16}
            height={16}
            {...props}
        >
            <path
                d="M12.167 9.667v5m-2.5-2.5h5M3 6.333h1.667c.92 0 1.667-.746 1.667-1.666V3c0-.92-.747-1.667-1.667-1.667H3c-.92 0-1.667.747-1.667 1.667v1.667c0 .92.747 1.666 1.667 1.666zm8.334 0H13c.92 0 1.667-.746 1.667-1.666V3c0-.92-.746-1.667-1.667-1.667h-1.666c-.921 0-1.667.747-1.667 1.667v1.667c0 .92.746 1.666 1.667 1.666zM3 14.667h1.667c.92 0 1.667-.746 1.667-1.667v-1.667c0-.92-.747-1.666-1.667-1.666H3c-.92 0-1.667.746-1.667 1.666V13c0 .92.747 1.667 1.667 1.667z"
                stroke="url(#paint0_linear_4849_3450)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_4849_3450"
                    x1={8.00016}
                    y1={1.33333}
                    x2={8.00016}
                    y2={14.6667}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#201309" />
                    <stop offset={1} stopColor="#452D14" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default IconDashboard;
