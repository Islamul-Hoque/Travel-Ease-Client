import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { FaDollarSign, FaStar, FaChair, FaTags,  FaEye, } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router";
import useAxios from "../Hooks/useAxios";
import Spinner from "./Spinner";
import { format } from "date-fns";

const MyBookings = () => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios()
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    if (user?.email) {
        axiosInstance.get(`/my-bookings?email=${user.email}`)
        .then((data) => {
          setBooking(data.data);
        })
    }
  }, [user, axiosInstance]);

  if (loading) return <Spinner />;

  if (booking.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center ">
        <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center mt-12"> No Bookings <span className="text-gradient">Found</span> </h2>
        <Link to="/all-vehicles" className="btn-primary mt-6 mb-14"> Browse Vehicles </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10">
      <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center py-12"> My <span className="text-gradient">Bookings</span> </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
        { 
          booking.map((vehicle) => (
            <div key={vehicle._id} className="card rounded-xl overflow-hidden shadow hover:shadow-lg dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] transition duration-300 transform hover:scale-[1.02] group bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">

            <div className="h-[15.2rem] md:h-[13.2rem] overflow-hidden"> <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="w-full h-full object-cover transition duration-500 hover:scale-105" /> </div>

            <div className="card-body p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-2xl font-extrabold leading-snug text-gray-800 dark:text-gray-100">{vehicle.vehicleName}</h2>
                  <div className="flex items-center gap-1 text-primary font-bold text-lg"> <FaStar className="text-yellow-500 text-base" /> {Number(vehicle.rating).toFixed(1)} </div>
                </div>

                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1"><FaTags className="text-primary text-sm" /> {vehicle.category}</div>
                  <div className="flex items-center gap-1"><HiOutlineLocationMarker className="text-primary text-sm" /> {vehicle.location.split(",")[0]}</div>
                  <div className="flex items-center gap-1"><FaChair className="text-primary text-sm" /> {vehicle.seatingCapacity} Seats</div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 my-2">
                  <p className="flex items-center gap-1 font-extrabold text-2xl text-primary"> <FaDollarSign className="text-xl" /> {vehicle.pricePerDay} <span>/ Day</span> </p>
                  <div className="flex items-center gap-1 text-xs"> <MdOutlineDateRange className="text-sm" /> {format(new Date(vehicle.createdAt), "dd/MM/yyyy")} </div>
                </div>
              </div>
              <Link to={`/vehicle-details/${vehicle.vehicleId}`} className="btn-primary-w-full flex items-center gap-1"><FaEye /> Details</Link>
            </div>
          </div>))
        }
      </div>
    </div>
  );
};

export default MyBookings;