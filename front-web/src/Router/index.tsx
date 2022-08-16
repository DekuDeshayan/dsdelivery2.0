import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";
import Navbar from "../Navbar";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;