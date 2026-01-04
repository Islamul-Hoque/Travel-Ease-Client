import React from "react";
import { useLoaderData, useNavigate } from "react-router";

import useAxios from "../Hooks/useAxios.jsx";
import useAuth from "../Hooks/useAuth.jsx";
import Spinner from "./Spinner.jsx";
import toast, { Toaster } from "react-hot-toast";

const categories = ["Sedan", "SUV", "Electric", "Van"]

const UpdateVehicle = () => {
  const { loading } = useAuth()
  const vehicle = useLoaderData();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  if(loading) return <Spinner/>

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedVehicle = {
      vehicleName: e.target.vehicleName.value,
      category: e.target.category.value,
      location: e.target.location.value,
      pricePerDay: parseInt(e.target.pricePerDay.value),
      seatingCapacity: parseInt(e.target.seatingCapacity.value),
      features: e.target.features.value.split(",").map(feature => feature.trim()),
      description: e.target.description.value,
      coverImage: e.target.coverImage.value,
    };

    axiosInstance.patch(`/my-vehicles/${vehicle._id}`, updatedVehicle)
      .then((data) => {
        if (data.data.modifiedCount) {
          toast.success(`"${updatedVehicle.vehicleName}" updated successfully! 🎉`)
          navigate("/dashboard/my-vehicles")
        }
      })
      .catch((err) => {
        toast.error("Failed to update vehicle. Try again!")
      })
  }

  return (
    <div className="px-6 md:px-10">
      <div className="mx-auto p-8 rounded-2xl my-14  shadow-sm dark:shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center mb-8 mt-2 text-gray-900 dark:text-gray-100">Update <span className='text-gradient'>Vehicle</span></h2>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className=" label font-medium mb-1">Vehicle Name</label>
              <input type="text" name="vehicleName" defaultValue={vehicle.vehicleName} className="input bg-gray-50 dark:bg-gray-700 w-full" required />
            </div>
            <div>
              <label className=" label font-medium mb-1">Category</label>
              <select name="category" defaultValue={vehicle.category} className="select bg-gray-50 dark:bg-gray-700 select-bordered w-full" required>
                <option disabled>Select Vehicle Type</option>
                  { categories.map( category => ( <option key={category} value={category}> {category} </option>))}
              </select>
              </div>
            <div>
              <label className=" label font-medium mb-1">Price per Day ($)</label>
              <input type="number" name="pricePerDay" defaultValue={vehicle.pricePerDay} className="input bg-gray-50 dark:bg-gray-700 w-full" required />
            </div>
            <div>
              <label className=" label font-medium mb-1">Seating Capacity</label>
              <input type="number" name="seatingCapacity" defaultValue={vehicle.seatingCapacity} className="input bg-gray-50 dark:bg-gray-700 w-full" required />
            </div>
            <div>
              <label className=" label font-medium mb-1">Location (City, Country)</label>
              <input type="text" name="location" defaultValue={vehicle.location} className="input bg-gray-50 dark:bg-gray-700 w-full" required />
            </div>
            <div>
              <label className=" label font-medium mb-1">Features (comma separated)</label>
              <input type="text" name="features" defaultValue={vehicle.features.join(", ")} className="input bg-gray-50 dark:bg-gray-700 w-full" required />
            </div>
            <div className="md:col-span-2">
              <label className="label font-semibold mb-1">Cover Image URL</label>
              <input type="text" name="coverImage" defaultValue={vehicle.coverImage} className="input bg-gray-50 dark:bg-gray-700 w-full" required />
            </div>
            <div className="md:col-span-2">
              <label className="label font-semibold mb-1">Description</label>
              <textarea name="description" defaultValue={vehicle.description} className="textarea textarea-bordered bg-gray-50 dark:bg-gray-700 w-full h-24" rows={3} required></textarea>
            </div>
          </div>
          <div className="form-control"><button type="submit" className="btn-primary-w-full mt-4">Update Vehicle</button></div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default UpdateVehicle;