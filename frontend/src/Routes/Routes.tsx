import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/Login/LoginPage";
import RegisterPage from "../Pages/Register/RegisterPage";
import HomePage from "../Pages/Home/HomePage";
import ProtectedRoutes from "./ProtectedRoutes";
import ShowTournament from "../Pages/Competitions/Tournament/ShowTournament";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> }, // 👈 Ruta predeterminada
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/home", element: <HomePage /> },
            { path: "/competition/create", element: <HomePage /> },
            { path: "/competition/show/:id", element: <ShowTournament /> },
        ],
    },
]);
