const IconNotification = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={18}
            viewBox="0 0 16 18"
            fill="none"
            {...props}
        >
            <path
                d="M10.5 13.167h4.167l-1.17-1.171A1.693 1.693 0 0113 10.799V8.167A5.002 5.002 0 009.667 3.45v-.284a1.667 1.667 0 10-3.333 0v.284A5.002 5.002 0 003 8.167v2.632c0 .449-.178.88-.496 1.197l-1.17 1.17H5.5m5 0V14a2.5 2.5 0 01-5 0v-.833m5 0h-5"
                stroke="url(#paint0_linear)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear"
                    x1="8"
                    y1="2"
                    x2="8"
                    y2="16"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#201309" />
                    <stop offset="1" stopColor="#452D14" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default IconNotification;
