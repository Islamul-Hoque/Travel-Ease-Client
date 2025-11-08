// src/Components/VehiclesCard.jsx

import React from 'react';
import { Link } from 'react-router';
import { FaDollarSign, FaStar, FaChair } from 'react-icons/fa'; 
import { HiOutlineLocationMarker } from 'react-icons/hi'; 

const VehiclesCard = ({ vehicle }) => {

    const { 
        _id, 
        vehicleName, 
        category, 
        pricePerDay, 
        location, 
        seatingCapacity, 
        rating, 
        coverImage 
    } = vehicle;

    if (!_id) return null;

    return (
        <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            

            <figure className='relative h-56 w-full'>
                <img 
                    src={coverImage} 
                    alt={vehicleName} 
                    className="w-full h-full object-cover" 
                />
                

                <div className="badge badge-primary absolute top-3 right-3 text-white font-semibold">
                    {category}
                </div>
            </figure>


            <div className="card-body p-5">
                

                <div className='flex justify-between items-start mb-2'>
                    <h2 className="card-title text-xl text-gray-800 hover:text-primary transition-colors">
                        {vehicleName}
                    </h2>
                    <div className='flex items-center gap-1 text-primary font-bold'>
                        <FaStar />
                        {rating}
                    </div>
                </div>


                <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-600 text-sm">
          
                    <div className="flex items-center gap-1 font-bold text-lg text-secondary">
                        <FaDollarSign /> {pricePerDay} / Day
                    </div>
                    
                
                    <div className="flex items-center gap-1">
                        <HiOutlineLocationMarker className="text-primary" /> 
                        {location.split(',')[0]} 
                    </div>
                    
       
                    <div className="flex items-center gap-1">
                        <FaChair className="text-primary" /> 
                        {seatingCapacity} Seats
                    </div>
                </div>

                <div className="card-actions justify-end mt-4">
                
                    <Link to={`/vehicle-details/${_id}`} className="btn btn-primary w-full text-white font-semibold">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VehiclesCard;