import React, { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FaCar, FaChair, FaDollarSign, FaEye, FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { Link } from 'react-router'; 

const MyBookings = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(()=> {
    if(user?.email){
        axiosSecure.get(`/my-bookings?email=${user.email}`)
            .then(data => {
                setBooking(data.data)
                setLoading(false);
            })
            .catch(err => setLoading(false))
    }
}, [user, axiosSecure])

    if (loading) {
        return (<div className="min-h-screen flex justify-center items-center bg-gray-100">
             <span className="loading loading-spinner loading-lg text-primary"></span>
         </div>);
    }

    if (booking.length === 0) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 bg-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">❌ No Bookings Found</h2>
                <p className="text-lg text-gray-600 mb-6">You haven't booked any vehicles yet.</p>
                <Link to="/all-vehicles" className="btn btn-primary text-white font-semibold shadow-lg">Browse Vehicles</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">My <span className='text-primary'>Bookings</span></h1> 
            <p className="text-center text-gray-500 mb-10">Here are the vehicles you have booked and their current status.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {booking.map(vehicle => {
                    const price = vehicle.pricePerDay?.$numberInt ? parseInt(vehicle.pricePerDay.$numberInt) : vehicle.pricePerDay;

                    return (
                        <div key={vehicle._id} className="card w-full bg-white shadow-xl transition-all duration-300 transform hover:shadow-2xl border border-gray-100 rounded-2xl overflow-hidden flex flex-col group">
                            
                            <figure className='relative h-56 w-full overflow-hidden'>
                                <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="badge badge-lg badge-accent absolute top-4 left-4 text-white text-sm font-semibold p-3 shadow-md">{vehicle.category}</div>
                            </figure>

                            <div className="card-body p-6 space-y-3 grow">
                                <h2 className="card-title text-2xl font-bold text-gray-900">{vehicle.vehicleName}</h2>

                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-600 text-sm">
                                    <span className='flex items-center gap-1 font-bold text-primary'>
                                        <FaCar className="text-primary text-sm" />
                                        {vehicle.category}
                                    </span>
                                    <span className='flex items-center gap-1 font-medium'>
                                        <FaChair className="text-primary text-sm" /> 
                                        {vehicle.seatingCapacity} Seats
                                    </span>
                                    <span className='flex items-center gap-1 font-medium'>
                                        <FaMapMarkerAlt className="text-primary text-sm" /> 
                                        {vehicle.location?.split(',')[0]}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-1 font-medium text-gray-500 text-sm">
                                    <MdOutlineDateRange className='text-primary text-base' /> 
                                    Added: {new Date(vehicle.createdAt).toLocaleDateString()}
                                </div>

                                <div className="flex items-baseline font-extrabold text-3xl text-secondary pt-2">
                                    <FaDollarSign className='text-primary text-xl mr-1'/> {price}  <span className='text-base text-gray-500 font-normal'>/ Day</span>
                                </div>
                                <Link to={`/vehicle-details/${vehicle.vehicleId}`} className="btn btn-sm btn-primary text-white flex items-center gap-1 w-full"> <FaEye /> Details </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyBookings;