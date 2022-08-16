import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Navbar/>
        </BrowserRouter>
    )
}

export default AppRoutes;