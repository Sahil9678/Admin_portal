// import CommonLogin from "../Pages/CommonLogin/CommonLogin";
import { useSelector } from "react-redux";
import AppBar from "../AppBar/AppBar";
import Login from "../Pages/Login";

function ProtectedRoute({ component }: any) {
    const isloggedIn = useSelector((state: any) => state.commonReducer.isloggedIn);
    return isloggedIn ? <>{component} </> : <Login />
}

export default ProtectedRoute;