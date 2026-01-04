import React, { useEffect, useState } from 'react';
import VehiclesCard from '../Components/VehiclesCard';
import Spinner from '../Components/Spinner';
import useAxios from '../Hooks/useAxios';
import Banner from '../Components/Banner';
import TopCategories from '../Components/TopCategories';
import Testimonials from '../Components/HomeComponents/Testimonials';
import Faq from '../Components/HomeComponents/Faq';
import WhyChooseUs from '../Components/HomeComponents/WhyChooseUs';
import HowItWorks from '../Components/HomeComponents/HowItWorks';
import Newsletter from '../Components/HomeComponents/Newsletter';
import AppDownload from '../Components/HomeComponents/AppDownload';
import SafetyComfort from '../Components/HomeComponents/SafetyComfort';

const HomeLayout = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true); 
    const axiosInstance = useAxios()

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('/vehicles') 
            .then(data => {
            setVehicles(data.data); 
            setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, [axiosInstance]);

    if (loading) return <Spinner/>

    return (
        <div className='max-w-7xl mx-auto'>
            <section><Banner/></section>

            <section className='px-6 md:px-10'>
                <h2 className="text-[1.4rem] md:text-[2.4rem] font-bold text-center my-12"> Newly Added <span className='text-gradient'>Vehicles</span></h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    { vehicles.map(vehicle => 
                        <VehiclesCard key={vehicle._id} vehicle={vehicle}/> )
                    }
                </div>
            </section>
            <section><TopCategories/> </section>

            <section><WhyChooseUs/></section>
            <section> <SafetyComfort/></section>

            <section> <HowItWorks/></section>

            <section> <Testimonials/></section>
            <section><Faq/></section>

            <section><AppDownload/> </section>
            <section><Newsletter/> </section>

        </div>
    );
};

export default HomeLayout;