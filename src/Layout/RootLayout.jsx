import React from 'react';

import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <header className='sticky top-0 z-100'> <Navbar/> </header>
            <main className='grow max-w-7xl mx-auto'> <Outlet/> </main>
            <footer> <Footer/> </footer>
        </div>
    );
};

export default RootLayout;