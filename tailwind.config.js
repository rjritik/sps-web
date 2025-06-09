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
            colors: {
                primary: "#6A6A6A",

                "brown-1": "#201309",
                "brown-2": "#452D14",
                "brown-light-1": "#FFF0E6",
                "brown-light-2": "#F3DDC9",

                "gray-1": "#6C7278",
                "gray-2": "#3D4349",
                "gray-3": "",
                "gray-4": "#666666",
                "gray-5": "#8D8C8A",
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
                        "-webkit-linear-gradient(top, #201309, #452D14)",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "transparent",
                },
            });
        },
    ],
};
