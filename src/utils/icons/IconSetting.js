const IconSetting = (props) => {
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
                d="M7.604 2.598c.355-1.464 2.437-1.464 2.792 0a1.437 1.437 0 002.144.888c1.286-.784 2.758.688 1.974 1.974a1.437 1.437 0 00.888 2.144c1.464.355 1.464 2.437 0 2.792a1.437 1.437 0 00-.888 2.144c.784 1.286-.688 2.758-1.974 1.974a1.437 1.437 0 00-2.144.888c-.355 1.464-2.437 1.464-2.792 0a1.437 1.437 0 00-2.144-.888c-1.286.784-2.758-.688-1.974-1.974a1.437 1.437 0 00-.888-2.144c-1.464-.355-1.464-2.437 0-2.792a1.437 1.437 0 00.888-2.144c-.784-1.286.688-2.758 1.974-1.974.831.506 1.914.057 2.144-.888z"
                stroke="url(#paint0_linear)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.5 9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
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

export default IconSetting;
