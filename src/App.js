import "./style/style.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";

function App() {
    return (
        <>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/*" element={<Navigation />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
