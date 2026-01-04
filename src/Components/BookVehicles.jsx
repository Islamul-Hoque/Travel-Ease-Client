import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FaCalendarCheck, FaStar, FaTags, FaChair, FaDollarSign, FaEye } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const BookVehicles = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ["book-vehicles"],
    queryFn: async () => {
      const res = await axiosInstance.get("/book-vehicles");
      return res.data;
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (vehicle) => {
      const bookingData = {
        vehicleId: vehicle._id, 
        vehicleName: vehicle.vehicleName, 
        category: vehicle.category,
        pricePerDay: vehicle.pricePerDay, 
        location: vehicle.location, 
        seatingCapacity: vehicle.seatingCapacity,
        rating: vehicle.rating, 
        coverImage: vehicle.coverImage, 
        createdAt: vehicle.createdAt,
        reviewsCount: vehicle.reviewsCount, 
        userEmail: user.email, 
        bookingDate: new Date().toISOString(),
      };
      const res = await axiosInstance.post("/book-vehicles/book", bookingData);
      return res.data;
    },
    onSuccess: (data) => { 
      if (data.insertedId) toast.success("🎉 Booking confirmed!");
        else toast.error(data.message || "Booking failed"); },
        onError: (err) => {
        toast.error(err.response?.data?.message || "Something went wrong"); },
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="px-6 md:px-10 mx-auto pb-14">
      <h2 className="text-[1.8rem] md:text-[2.6rem] font-bold text-center py-12"> Book <span className="text-gradient">Vehicles</span> </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="card rounded-xl overflow-hidden shadow hover:shadow-lg dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] transition duration-300 transform hover:scale-[1.02] group bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="h-[15.2rem] md:h-[13.2rem] overflow-hidden"><img src={vehicle.coverImage} alt={vehicle.vehicleName} className="w-full h-full object-cover transition duration-500 hover:scale-105" /></div>
            <div className="card-body p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="card-title font-bold leading-snug text-gray-800 dark:text-gray-100">{vehicle.vehicleName}</h2>
                  <div className="flex items-center gap-1 text-primary font-bold text-lg"><FaStar className="text-yellow-500 text-base" />{Number(vehicle.rating).toFixed(1)}</div>
                </div>
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1"><FaTags className="text-primary text-sm" /> {vehicle.category}</div>
                  <div className="flex items-center gap-1"><HiOutlineLocationMarker className="text-primary text-sm" /> {vehicle.location?.split(",")[0]}</div>
                  <div className="flex items-center gap-1"><FaChair className="text-primary text-sm" /> {vehicle.seatingCapacity} Seats</div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 my-2">
                  <p className="flex items-center gap-1 font-bold text-xl text-primary"><FaDollarSign /> {vehicle.pricePerDay} <span>/ Day</span></p>
                  <div className="flex items-center gap-1 text-xs"><MdOutlineDateRange className="text-sm" /> {format(new Date(vehicle.createdAt), "MM/dd/yyyy")}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/vehicle-details/${vehicle._id}`} className="btn-outline-primary flex-1 flex items-center justify-center gap-1"><FaEye /> Details</Link>
                <button onClick={() => bookingMutation.mutate(vehicle)} className="btn-primary flex-1" disabled={bookingMutation.isLoading}>{bookingMutation.isLoading ? "Booking..." : "Book Now"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookVehicles;