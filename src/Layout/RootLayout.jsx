import React from 'react';

import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <header> <Navbar/> </header>
            <main className='bg-gray-100 grow'> <Outlet/> </main>
            {/* <footer> <Footer/> </footer> */}
        </div>
    );
};

export default RootLayout;