import React, { useEffect, useState } from 'react';
import VehiclesCard from '../Components/VehiclesCard';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true); 
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        setLoading(true);
        axiosSecure.get('/vehicles') 
            .then(data => {
            setVehicles(data.data); 
            setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching vehicles:", error);
                setLoading(false);
            });
    }, [axiosSecure]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                {/* <Triangle
                    visible={true}
                    height="80"
                    width="80"
                    color="#632ee3" 
                    ariaLabel="triangle-loading"
                /> */}
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
        
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                Newly Added <span className='text-primary'>Vehicles</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {
                    vehicles.map(vehicle => 
                        <VehiclesCard key={vehicle._id} vehicle={vehicle}/> 
                    )
                }
            </div>
        </div>
    );
};

export default Home;