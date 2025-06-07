const IconDropdownArrow = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={6}
            height={10}
            viewBox="0 0 6 10"
            fill="none"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.293 9.707a1 1 0 010-1.414L3.586 5 .293 1.707A1 1 0 011.707.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                fill="#081021"
            />
        </svg>
    );
};

export default IconDropdownArrow;
