import React from "react";

import { createBrowserRouter } from "react-router";
import Register from "../Components/Register";
import Login from "../Components/Login";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import AllVehicles from "../Components/AllVehicles";
import AddVehicle from "../Components/AddVehicle";
import PrivateRouter from "./PrivateRouter";
import MyVehicles from "../Components/MyVehicles";
import MyBookings from "../Components/MyBookings";

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
            path: "allVehicles",
            element: <PrivateRouter> <AllVehicles/> </PrivateRouter>
        },
        {
            path: "myVehicles",
            element: <PrivateRouter> <MyVehicles/> </PrivateRouter>
        },
        {
            path: "myBookings",
            element: <PrivateRouter> <MyBookings/> </PrivateRouter>
        },
        {
            path: "addVehicle",
            element: <PrivateRouter> <AddVehicle/> </PrivateRouter>
        },
        {
            path: "login",
            Component: Login,
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