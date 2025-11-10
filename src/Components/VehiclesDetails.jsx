import React, { useState } from "react";
import { useLoaderData, Link } from "react-router"; 
import { FaStar, FaChair, FaDollarSign, FaCheckCircle, FaUsers, FaCar } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { format } from "date-fns";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";

const VehicleDetails = () => {
    const {user} = useAuth()
    const data = useLoaderData()
    const axiosSecure = useAxiosSecure()
    const [isBooked, setIsBooked] = useState(false);

    if (!data) return <p className="text-center py-10 text-xl">Loading vehicle details...</p>;

    const { _id, vehicleName, ownerName, ownerPhoto, category, pricePerDay, location, seatingCapacity, features = [], rating = 0, totalBookings = 0, description, coverImage, createdAt, userEmail, status = 'active' } = data;
    const formattedDate = format(new Date(createdAt), "MM/dd/yyyy")

    const handleBookNow = () => {
        const bookingData = { vehicleId: _id, vehicleName, category, pricePerDay, location, seatingCapacity, rating, coverImage, createdAt, userEmail: user?.email, bookingDate: new Date() };
        axiosSecure.post('/my-bookings', bookingData)
            .then(data => {
                if(data.data.insertedId){
                    toast.success(`🎉 Your booking for "${vehicleName}" is confirmed! Get ready to ride!`)
                    setIsBooked(true);
                }
            })
            .catch(err => {
                toast.error(err.response.data.message)
            });
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
            <div className="bg-white shadow-2xl rounded-xl p-6 lg:p-10 space-y-8">

                {/* Vehicle Main Section */}
                <div className="lg:flex lg:space-x-10">
                    <div className="lg:w-2/3 mb-6 lg:mb-0 relative rounded-xl overflow-hidden shadow-lg border-2 border-gray-100">
                        <img src={coverImage} alt={vehicleName} className="w-full h-full object-cover max-h-[500px]" />
                        <div className="badge badge-primary absolute top-4 left-4 text-white text-sm font-semibold">
                            {category}
                        </div>
                    </div>

                    <div className="lg:w-1/3 space-y-6">
                        <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">{vehicleName}</h1>

                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-inner">
                            <p className="text-2xl font-extrabold text-secondary flex items-center gap-1">
                                <FaDollarSign className='text-primary'/> {pricePerDay} <span className="text-base text-gray-500 font-normal">/ Day</span>
                            </p>
                            <div className="flex items-center text-lg text-primary font-bold gap-1">
                                <FaStar className="text-yellow-500" /> {rating.toFixed(1)}
                            </div>
                        </div>

                        <div className="text-gray-600 space-y-2">
                            <p className='flex justify-between font-medium'>
                                <span><FaUsers className="inline text-primary mr-1"/> Reviews:</span>
                                <span className='font-bold text-gray-800'>{totalBookings}</span>
                            </p>
                            <p className='flex justify-between font-medium'>
                                <span><MdOutlineDateRange className="inline text-primary mr-1"/> Added Date:</span>
                                <span className='font-bold text-gray-800'>{formattedDate}</span>
                            </p>
                            <p className='flex justify-between font-medium'>
                                <span><FaChair className="inline text-primary mr-1"/> Seats:</span>
                                <span className='font-bold text-gray-800'>{seatingCapacity}</span>
                            </p>
                            <p className='flex justify-between font-medium'>
                                <span><HiOutlineLocationMarker className="inline text-primary mr-1"/> Location:</span>
                                <span className='font-bold text-gray-800'>{location}</span>
                            </p>
                        </div>

                        <button 
                            onClick={handleBookNow} 
                            className="btn btn-primary" 
                            disabled={isBooked || status !== 'active'}>
                            {isBooked || status !== 'active' ? 'Currently Booked' : 'Book Now'}
                        </button>


                    </div>
                </div>

                {/* Vehicle Description */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-1">Vehicle Description</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{description}</p>
                </div>

                {/* Features */}
                {features.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-1">Key Features Included</h3>
                        <p className="text-gray-700 gap-4">
                            {features.map((feature, i) => (
                                <span key={i} className="flex items-center gap-1 bg-gray- 100 rounded-md px-2 py-1">
                                    <FaCheckCircle className="text-green-500" /> {feature}
                                </span>
                            ))}
                        </p>
                    </div>
                )}

                {/* Owner Info */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-1">Owner Information</h3>
                    <div className="flex items-center gap-4 p-4 border-2 border-primary rounded-lg bg-blue-50 max-w-xl shadow-md">
                        <img src={ownerPhoto} alt={ownerName} className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
                        <div>
                            <h4 className="font-bold text-xl text-gray-800">{ownerName}</h4>
                            <p className="text-gray-600 flex items-center gap-2 text-sm">
                                <HiOutlineMail className='text-primary' /> {userEmail}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="pt-6">
                    <Link to="/" className="btn btn-outline btn-primary w-full md:w-auto font-semibold"> &larr; Back to Vehicle Listings </Link>
                </div>

            </div>
        </div>
    );
};

export default VehicleDetails;