// src/Components/Footer.jsx
import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; 
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { BsPhone } from 'react-icons/bs';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        // Footer Container: Dark background matching the Navbar, with a strong primary color accent border
        <footer className="bg-gray-800 text-white border-t-4 border-primary">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Main Footer Content - Using Tailwind Grid for responsive structure */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-10">

                    {/* 1. Logo and Introduction (Span 2 columns on mobile/tablet) */}
                    <div className="col-span-2 lg:col-span-2 space-y-4">
                        <Link to="/" className="text-3xl font-extrabold text-white hover:text-primary transition-colors">
                            Travel<span className='text-primary'>Ease</span>
                        </Link>
                        <p className='text-sm text-gray-400 max-w-sm'>
                            "Your ultimate MERN stack platform for effortless vehicle booking and trip management."
                        </p>
                         {/* Social Links */}
                        <div className='flex space-x-4 pt-2'>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl text-primary hover:text-white transition-colors">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl text-primary hover:text-white transition-colors">
                                {/* X Logo as per UI requirement */}
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L450.938 681.855L0 1227H105.861L515.491 750.218L842.672 1227H1200L714.163 519.284ZM569.165 687.828L521.697 619.932L147.011 112.518H211.33L537.458 562.41L630.957 691.134L1054.49 1115.01H990.169L569.165 687.828Z" />
                                </svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl text-primary hover:text-white transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl text-primary hover:text-white transition-colors">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* 2. Quick Links (2nd Column) */}
                    <div className='space-y-4'>
                        <h6 className="font-bold text-lg text-primary border-b border-primary pb-1 mb-2">Quick Links</h6> 
                        <nav className='flex flex-col space-y-2 text-gray-400'>
                            <Link to="/all-vehicles" className="link link-hover hover:text-white transition-colors">All Vehicles</Link>
                            <Link to="/" className="link link-hover hover:text-white transition-colors">Top Categories</Link>
                            <Link to="/about" className="link link-hover hover:text-white transition-colors">About Us</Link>
                            <Link to="/contact" className="link link-hover hover:text-white transition-colors">Contact</Link>
                        </nav>
                    </div>

                    {/* 3. User Area (3rd Column) */}
                    <div className='space-y-4'>
                        <h6 className="font-bold text-lg text-primary border-b border-primary pb-1 mb-2">My Account</h6> 
                        <nav className='flex flex-col space-y-2 text-gray-400'>
                            <Link to="/add-vehicle" className="link link-hover hover:text-white transition-colors">Add Vehicle</Link>
                            <Link to="/my-vehicles" className="link link-hover hover:text-white transition-colors">My Listings</Link>
                            <Link to="/my-bookings" className="link link-hover hover:text-white transition-colors">My Bookings</Link>
                            <Link to="/login" className="link link-hover hover:text-white transition-colors">Login / Register</Link>
                        </nav>
                    </div>
                    
                    {/* 4. Contact Info (4th Column) */}
                    <div className='col-span-2 md:col-span-1 space-y-4'>
                        <h6 className="font-bold text-lg text-primary border-b border-primary pb-1 mb-2">Reach Us</h6> 
                        
                        <div className='space-y-3 text-gray-400'>
                            <div className='flex items-center gap-2'>
                                <HiOutlineLocationMarker className='text-primary text-xl' /> 
                                <p>Dhaka, Bangladesh</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <HiOutlineMail className='text-primary text-xl' /> 
                                <p>info@travelease.com</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <BsPhone className='text-primary text-lg' /> 
                                <p>+880 1XXXXXXXXX</p>
                            </div>
                        </div>
                    </div>
                </div>
            
                {/* Copyright Section (Full Width, Separated) */}
                <div className='text-center pt-8 text-sm text-gray-500 border-t border-gray-700 mt-4'>
                    <p>
                        &copy; {currentYear} **TravelEase**. All rights reserved. 
                        Developed by a MERN Stack Expert.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;