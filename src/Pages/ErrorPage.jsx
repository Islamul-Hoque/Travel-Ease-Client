import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
            <div><h1 className="text-[3.5rem] md:text-[8rem] text-gradient font-extrabold leading-none -mt-4">404</h1></div>
            <h2 className="text-[1.8rem] md:text-[3rem] font-bold mb-2">Oops! Page Not Found</h2>
            <p className=" mb-8 w-[95%]"> Looks like you took a wrong turn on the highway! Don’t worry — let’s get you back on track.</p>
            <div><Link to="/" className="btn-primary"> Back to Home </Link></div>
        </div>
)}

export default ErrorPage;