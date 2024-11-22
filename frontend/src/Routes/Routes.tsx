import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import HomePage from "../Pages/HomePage/HomePage";
import ProtectedRoutes from "./ProtectedRoutes";

export const Router = createBrowserRouter([

    {
        path: "/",
        element: <App/>,
        children: [
            {path:"/login", element: <LoginPage/>},
            {path:"/register", element: <RegisterPage/>},
            {path:"/home", element:<ProtectedRoutes><HomePage/></ProtectedRoutes>}
        ]
    }

])