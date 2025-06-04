import { useState, useEffect } from "react";

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    });

    useEffect(() => {
        const updateScreenSize = () => {
            const width = window.innerWidth;

            setScreenSize({
                isMobile: width <= 767,
                isTablet: width > 767 && width < 1024,
                isDesktop: width >= 1024,
            });
        };

        updateScreenSize();
        window.addEventListener("resize", updateScreenSize);

        return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    return screenSize;
};

export default useScreenSize;
