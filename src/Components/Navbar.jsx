import React, { useContext, useEffect, useState } from "react"
import { Link, NavLink } from "react-router"
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify"
export default function Navbar() {
    const { user, signOutUser } = useContext(AuthContext)
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
    };

    const activeClass = ({ isActive }) =>
        isActive ? "font-bold pb-1 text-[#632ee3]  border-b-2 border-[#632ee3] transition-colors duration-200" : 
        "text-gray-700 hover:text-[#632ee3] transition-colors duration-200";

    const handleLogOut = () => {
        signOutUser()
            .then(() => toast.success("You've been successfully logged out!"))
            .catch((error) => toast.error(error.code));
    };

    const navLinks = (
    <>
        <li><NavLink end to="/" className={activeClass}>Home</NavLink></li>
        <li><NavLink end to="/all-vehicles" className={activeClass}>All Vehicles</NavLink></li>
        <li><NavLink end to="/about" className={activeClass}>About</NavLink></li> 

        {user && (
            <>
                <li><NavLink end to="/my-vehicles" className={activeClass}>My Vehicles</NavLink></li>
                <li><NavLink end to="/my-bookings" className={activeClass}>My Bookings</NavLink></li>
                <li><NavLink end to="/add-vehicle" className={activeClass}>Add Vehicle</NavLink></li>
            </>
        )}
    </>
    );

    return (
        <div className="navbar bg-gray-100 dark:bg-gray-900 px-6 md:px-8 shadow-md sticky top-0 z-40">

            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden"> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg> </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"> {navLinks} </ul>
                </div>

                <Link to="/" className="flex items-center gap-2"> <h1 className="text-[1.3rem] font-bold"> Travel<span className="text-gradient">Ease</span> </h1>   </Link>
            </div>

            <div className="navbar-center hidden md:flex">
                <ul className="font-semibold menu menu-horizontal px-1 gap-2"> {navLinks} </ul>
            </div>

            <div className="navbar-end gap-3">
                <label className="swap swap-rotate text-base-content mr-4">
                    <input type="checkbox"
                    onChange={(e) => handleTheme(e.target.checked)}
                    defaultChecked={localStorage.getItem('theme') === "dark"}
                    className="theme-controller" />
                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="swap-off fill-current w-6 h-6"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="swap-on fill-current w-6 h-6"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
                </label>

                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full"> 
                                <img src={user?.photoURL || "https://i.ibb.co.com/RTyj1cSs/1559144-200.png"} alt="" /> </div>
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>{user?.displayName || "User"}</a></li>
                            <li><Link onClick={handleLogOut} className="text-red-600 hover:bg-red-50">Logout</Link></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="btn-secondary">Login</Link>
                        <Link to="/register" className="btn-primary btn-sm">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
}