import React from "react";
import { useLoaderData } from "react-router";
import { FaStar, FaChair, FaDollarSign, FaCheckCircle, FaUsers, FaTags } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { format } from "date-fns";

const VehicleDetails = () => {
  const data = useLoaderData()

  const { _id, vehicleName, ownerName, ownerPhoto, reviewsCount, category, pricePerDay, location, seatingCapacity, description, coverImage, createdAt, userEmail, features = [], rating = 0, totalBookings = 0, status = "active" } = data;
  const formattedDate = format(new Date(createdAt), "MM/dd/yyyy");

  return (
  <div className="px-6 md:px-10 mx-auto pb-10 ">
    <h2 className="text-[2rem] md:text-[2.8rem]  font-bold text-center py-10">Vehicle <span className='text-gradient'>Details</span></h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-14">
        <div className="md:col-span-2 space-y-10 ">
          <div className=" p-6 rounded-xl shadow space-y-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">

            <div className="rounded-xl overflow-hidden shadow-sm bg-gray-100 dark:bg-gray-700"> <img src={coverImage} className="w-full object-cover max-h-[550px]" alt={vehicleName}/> </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">About this Vehicle</h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-400">{description}</p>
            </div>

            {features.length > 0 && (
              <div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Included Features</h4>
                <div className="flex flex-wrap gap-2"> 
                  { features.map((feature, index) => (
                    <span key={index} className="flex items-center gap-1 py-1 rounded-full text-sm"> <FaCheckCircle className="text-green-500" /> {feature} </span>))
                  }
                </div>
              </div>
            )}

            <div>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Meet the Host</h4>
              <div className="flex items-center gap-5">
                <img src={ownerPhoto} className="w-16 h-16 rounded-full object-cover shadow" alt={ownerName} />
                <div>
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">{ownerName}</h4>
                  <p className=" text-sm flex items-center gap-1 mt-1 text-gray-600 dark:text-gray-400"><HiOutlineMail className="text-indigo-600" /> {userEmail}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      <div className="md:col-span-1">
        <div className="sticky top-10 space-y-6">
          <div className="p-8 rounded-xl shadow-sm space-y-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h1 className="text-[2rem] font-bold text-gray-800 dark:text-gray-100 mb-5">{vehicleName}</h1>
            <div className="text-sm space-y-1">
              <div className="flex justify-between"><span><FaTags className="inline mr-1 text-primary"/> Category</span> <span className="font-medium text-gray-700 dark:text-gray-300">{category}</span> </div>
              <div className="flex justify-between"><span><FaDollarSign className="inline mr-1 text-primary" /> Price</span> <span className="font-medium text-gray-700 dark:text-gray-300">{pricePerDay} <span>/ Day</span></span> </div>
              <div className="flex justify-between"><span><FaStar className="inline mr-1 text-yellow-600" /> Rating</span> <span className="font-medium text-yellow-600">{rating.toFixed(1)}</span> </div>
              <div className="flex justify-between"><span><FaUsers className="inline mr-1 text-primary" /> Reviews</span><span className="font-medium text-gray-700 dark:text-gray-300">{reviewsCount}</span></div>
              <div className="flex justify-between"><span><MdOutlineDateRange className="inline mr-1 text-primary" /> Added</span><span className="font-medium text-gray-700 dark:text-gray-300">{formattedDate}</span></div>
              <div className="flex justify-between"><span><FaChair className="inline mr-1 text-primary" /> Seats</span><span className="font-medium text-gray-700 dark:text-gray-300">{seatingCapacity}</span></div>
              <div className="flex justify-between"><span><HiOutlineLocationMarker className="inline mr-1 text-primary" /> Location</span><span className="font-medium text-gray-700 dark:text-gray-300">{location}</span></div>
              <div className="flex justify-between"><span><FaCheckCircle className="inline mr-1 text-primary" /> Status</span><span className="text-green-600">{status}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )}

export default VehicleDetails;