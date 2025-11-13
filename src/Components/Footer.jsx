import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-6 md:px-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 py-10">
        <div className="flex flex-col space-y-2 col-span-2">
          <Link> <span className="text-[2.25rem] font-extrabold tracking-wider text-gray-900 dark:text-gray-200">Travel<span className="text-gradient">Ease</span> </span></Link>
          <p className="text-sm"> Your ultimate hub for seamless vehicle rentals and trip planning. Discover, book, and manage your rides effortlessly, all in one place. </p>
        </div>

        <div className="col-span-1">
          <h4 className="text-[1.13rem] font-bold mb-2 text-gray-900 dark:text-gray-200">Quick Links</h4>
          <nav className="flex flex-col gap-1 text-gray-700 dark:text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors duration-200">Home</Link>
            <Link to="/all-vehicles" className="hover:text-primary transition-colors duration-200">All Vehicles</Link>
            <Link to="/register" className="hover:text-primary transition-colors duration-200">Register</Link>
          </nav>
        </div>

        <div className="col-span-1">
          <h4 className="text-[1.13rem] font-bold mb-2 text-gray-900 dark:text-gray-200">Resources</h4>
          <nav className="flex flex-col gap-1 text-gray-700 dark:text-gray-400">
            <Link to="/about" className="hover:text-primary transition-colors duration-200">About Us</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors duration-200">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-primary transition-colors duration-200">Contact</Link>
          </nav>
        </div>

        <div className="flex flex-col space-y-2 col-span-1">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-200">Connect With Us</h3>
          <div className="flex space-x-4 text-lg">
            <a href="https://www.facebook.com" target="_blank" className="text-blue-600"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" className="text-blue-400"><FaXTwitter /></a>
            <a href="https://www.linkedin.com" target="_blank" className="text-blue-700"><FaLinkedinIn /></a>
            <a href="https://www.instagram.com" target="_blank" className="text-pink-500"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="pb-10 border-t pt-6 border-gray-50 dark:border-gray-500"><p className="text-center text-sm pb-10 md:pb-0"> &copy; 2025 TravelEase. All rights reserved. </p></div>
    </footer>
  );
};

export default Footer;
