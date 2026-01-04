import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet,  } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { MdDashboard, MdDirectionsCar, MdBookmark, MdAddBox, MdHome, MdEdit, } from "react-icons/md";
import {  FaRegCalendarCheck } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

const DashboardLayout = () => {
  const { user, signOutUser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");
  const handleLogOut = () => signOutUser().then(() => toast.success("You've been successfully logged out!")).catch((error) => toast.error(error.code));

  const activeClass = ({ isActive }) => isActive ? 
  "font-bold text-[#632ee3] flex items-center gap-2" : "  text-gray-800 dark:text-gray-50 hover:text-[#632ee3] flex items-center gap-2";

  return (
    <div className="bg-gray-50 dark:bg-gray-800  max-w-7xl mx-auto ">
      <div className="drawer lg:drawer-open ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <nav className="navbar w-full bg-gray-50 dark:bg-gray-800 text-gray-800 shadow sticky top-0 z-10 flex justify-between">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
            <MdMenu className="text-2xl text-gray-800 dark:text-gray-100" />
          </label>

              <h2 className="text-lg dark:text-gray-100  font-semibold hidden lg:block">Dashboard</h2>
            <div className="flex items-center gap-4">
            <label className="swap swap-rotate text-base-content mr-2">
              <input type="checkbox" onChange={(e) => handleTheme(e.target.checked)} defaultChecked={localStorage.getItem("theme") === "dark"} className="theme-controller" />
              <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="swap-off fill-current w-6 h-6"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
              <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="swap-on fill-current w-6 h-6"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
            </label>

            {user && (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full"><img src={user?.photoURL || user?.providerData?.[0]?.photoURL || "https://i.ibb.co.com/RTyj1cSs/1559144-200.png"} alt="" /></div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                  <li><a className="hover:bg-indigo-50 dark:hover:bg-indigo-900 dark:text-gray-200">{user?.displayName || user?.providerData?.[0]?.displayName || ""}</a></li>
                  <li><Link to="/dashboard/profile" className="  hover:bg-indigo-50 dark:hover:bg-indigo-900 dark:text-gray-200">Edit Profile</Link></li>
                  <li><Link onClick={handleLogOut} className="text-red-600 hover:bg-red-50">Logout</Link></li>
                </ul>
              </div>
            )}
            </div>
        </nav>

        <div className=""> <Outlet /> </div>
      </div>

      <div className="drawer-side  shadow">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col bg-gray-50 dark:bg-gray-800 text-gray-800 shadow w-60">
        <h2 className="text-xl cursor-pointer p-4 font-bold text-gray-800 dark:text-gray-100 "> <Link to={'/'}>Travel <span className="text-gradient">Ease</span></Link> </h2>
  
        <ul className="menu p -4 w-full grow">
          <li><NavLink end className={activeClass} to="/dashboard" ><MdDashboard /> Overview</NavLink></li>
          <li><NavLink end className={activeClass} to="/dashboard/add-vehicle" ><MdAddBox /> Add Vehicle</NavLink></li>
          <li><NavLink end className={activeClass} to="/dashboard/my-vehicles" ><MdDirectionsCar /> My Vehicles</NavLink></li>
          <li><NavLink end className={activeClass} to="/dashboard/book-vehicles" ><FaRegCalendarCheck /> Book Vehicles</NavLink></li>
          <li><NavLink end className={activeClass} to="/dashboard/my-bookings" ><MdBookmark /> My Bookings</NavLink></li>

        <div className="border-t border-gray-300 dark:border-gray-700 my-3"></div>

          <li><NavLink end className={activeClass} to="/" ><MdHome /> Main Home</NavLink></li>
          <li><NavLink end className={activeClass} to="/dashboard/profile" ><MdEdit /> Edit Profile</NavLink></li>
        </ul>

        </div>
      </div>
    </div>
    </div>
  );
};

export default DashboardLayout;