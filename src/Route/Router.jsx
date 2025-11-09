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
import Spinner from "../Components/Spinner";
import VehiclesDetails from "../Components/VehiclesDetails";

const router = createBrowserRouter([
{
    path: "/",
    Component: RootLayout,
    // HydrateFallback: <Spinner/>,
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
            path: "vehiclesDetails/:id",
            loader: ({params})=> fetch(`http://localhost:3000/vehicles/${params.id}`),
            element: <PrivateRouter> <VehiclesDetails/> </PrivateRouter>
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
            path: "register",
            Component: Register,
        },
    ],
},
]);

export default router;