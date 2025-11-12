import React from 'react';
import { Link } from 'react-router';
import { FaDollarSign, FaStar, FaChair, FaTags } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdOutlineDateRange } from 'react-icons/md';
import { format } from 'date-fns';

const VehiclesCard = ({ vehicle }) => {
    const { _id, vehicleName, category, pricePerDay, location, seatingCapacity, rating, coverImage, createdAt } = vehicle
    const formattedDate = format(new Date(createdAt), "MM/dd/yyyy");

    return (
        <div className="card rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition duration-300 transform hover:scale-[1.02] group">
            <div className="h-[15.2rem] md:h-[13.2rem] overflow-hidden"> <img src={coverImage} className="w-full h-full object-cover transition duration-500 hover:scale-105"  alt={vehicleName} /> </div>

            <div className="card-body p-6 flex flex-col justify-between">
                <div className="space-y-4">
                    <div className='flex justify-between items-start'>
                        <h2 className="card-title text-2xl font-extrabold leading-snug"> {vehicleName} </h2>
                        <div className='flex items-center gap-1 text-primary font-bold text-lg'> <FaStar className='text-yellow-500 text-base' /> {Number(rating).toFixed(1)} </div>
                    </div>

                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1"> <FaTags className="text-primary text-sm" /> {category} </div>
                        <div className="flex items-center gap-1">  <HiOutlineLocationMarker className="text-primary text-sm" /> {location.split(',')[0]}</div>
                        <div className="flex items-center gap-1">  <FaChair className="text-primary text-sm" /> {seatingCapacity} Seats  </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <p className="flex items-center gap-1 font-extrabold text-2xl text-primary">  <FaDollarSign className='text-xl' /> {pricePerDay} <span className=''>/ Day</span> </p>
                        <div className="flex items-center gap-1 text-xs "> <MdOutlineDateRange className=" text-sm" /> {formattedDate} </div>
                    </div>
                </div>
                <Link to={`/vehicle-details/${_id}`} className="btn-primary-w-full mt-2" > View Details </Link>
            </div>
        </div>
    );
};

export default VehiclesCard;