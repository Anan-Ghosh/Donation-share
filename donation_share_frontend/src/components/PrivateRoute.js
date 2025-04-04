import { Navigate, Outlet } from "react-router";
import Navbar from "./Navbar";

const PrivateRoute = ({ component: Component, ...rest }) => {
    let logged = false;
    let user = {};
    if (localStorage.getItem("user")) {
        logged = true;
        user = localStorage.getItem("user");
    }

    return logged ? (
        <div>
            <Navbar user={user} />
            <Outlet />
        </div>
    ) : (
        <Navigate to="/auth" replace />
    );
};

export default PrivateRoute;
