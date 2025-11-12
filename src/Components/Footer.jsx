import React from 'react';
import { Link } from 'react-router';
import { FaInstagram, FaFacebookF, FaPinterestP} from 'react-icons/fa'; 

const Footer = () => {
    return (
        <footer className="bg-gray-800 border-t border-gray-100">
            <div className="mx-auto px-6 md:px-8 py-12">

                <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
                    <div className="col-span-2 space-y-2 -mt-2">
                        <Link to="/" className="flex items-center gap-3">
                            <span className="text-[2.25rem] font-extrabold tracking-wider">Travel<span className='text-gradient'>Ease</span></span>
                        </Link>
                        <p className="text-[1.13rem] text-gray-600 border-lime-400 font-semibold"> Your trusted platform for seamless vehicle booking and trip management worldwide. Drive smart, travel easy. </p>
                    </div>

                    <div>
                        <h4 className="text-[1.13rem] font-bold mb-2 text-gradient">Quick Links</h4>
                        <nav className="flex flex-col gap-1 text-gray-700">
                            <Link to="/" className="link link-hover hover:text-white transition-colors">Top Categories</Link>
                            <Link to="/all-vehicles" className="link link-hover hover:text-white transition-colors">All Vehicles</Link>
                            <Link to="/login" className="link link-hover hover:text-white transition-colors">Login / Register</Link>
                        </nav>
                    </div>

                    <div>
                        <h4 className="text-[1.13rem] font-bold mb-2 text-gradient ">Resources</h4>
                        <nav className="flex flex-col gap-1 text-gray-700">
                            <Link to="/about" className="link   link-hover hover:text-white transition-colors">About Us</Link>
                            <Link to="/privacy" className="link link-hover hover:text-white transition duration-200">Privacy Policy</Link>
                            <Link to="/contact" className="link link-hover hover:text-white transition-colors">Contact</Link>
                        </nav>
                    </div>

                    <div className='col-span-2 md:col-span-1'>
                        <h4 className="text-[1.13rem] font-bold mb-2 text-gradient">Follow Our Journey</h4>
                        <div className="flex space-x-4 pt-4 items-center justify-start">
                            <Link to="https://www.instagram.com" target="_blank"  className="transition duration-300 transform hover:scale-110"> <FaInstagram  className="w-8 h-8 text-pink-600 hover:text-pink-400" /> </Link>
                            <Link to="https://www.facebook.com"  target="_blank"  className="transition duration-300 transform hover:scale-110"> <FaFacebookF  className="w-7 h-7 text-blue-600 hover:text-blue-400" /></Link>
                            <Link to="https://www.pinterest.com" target="_blank"  className="transition duration-300 transform hover:scale-110"> <FaPinterestP className="w-7 h-7 text-red-600 hover:text-red-400" /></Link>
                        </div>
                    </div>

                </div>
            </div>

            <div className=" p-4">
                <p className="text-center text-white text-[0.85rem] mt-3 mb-4 md:mt-0 md:mb-0 "> &copy; 2025 TravelEase. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;