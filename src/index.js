import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import { HeroUIProvider } from "@heroui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HeroUIProvider>
                <App />
            </HeroUIProvider>
        </Provider>
    </React.StrictMode>
);
