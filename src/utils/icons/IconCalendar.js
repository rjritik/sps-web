const IconCalendar = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            {...props}
        >
            <path
                d="M5.667 4.833V1.5m6.666 3.333V1.5m-7.5 6.667h8.334m-10 8.333h11.666c.92 0 1.667-.746 1.667-1.667v-10c0-.92-.746-1.666-1.667-1.666H3.167c-.92 0-1.667.746-1.667 1.666v10c0 .92.746 1.667 1.667 1.667z"
                stroke="url(#paint0_linear)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear"
                    x1="9"
                    y1="1.5"
                    x2="9"
                    y2="17"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#201309" />
                    <stop offset="1" stopColor="#452D14" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default IconCalendar;
