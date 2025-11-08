import React from "react";

import { createBrowserRouter } from "react-router";
import Register from "../Components/Register";
import Login from "../Components/Login";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";

const router = createBrowserRouter([
{
    path: "/",
    Component: RootLayout,
    children: [
        {
        index: true,
        Component: Home
        },
        {
        path: "login",
        Component: Login,
        },
        {
        path: "register",
        Component: Register,
        },
    ],
},
]);

export default router;