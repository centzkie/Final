import { Outlet, Navigate } from "react-router-dom";

window.authentication = false;

const PrivateRoutes = () =>{
    let auth = {'token': window.authentication}

    return(
        auth.token ? <Outlet/> : <Navigate to="/admin   "/>
    )
}

export default PrivateRoutes;
