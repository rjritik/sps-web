const IconInfo = (props) => {
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
                d="M9.833 12.333H9V9h-.833M9 5.667h.008M16.5 9a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                stroke="url(#paint0_linear)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear"
                    x1="9"
                    y1="2"
                    x2="9"
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

export default IconInfo;
