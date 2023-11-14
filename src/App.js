import React from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./Components/NavBar";
import Body from "./Components/Body";
import SignupSelectIdp from "./Components/SignupSelectIdp";
import SignupPersonalData from "./Components/SignupPersonalData";
import Error from "./Components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";

const App = () => (
    <div className="app">
        <NavBar />
        <Outlet />
    </div>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/signup/step1",
                element: <SignupSelectIdp />,
            },
            {
                path: "/signup/step2",
                element: <SignupPersonalData />,
            },
            {
                path: "/login",
                element: <h1>Login</h1>,
            },
        ],
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);
