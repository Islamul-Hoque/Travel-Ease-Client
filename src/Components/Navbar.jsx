import React, { useContext, useEffect, useState } from "react"
import { Link, NavLink } from "react-router" 
import { AuthContext } from "../Context/AuthProvider"; 

// থিম টগল করার ফাংশন
const toggleTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

export default function Navbar() {
    // থিম স্টেট এবং অথ স্টেট
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'light');
    const { user, signOutUser } = useContext(AuthContext);

    // থিম হ্যান্ডেলার ফাংশন
    const handleThemeChange = (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        setCurrentTheme(newTheme);
        toggleTheme(newTheme);
    };

    // কম্পোনেন্ট মাউন্ট হওয়ার সময় থিম সেট করা
    useEffect(() => {
        toggleTheme(currentTheme);
    }, [currentTheme]);

    const activeClass = ({ isActive }) => 
        isActive
        ? "font- bold pb-1 bg-[linear-gradient(125.07deg,#632ee3,#9f62f2_100%)] text-transparent bg-clip-text border-b-2 border-[#9f62f2] transition-all duration-300"
        : "text-gray-700 hover:text-transparent hover:bg-[linear-gradient(125.07deg,#632ee3,#9f62f2_100%)] hover:bg-clip-text transition-all duration-300";

    const handleLogOut = () => {
        signOutUser()
            .then(() => toast.success("You've been successfully logged out!"))
            .catch((error) => toast.error(error.code));
    };

const navLinks = (
    <>
        <li><NavLink end to="/" className={activeClass}>Home</NavLink></li>
        <li><NavLink end to="/all-vehicles" className={activeClass}>All Vehicles</NavLink></li>

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
        <div className="navbar bg-white px-6 md:px-8 shadow-md sticky top-0 z-40">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden"> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg> </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"> {navLinks} </ul>
                </div>
                <Link to="/" className="flex items-center gap-2">
                    {/* <div className="rounded-full"> <img className="w-[1.9rem]" src={logo} alt="" /> </div> */}
                    <h1 className="text-[1.3rem] font-bold"> Travel<span className="text-gradient">Ease</span> </h1> 
                </Link>
            </div>

            <div className="navbar-center hidden md:flex">
                <ul className="font-semibold menu menu-horizontal px-1 gap-2"> {navLinks} </ul>
            </div>

            <div className="navbar-end gap-3">
                <label className="swap swap-rotate text-base-content mr-4">
                    <input type="checkbox" checked={currentTheme === 'dark'} onChange={handleThemeChange} className="theme-controller" />
                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="swap-off fill-current w-6 h-6"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="swap-on fill-current w-6 h-6"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
                </label>

                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full"> <img src={user?.photoURL || "https://i.ibb.co.com/RTyj1cSs/1559144-200.png"} alt="" /> </div>
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