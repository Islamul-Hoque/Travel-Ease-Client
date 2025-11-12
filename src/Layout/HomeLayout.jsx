import React, { useEffect, useState } from 'react';
import VehiclesCard from '../Components/VehiclesCard';
import Spinner from '../Components/Spinner';
import useAxios from '../Hooks/useAxios';
import Banner from '../Components/Banner';
import TopCategories from '../Components/TopCategories';
import AboutTravelEase from '../Components/AboutTravelEase';

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
            <section className='px-6 md:px-10'>
                <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center my-12"> Newly Added <span className='text-gradient'>Vehicles</span></h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    { vehicles.map(vehicle => 
                        <VehiclesCard key={vehicle._id} vehicle={vehicle}/> )
                    }
                </div>
            </section>
            <section><TopCategories/> </section>
            <section><AboutTravelEase/> </section>
        </div>
    );
};

export default HomeLayout;

// {
//   vehicleName: "Toyota RAV4 Prime AWD",
//   ownerName: "Mr. Karim Khan",
//   ownerPhoto: "https://i.ibb.co/tofael_photo.jpg",
//   userEmail: "karim.khan@example.com",
//   category: "SUV",
//   pricePerDay: 110,
//   location: "Dhaka, Bangladesh",
//   seatingCapacity: 5,
//   features: [
//     "All-Wheel Drive",
//     "Hybrid Engine",
//     "Sunroof",
//     "Rear Camera"
//   ],
//   rating: 4.8,
//   reviewsCount: 35,
//   description: "A powerful and fuel-efficient SUV, perfect for both city driving and weekend getaways. It features a spacious interior, advanced safety technology, and a smooth hybrid powertrain. Ideal for families seeking comfort and reliability on long trips. Book now for an eco-friendly journey.",
//   coverImage: "https://img.sm360.ca/images/newcar/ca/2025/toyota/rav4-hybride-branchable/se/suv/2025_toyota_rav4-prime_1-se_photos_004.jpg",
//   userEmail: "karim.khan@example.com",
//   createdAt: "2025-11-08T15:45:00.000Z",
//   status: "active"
// }
