// import React, { useEffect, useState } from "react";
// import useAuth from "../Hooks/useAuth";
// import { FaDollarSign, FaStar, FaChair, FaTags,  FaEye, } from "react-icons/fa";
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import { MdOutlineDateRange } from "react-icons/md";
// import { Link } from "react-router";
// import useAxios from "../Hooks/useAxios";
// import Spinner from "./Spinner";
// import { format } from "date-fns";

// const MyBookings = () => {
//   const { user, loading } = useAuth();
//   const axiosInstance = useAxios()
//   const [booking, setBooking] = useState([]);

//   useEffect(() => {
//     if (user?.email) {
//         axiosInstance.get(`/my-bookings?email=${user.email }`)
//         .then((data) => {
//           setBooking(data.data);
//         })
//     }
//   }, [user?.email, axiosInstance]);

//   if (loading) return <Spinner />;

//   if (booking.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center ">
//         <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center mt-12"> No Bookings <span className="text-gradient">Found</span> </h2>
//         <Link to="/all-vehicles" className="btn-primary mt-6 mb-14"> Browse Vehicles </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="px-6 md:px-10">
//       <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center py-12"> My <span className="text-gradient">Bookings</span> </h2>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
//         { 
//           booking.map((vehicle) => (
//             <div key={vehicle._id} className="card rounded-xl overflow-hidden shadow hover:shadow-lg dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] transition duration-300 transform hover:scale-[1.02] group bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">

//             <div className="h-[15.2rem] md:h-[13.2rem] overflow-hidden"> <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="w-full h-full object-cover transition duration-500 hover:scale-105" /> </div>

//             <div className="card-body p-6 flex flex-col justify-between">
//               <div className="space-y-4">
//                 <div className="flex justify-between items-start">
//                   <h2 className="card-title font-bold leading-snug text-gray-800 dark:text-gray-100">{vehicle.vehicleName}</h2>
//                   <div className="flex items-center gap-1 text-primary font-bold text-lg"> <FaStar className="text-yellow-500 text-base" /> {Number(vehicle.rating).toFixed(1)} </div>
//                 </div>

//                 <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
//                   <div className="flex items-center gap-1"><FaTags className="text-primary text-sm" /> {vehicle.category}</div>
//                   <div className="flex items-center gap-1"><HiOutlineLocationMarker className="text-primary text-sm" /> {vehicle.location.split(",")[0]}</div>
//                   <div className="flex items-center gap-1"><FaChair className="text-primary text-sm" /> {vehicle.seatingCapacity} Seats</div>
//                 </div>

//                 <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 my-2">
//                   <p className="flex items-center gap-1 font-bold text-xl text-primary"> <FaDollarSign className="" /> {vehicle.pricePerDay} <span>/ Day</span> </p>
//                   <div className="flex items-center gap-1 text-xs"> <MdOutlineDateRange className="text-sm" /> {format(new Date(vehicle.createdAt), "MM/dd/yyyy")} </div>
//                 </div>
//               </div>
//               <Link to={`/vehicle-details/${vehicle.vehicleId}`} className="btn-primary-w-full flex items-center gap-1"><FaEye /> Details</Link>
//             </div>
//           </div>))
//         }
//       </div>
//     </div>
//   );
// };

// export default MyBookings;



import React, { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import Spinner from "./Spinner";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();

  // ✅ fallback email from providerData
  const providerEmail = user?.email || user?.providerData?.[0]?.email || null;

  // ✅ Fetch bookings
  const {
    data: bookings = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myBookings", providerEmail],
    queryFn: async () => {
      const res = await axiosInstance.get(`/my-bookings?email=${providerEmail}`);
      return res.data;
    },
    enabled: !!providerEmail,
  });

  // ✅ Delete mutation
const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This booking will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      axiosInstance.delete(`/my-bookings/${id}`)
        .then(() => {
          toast.success("Booking deleted!");
          refetch();
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Delete failed");
        });
    }
  });
};



  // ✅ auto refetch when email becomes available
  useEffect(() => {
    if (providerEmail) {
      refetch();
    }
  }, [providerEmail, refetch]);

  // ✅ Loading states
  if (loading || isLoading) return <Spinner />;
  if (isError)
    return <div className="text-center text-red-500 mt-10">Failed to load bookings.</div>;

  // ✅ Empty state
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center ">
        <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center mt-12">
          No Bookings <span className="text-gradient">Found</span>
        </h2>
        <Link to="/dashboard/vehicle-booking" className="btn-primary mt-6 mb-14">
          Browse Vehicles
        </Link>
      </div>
    );
  }

  // ✅ Table view
  return (
    <div className="px-6 md:px-10">
      <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center py-12">
        My <span className="text-gradient">Bookings</span>
      </h2>

      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>SL</th>
        <th>Vehicle</th>
        <th>Category</th>
        <th>Location</th>
        <th>Price/Day</th>
        <th>Seats</th>
        <th>Booked On</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {bookings.map((vehicle, index) => (
        <tr key={vehicle._id}>
          {/* Serial number */}
          <td>{index + 1}</td>

          {/* Vehicle info with image */}
          <td>
            <div className="flex items-center gap-3">
<div className="avatar">
  <div className="h-12 w-12 rounded-lg overflow-hidden">
    <img
      src={vehicle.coverImage}
      alt={vehicle.vehicleName}
      className="w-full h-full object-cover"
    />
  </div>
</div>


              <div>
                <div className="font-bold">{vehicle.vehicleName}</div>
               
              </div>
            </div>
          </td>

          {/* Other columns */}
          <td>{vehicle.category}</td>
          <td>{vehicle.location?.split(",")[0]}</td>

          <td>${vehicle.pricePerDay}</td>
          <td>{vehicle.seatingCapacity}</td>
          <td>{format(new Date(vehicle.bookingDate), "MM/dd/yyyy")}</td>

          {/* Actions */}
          <td>
            <div className="flex gap-2">
              <Link
                to={`/vehicle-details/${vehicle.vehicleId}`}
                className="btn btn-ghost btn-xs"
              >
                Details
              </Link>
              <button
                onClick={() => handleDelete(vehicle._id)}
                className="btn btn-error btn-xs"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default MyBookings;
