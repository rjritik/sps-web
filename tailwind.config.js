const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx,scss}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                body: ["Inter", "sans-serif"],
            },
            backgroundColor: {
                "brown-1": "#201309",
                "brown-2": "#452D14",
                "brown-light": "#FFF0E6",
            },
            backgroundImage: {
                "gradient-brown":
                    "linear-gradient(180deg, #201309 0%, #452D14 100%)",
            },
        },
    },
    darkMode: "class",
    plugins: [
        heroui(),

        function ({ addUtilities }) {
            addUtilities({
                ".text-gradient-brown": {
                    background:
                        "-webkit-linear-gradient(top, #201309, #452D14)", // 👈 vertical gradient
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "transparent",
                },
                // ".text-gradient-2": {
                //     background:
                //         "-webkit-linear-gradient(left, #0057AA, #002344)", // 👈 horizontal gradient
                //     "-webkit-background-clip": "text",
                //     "-webkit-text-fill-color": "transparent",
                // },
            });
        },
    ],
};
