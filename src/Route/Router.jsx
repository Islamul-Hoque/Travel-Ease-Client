import React from "react";

import { createBrowserRouter } from "react-router";
import Register from "../Components/Register";
import Login from "../Components/Login";
import RootLayout from "../Layout/RootLayout";
import AllVehicles from "../Components/AllVehicles";
import AddVehicle from "../Components/AddVehicle";
import PrivateRouter from "./PrivateRouter";
import MyVehicles from "../Components/MyVehicles";
import MyBookings from "../Components/MyBookings";
import VehiclesDetails from "../Components/VehiclesDetails";
import UpdateVehicle from "../Components/UpdateVehicle";
import HomeLayout from "../Layout/HomeLayout";
import ErrorPage from "../Pages/ErrorPage";
import About from "../Components/About";
import Contact from "../Components/Contact";
import DashboardLayout from "../Layout/Dashboard/DashboardLayout";
import EditProfile from "../Components/EditProfile";
import DashboardHome from "../Layout/Dashboard/DashboardHome";
import BookVehicles from "../Components/BookVehicles";

const router = createBrowserRouter([
{
    path: "/",
    Component: RootLayout,
    children: [
        {
        index: true,
        Component: HomeLayout
        },
        {
            path: "all-vehicles",
            Component: AllVehicles
        },
        {
            path: "/vehicle-details/:id",
            // loader: ({params})=> fetch(`https://travel-ease-lemon.vercel.app/vehicle-details/${params.id}`),
            loader: ({params})=> fetch(`http://localhost:3000/vehicle-details/${params.id}`),
            Component: VehiclesDetails
            // element: <PrivateRouter> <VehiclesDetails/> </PrivateRouter>
        },
        {
            path: 'about',
            Component: About
        },
        {
            path: 'contact',
            Component: Contact
        },
        // {
        //     path: "my-vehicles",
        //     element: <PrivateRouter> <MyVehicles/> </PrivateRouter>
        // },
        // {
        //     path: "my-bookings",
        //     element: <PrivateRouter> <MyBookings/> </PrivateRouter>
        // },
        // {
        //     path: "add-vehicle",
        //     element: <PrivateRouter> <AddVehicle/> </PrivateRouter>
        // },
        // {
        //     path: "update-vehicle/:id",
        //     // loader: ({params})=> fetch(`https://travel-ease-lemon.vercel.app/vehicle-details/${params.id}`),
        //     loader: ({params})=> fetch(`http://localhost:3000/vehicle-details/${params.id}`),
        //     element: <PrivateRouter> <UpdateVehicle/> </PrivateRouter>
        // },
        {
            path: "login",
            Component: Login,
        },
        {
            path: "register",
            Component: Register,
        },
        {
            path:'*',
            Component: ErrorPage
        }
    ],
},
{
    path: 'dashboard',
    element: <PrivateRouter> <DashboardLayout/> </PrivateRouter>,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
        {
            path: "my-vehicles",
            element: <PrivateRouter> <MyVehicles/> </PrivateRouter>
        },
        {
            path: "update-vehicle/:id",
            loader: ({params})=> fetch(`http://localhost:3000/vehicle-details/${params.id}`),
            element: <PrivateRouter> <UpdateVehicle/> </PrivateRouter>
        },
        {
            path: "my-bookings",
            element: <PrivateRouter> <MyBookings/> </PrivateRouter>
        },
        {
            path: "book-vehicles",
            element: <PrivateRouter> <BookVehicles/> </PrivateRouter>
        },
        {
            path: "add-vehicle",
            element: <PrivateRouter> <AddVehicle/> </PrivateRouter>
        },
        {
            path: "profile",
            element: <PrivateRouter> <EditProfile/> </PrivateRouter>

        }
    ]
}
]);

export default router;