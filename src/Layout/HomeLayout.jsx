import React, { useEffect, useState } from 'react';
import VehiclesCard from '../Components/VehiclesCard';
import Spinner from '../Components/Spinner';
import useAxios from '../Hooks/useAxios';
import Banner from '../Components/Banner';
import TopCategories from '../Components/TopCategories';
import Testimonials from '../Components/Testimonials';

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
        <div>
            <section><Banner/></section>
            <Testimonials/>
            {/* <section className='px-6 md:px-10'>
                <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center my-12"> Newly Added <span className='text-gradient'>Vehicles</span></h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    { vehicles.map(vehicle => 
                        <VehiclesCard key={vehicle._id} vehicle={vehicle}/> )
                    }
                </div>
            </section> */}
            {/* <section><TopCategories/> </section> */}
        </div>
    );
};

export default HomeLayout;