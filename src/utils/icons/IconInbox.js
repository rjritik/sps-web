const IconInbox = (props) => {
    return (
        <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M14.667 8.833V3c0-.92-.746-1.667-1.667-1.667H3c-.92 0-1.667.747-1.667 1.667v5.833m13.334 0V13c0 .92-.746 1.667-1.667 1.667H3c-.92 0-1.667-.746-1.667-1.667V8.833m13.334 0h-2.155a.833.833 0 00-.59.244L9.912 11.09a.834.834 0 01-.59.244H6.68a.834.834 0 01-.59-.244L4.078 9.077a.833.833 0 00-.59-.244H1.333"
                stroke="url(#paint0_linear)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear"
                    x1="8"
                    y1="1.333"
                    x2="8"
                    y2="14.667"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#201309" />
                    <stop offset="1" stopColor="#452D14" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default IconInbox;
