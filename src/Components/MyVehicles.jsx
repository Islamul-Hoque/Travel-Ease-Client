import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaDollarSign, FaChair, FaMapMarkerAlt, FaCar, FaStar, FaTags } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link } from "react-router";
import Spinner from "./Spinner";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios.jsx";
import { format } from "date-fns";

const MyVehicles = () => {
  const { user, loading } = useAuth()
  const axiosInstance = useAxios()
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    if (user?.email) {
      axiosInstance.get(`/my-vehicles?email=${user.email}`)
        .then(data => setVehicles(data.data))
    }
  }, [user, axiosInstance]);

  const handleDeleteVehicle = (id, vehicleName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${vehicleName}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/my-vehicles/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: `"${vehicleName}" has been deleted successfully! 🗑️`,
                icon: "success",
              });
              setVehicles((prev) => prev.filter((vehicle) => vehicle._id !== id));
            } else {
              Swal.fire({
                title: "Failed!",
                text: "Vehicle not found or already deleted.",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            console.error("Delete Vehicle Error:", err);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete vehicle.",
              icon: "error",
            })
          })
      }
    })
  }

  if (loading) return <Spinner />

  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center ">
        <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center mt-12"> No Vehicles Listed <span className='text-gradient'>Yet</span> </h2>
        <Link to="/add-vehicle" className="btn-primary mt-6 mb-14"> Add Your First Vehicle Now! </Link>
      </div>)
  }

  return (
    <div className="px-6 md:px-10 ">
      <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center py-12"> My Listed <span className='text-gradient'>Vehicles</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="card rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300 transform hover:scale-[1.02] group">

            <div className="relative h-56 w-full overflow-hidden">
              <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="w-full h-full object-cover transition duration-500 hover:scale-105" /></div>

            <div className="card-body p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className='flex justify-between items-start'>
                  <h2 className="card-title text-2xl font-extrabold leading-snug">{vehicle.vehicleName}</h2>
                  <div className='flex items-center gap-1 text-primary font-bold text-lg'>  <FaStar className='text-yellow-500 text-base' /> {Number(vehicle.rating).toFixed(1)}</div>
                </div>

                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1"><FaTags className="text-primary text-sm" /> {vehicle.category}</div>
                  <div className="flex items-center gap-1"><HiOutlineLocationMarker className="text-primary text-sm" /> {vehicle.location.split(',')[0]}</div>
                  <div className="flex items-center gap-1"><FaChair className="text-primary text-sm" /> {vehicle.seatingCapacity} Seats</div>
                </div>

                <div className="flex items-center justify-between ">
                  <p className="flex items-center gap-1 font-extrabold text-2xl text-primary"> <FaDollarSign className='text-xl' /> {vehicle.pricePerDay} <span>/ Day</span> </p>
                  <div className="flex items-center gap-1 text-xs"><MdOutlineDateRange className="text-sm" /> {format(new Date(vehicle.createdAt), "dd/MM/yyyy")}  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 p-6 pt-0 gap-2">
              <Link to={`/vehicle-details/${vehicle._id}`} className="btn-primary flex items-center gap-1 "><FaEye /> Details</Link>
              <Link to={`/update-vehicle/${vehicle._id}`} className="btn btn-sm btn-warning text-white flex items-center gap-1 "><FaEdit /> Update</Link>
              <button onClick={() => handleDeleteVehicle(vehicle._id, vehicle.vehicleName)} className="btn btn-sm btn-error text-white flex items-center gap-1 "><FaTrash /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVehicles;