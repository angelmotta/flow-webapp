import React from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./Components/NavBar";
import Body from "./Components/Body";
import SignupSelectIdp from "./Components/SignupSelectIdp";
import Error from "./Components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

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
                path: "/signup",
                element: <SignupSelectIdp />,
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
root.render(<RouterProvider router={router} />);
