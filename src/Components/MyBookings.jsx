import React, { useEffect } from "react";
import { useQuery,} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import Spinner from "./Spinner";
import Swal from "sweetalert2";
import { FaEye, FaTrash } from "react-icons/fa";

const MyBookings = () => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();
  const providerEmail = user?.email || user?.providerData?.[0]?.email || null;

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

  useEffect(() => {
    if (providerEmail) {
      refetch();
    }
  }, [providerEmail, refetch]);

  if (loading || isLoading) return <Spinner />;
  if (isError)
    return <div className="text-center text-red-500 mt-10">Failed to load bookings.</div>;

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center ">
        <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center mt-12">  No Bookings <span className="text-gradient">Found</span> </h2>
        <Link to="/dashboard/vehicle-booking" className="btn-primary mt-6 mb-14">  Browse Vehicles  </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 pb-16 ">
      <h2 className="text-[1.8rem] md:text-[2.6rem] font-bold text-center py-12">  My <span className="text-gradient">Bookings</span> </h2>

      <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>SL</th>
            <th>Vehicle</th>
            <th>Vehicle Name </th>
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
              <td>{index + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="h-12 w-12 rounded-lg overflow-hidden">
                      <img  src={vehicle.coverImage}  alt={vehicle.vehicleName}   className="w-full h-full object-cover"  />
                    </div>
                  </div>
                </div>
              </td>

          <td>{vehicle.vehicleName}</td>
          <td>{vehicle.category}</td>
          <td>{vehicle.location?.split(",")[0]}</td>

          <td>${vehicle.pricePerDay}</td>
          <td>{vehicle.seatingCapacity}</td>
          <td>{format(new Date(vehicle.bookingDate), "MM/dd/yyyy")}</td>

          <td>
            <div className="flex gap-2">
              <Link to={`/vehicle-details/${vehicle.vehicleId}`} className="btn btn-primary btn-xs flex items-center gap-1" >
                <FaEye className="text-sm" /> Details
              </Link>
              <button onClick={() => handleDelete(vehicle._id)} className="btn bg-indigo-100 dark:bg-gray-600 border-none btn-sm flex items-center gap-1" >
                <FaTrash className="text-sm" /> Delete
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