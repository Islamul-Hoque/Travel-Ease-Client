import React from "react";
import { useLoaderData, Link } from "react-router"; 
import { FaStar, FaChair, FaDollarSign, FaUserAlt, FaCheckCircle, FaUsers, FaCar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { HiOutlineMail } from 'react-icons/hi';
// import { toast } from 'react-toastify'; 
// import useAuth from '../Hooks/useAuth'; 
// import useAxiosSecure from '../Hooks/useAxiosSecure'; 


const VehicleDetails = () => {
    const data = useLoaderData();
    console.log(data);
    

    if (!data) return <p className="text-center py-10 text-xl">Loading vehicle details...</p>;

    // MongoDB 
    const normalizedPrice = data.pricePerDay?.$numberInt ? parseInt(data.pricePerDay.$numberInt) : data.pricePerDay;
    const normalizedRating = data.rating?.$numberDouble ? parseFloat(data.rating.$numberDouble) : data.rating;
    const normalizedReviewsCount = data.reviewsCount?.$numberInt ? parseInt(data.reviewsCount.$numberInt) : data.reviewsCount;
    const normalizedSeatingCapacity = data.seatingCapacity?.$numberInt ? parseInt(data.seatingCapacity.$numberInt) : data.seatingCapacity;
    

    const {
        vehicleName,
        ownerName,
        ownerPhoto,
        category,
        pricePerDay: rawPrice, 
        location,
        seatingCapacity: rawSeatingCapacity, 
        features,
        rating: rawRating, 
        totalBookings,
        description,
        coverImage,
        createdAt,
        userEmail, 
        status = 'active', 
    } = data;


    const handleBookNow = () => {

        console.log(`Booking request placed for vehicle: ${vehicleName}`);

    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
            <div className="bg-white shadow-2xl rounded-xl p-6 lg:p-10 space-y-8">
                

                <div className="lg:flex lg:space-x-10">
                    

                    <div className="lg:w-2/3 mb-6 lg:mb-0 relative rounded-xl overflow-hidden shadow-lg border-2 border-gray-100">
                        <img
                            src={coverImage}
                            alt={vehicleName}
                            className="w-full h-full object-cover max-h-[500px]"
                        />

                        <div className="badge badge-primary absolute top-4 left-4 text-white text-sm font-semibold">
                            {category}
                        </div>
                    </div>

                    <div className="lg:w-1/3 space-y-6">
                        <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">
                            {vehicleName}
                        </h1>


                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-inner">
                            <p className="text-2xl font-extrabold text-secondary flex items-center gap-1">
                                <FaDollarSign className='text-primary'/> {normalizedPrice} <span className="text-base text-gray-500 font-normal">/ Day</span>
                            </p>
                            <div className="flex items-center text-lg text-primary font-bold gap-1">
                                <FaStar className="text-yellow-500" /> {normalizedRating}
                            </div>
                        </div>


                        <div className="text-gray-600 space-y-2">
                            <p className='flex justify-between font-medium'>
                                <span><FaStar className="inline text-yellow-500 mr-1"/> User Rating:</span>
                                <span className='font-bold text-gray-800'>{normalizedRating} / 5</span>
                            </p>
                            <p className='flex justify-between font-medium'>
                                <span><FaUsers className="inline text-primary mr-1"/> Reviews:</span>
                                <span className='font-bold text-gray-800'>{normalizedReviewsCount}</span>
                            </p>
                            <p className='flex justify-between font-medium'>
                                <span><FaCar className="inline text-primary mr-1"/> Total Bookings:</span>
                                <span className='font-bold text-gray-800'>{totalBookings}</span>
                            </p>
                            <p className='flex justify-between font-medium'>
                                <span><MdOutlineDateRange className="inline text-primary mr-1"/> Added Date:</span>
                                <span className='font-bold text-gray-800'>{new Date(createdAt).toLocaleDateString()}</span>
                            </p>
                        </div>
                        

                        <button 
                            onClick={handleBookNow} 
                            className="btn btn-primary w-full text-white text-lg font-bold py-3 transition-transform duration-200 hover:scale-[1.01]"
                            disabled={status !== 'active'}
                        >
                            {status === 'active' ? 'Book Now / Request Ride' : 'Currently Booked'}
                        </button>
                    </div>
                </div>
                



                <div className="mt-8 border-t border-gray-200 pt-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-1">Vehicle Description</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-3 p-4 bg-blue-50 rounded-lg border">
                    <div className="flex items-center gap-2 text-primary font-semibold text-lg">
                        <FaChair /> {normalizedSeatingCapacity} Seats
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold text-lg">
                        <HiOutlineLocationMarker /> {location}
                    </div>
                </div>


                <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-1">Key Features Included</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
                        {features && features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm text-base font-medium">
                                <FaCheckCircle className="text-green-500 text-lg" /> 
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Owner Info */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-1">Owner Information</h3>
                    <div className="flex items-center gap-6 p-4 border-2 border-primary rounded-lg bg-blue-50 max-w-xl shadow-md">
                        <img
                            src={ownerPhoto}
                            alt={ownerName}
                            className="w-16 h-16 rounded-full object-cover border-2 border-primary ring-2 ring-primary/50"
                        />
                        <div>
                            <h4 className="font-bold text-xl text-gray-800">{ownerName}</h4>
                            <p className="text-gray-600 flex items-center gap-2 text-sm">
                                <HiOutlineMail className='text-base text-primary'/> {userEmail}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="pt-6">
                    <Link
                        to="/"
                        className="btn btn-outline btn-primary w-full md:w-auto font-semibold"
                    >
                        &larr; Back to Vehicle Listings
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default VehicleDetails;