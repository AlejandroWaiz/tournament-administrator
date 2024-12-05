import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/Login/LoginPage";
import RegisterPage from "../Pages/Register/RegisterPage";
import HomePage from "../Pages/Home/HomePage";
import ProtectedRoutes from "./ProtectedRoutes";

export const Router = createBrowserRouter([

    {
        path: "/",
        element: <App/>,
        children: [
            {path:"/login", element: <LoginPage/>},
            {path:"/register", element: <RegisterPage/>},
            //Commeting this for testing{path:"/home", element:<ProtectedRoutes><HomePage/></ProtectedRoutes>}
            {path:"/home", element:<HomePage/>}
        ]
    }

])