import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { MdDashboard, MdDirectionsCar, MdBookmark, MdAddBox, MdHome, MdEdit, MdEventAvailable, MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { FaClipboardList, FaRegCalendarCheck } from "react-icons/fa";

// const DashboardLayout = () => {
//   const { user, signOutUser } = useAuth();
//   const location = useLocation();
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const html = document.querySelector("html");
//     html.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

//   const handleTheme = (checked) => setTheme(checked ? "dark" : "light");
//   const handleLogOut = () => signOutUser().then(() => toast.success("You've been successfully logged out!")).catch((error) => toast.error(error.code));

//   const activeClass = ({ isActive }) => isActive ? "font-bold text-[#632ee3] flex items-center gap-2" : "  text-gray-700 hover:text-[#632ee3] flex items-center gap-2";

//   return (
//     <div className="flex max-w-7xl mx-auto min-h-screen bg-gray-50 dark:bg-gray-800">
//       <aside className={`fixed lg:static top-0 left-0 w-64 bg-gray-100 dark:bg-gray-900 shadow-md p-6 transform transition-transform duration-300 z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
//         <h2 className="text-xl font-bold mb-6 text-center"> <Link to={'/'}>Travel <span className="text-gradient">Ease</span></Link> </h2>

//         <ul className="space-y-4">
//          <li><NavLink to="/dashboard" end className={activeClass}><MdDashboard /> Overview</NavLink></li>
// <li><NavLink to="/dashboard/add-vehicle" className={activeClass}><MdAddBox /> Add Vehicle</NavLink></li>
// <li><NavLink to="/dashboard/my-vehicles" className={activeClass}><MdDirectionsCar /> My Vehicles</NavLink></li>
// <li><NavLink to="/dashboard/book-vehicles" className={activeClass}><FaRegCalendarCheck /> Book Vehicles</NavLink></li>
// <li><NavLink to="/dashboard/my-bookings" className={activeClass}><MdBookmark /> My Bookings</NavLink></li>
// </ul>
//         <div className="border-t my-6"></div>
//         <ul className="space-y-4">
//           <li><NavLink to="/" className={activeClass}><MdHome /> Main Home</NavLink></li>
//           <li><NavLink to="/dashboard/profile" className={activeClass}><MdEdit /> Edit Profile</NavLink></li>
//         </ul>
//       </aside>

//       {sidebarOpen && <div className="fixed z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

//       <div className="flex-1 flex flex-col">
//         <header className="flex justify-between items-center bg-gray-100 dark:bg-gray-900 px-6 py-4 shadow">
//           <div className="flex items-center gap-4">
//             <button className="lg:hidden btn btn-ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
//             </button>
//             <h2 className="text-lg font-semibold hidden lg:block">Dashboard</h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <label className="swap swap-rotate text-base-content mr-2">
//               <input type="checkbox" onChange={(e) => handleTheme(e.target.checked)} defaultChecked={localStorage.getItem("theme") === "dark"} className="theme-controller" />
//               <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="swap-off fill-current w-6 h-6"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
//               <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="swap-on fill-current w-6 h-6"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
//             </label>

//             {user && (
//               <div className="dropdown dropdown-end">
//                 <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//                   <div className="w-10 rounded-full"><img src={user?.photoURL || user?.providerData?.[0]?.photoURL || "https://i.ibb.co.com/RTyj1cSs/1559144-200.png"} alt="" /></div>
//                 </div>
//                 <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
//                   <li><a>{user?.displayName || user?.providerData?.[0]?.displayName || ""}</a></li>
//                   <li><Link to="/dashboard/profile" className="hover:bg-indigo-50">Edit Profile</Link></li>
//                   <li><Link onClick={handleLogOut} className="text-red-600 hover:bg-red-50">Logout</Link></li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </header>

//         <main className="flex-1 p-6"><Outlet /></main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


// import React from 'react';
// import { FaBookOpen, FaChartBar, FaClipboardList, FaGraduationCap, FaMoneyBillWave, FaPlusCircle, FaRegCreditCard, FaSignOutAlt, FaTasks, FaUserEdit, FaUsers } from 'react-icons/fa';
// import { Link, NavLink, Outlet } from 'react-router';
// import useRole from '../../hooks/useRole';
// import logo from '../../assets/eTuitionBD.png';
// import { FaHome, FaTachometerAlt } from "react-icons/fa";
// import { MdDashboard } from 'react-icons/md';

const DashboardLayout = () => {
   const { user, signOutUser } = useAuth();
  // const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");
  const handleLogOut = () => signOutUser().then(() => toast.success("You've been successfully logged out!")).catch((error) => toast.error(error.code));


  // const activeClass = ({ isActive }) => isActive
  //   ? "bg-indigo-100 text-indigo-600 px-3 py-1 rounded-md font-semibold"
  //   : "text-gray-700 hover:text-indigo-500 px-3 py-1 rounded-md";
  const activeClass = ({ isActive }) => isActive ? 
  "font-bold text-[#632ee3] flex items-center gap-2" : "  text-gray-800 dark:text-gray-50 hover:text-[#632ee3] flex items-center gap-2";

  return (
   <div className="bg-gray-50 dark:bg-gray-800  max-w-7xl mx-auto ">
     <div className="drawer lg:drawer-open ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <nav className="navbar w-full bg-gray-50 dark:bg-gray-800 text-gray-800 shadow sticky top-0 z-10 flex justify-between">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

              <h2 className="text-lg font-semibold hidden lg:block">Dashboard</h2>
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
                  <li><a>{user?.displayName || user?.providerData?.[0]?.displayName || ""}</a></li>
                  <li><Link to="/dashboard/profile" className="hover:bg-indigo-50">Edit Profile</Link></li>
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