import React from 'react';
import { Link } from 'react-router'; 
import { FaDollarSign, FaStar, FaChair } from 'react-icons/fa'; 
import { HiOutlineLocationMarker } from 'react-icons/hi'; 
import { MdOutlineDateRange } from 'react-icons/md'; 

const VehiclesCard = ({ vehicle }) => {
    const { _id, vehicleName, category, pricePerDay, location, seatingCapacity, rating, coverImage, createdAt } = vehicle;

    const normalizedPrice = pricePerDay?.$numberInt ? parseInt(pricePerDay.$numberInt) : pricePerDay;

    if (!_id) return null;

    return (
        <div className="card w-full bg-white shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:bg-gray-50 border border-transparent hover:border-primary rounded-2xl overflow-hidden group">
            
            <figure className='relative h-60 w-full overflow-hidden'>
                <img 
                    src={coverImage} 
                    alt={vehicleName} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="badge badge-lg badge-accent absolute top-4 left-4 text-white text-sm font-semibold p-3 shadow-md">
                    {category}
                </div>
            </figure>

            <div className="card-body p-6 space-y-4">
                
                <div className='flex justify-between items-start'>
                    <h2 className="card-title text-2xl font-extrabold text-gray-900 hover:text-primary transition-colors leading-snug">
                        {vehicleName}
                    </h2>
                    <div className='flex items-center gap-1 text-primary font-bold text-lg'>
                        <FaStar className='text-yellow-500 text-base' /> {rating}
                    </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 text-base">
                    
                    <div className="flex items-center gap-1 bg-gray-50 p-1 px-2 rounded-full group-hover:bg-white">
                        <HiOutlineLocationMarker className="text-primary text-lg" /> 
                        <span className='font-medium text-sm'>{location.split(',')[0]}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-gray-50 p-1 px-2 rounded-full group-hover:bg-white">
                        <FaChair className="text-primary text-sm" /> 
                        <span className='font-medium text-sm'>{seatingCapacity} Seats</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    
                    <div className="flex flex-col">
                        <span className='text-sm text-gray-500'>Price/Day</span>
                        <p className="flex items-baseline font-extrabold text-3xl text-secondary">
                            <FaDollarSign className='text-primary text-xl mr-1'/> {normalizedPrice}
                        </p>
                    </div>

                    <Link to={`/vehicle-details/${_id}`} className="btn btn-primary text-white font-semibold shadow-md hover:shadow-lg">  View Details </Link>

                </div>

                <div className="flex justify-end pt-2">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MdOutlineDateRange className="text-gray-400 text-sm" /> 
                        Added: {new Date(createdAt).toLocaleDateString()} 
                    </div>
                </div>

            </div>
        </div>
    );
};

export default VehiclesCard;