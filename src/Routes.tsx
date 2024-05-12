import {Routes, Route} from "react-router-dom";
import Home from "./Home.tsx";
import Test from "./components/Test.tsx";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    )
}