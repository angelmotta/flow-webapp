import React from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./Components/NavBar";
import Body from "./Components/Body";
import SignupSelectIdp from "./Components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => (
    <div className="app">
        <NavBar />
        <Body />
    </div>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/signup",
        element: <SignupSelectIdp />,
    },
    {
        path: "/login",
        element: <div>Login</div>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
