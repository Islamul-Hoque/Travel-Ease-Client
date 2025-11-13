import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../Hooks/useAxios.jsx";
import Spinner from "./Spinner.jsx";
import { format } from "date-fns";

const categories = ["Sedan", "SUV", "Electric", "Van"];

const AddVehicle = () => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();
  // const navigate = useNavigate();

  if(loading) return <Spinner/>

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVehicleData = {
      vehicleName: e.target.vehicleName.value,
      category: e.target.category.value,
      location: e.target.location.value,
      description: e.target.description.value,
      coverImage: e.target.coverImage.value,
      ownerName: user?.displayName,
      ownerPhoto: user?.photoURL,
      userEmail: user?.email,
      status: "active",
      reviewsCount: 0,
      rating: 0,
      createdAt: format(new Date(), "dd/MM/yyyy"),
      pricePerDay: parseInt(e.target.pricePerDay.value),
      seatingCapacity: parseInt(e.target.seatingCapacity.value),
      features: e.target.features.value.split(",").map(feature => feature.trim())
    }

    axiosInstance.post("/add-vehicle", newVehicleData,{ headers: { "Content-Type": "application/json" } })
      .then((data) => { if (data.data.insertedId) { 
        toast.success(`"${newVehicleData.vehicleName}" has been added successfully!`)
        e.target.reset() } 
      })
      .catch((err) => { 
        toast.error(`Failed to add ${newVehicleData.vehicleName}. Please try again!`)
      })
    }

  return (
    <div className="px-6 md:px-10">
      <div className="mx-auto p-8 rounded-2xl shadow-sm dark:shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 my-16">
        <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center mb-8 mt-3 text-gray-900 dark:text-gray-100">Add New <span className='text-gradient'>Vehicle</span></h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className=" label font-medium mb-1">Vehicle Name</label>
              <input type="text" name="vehicleName" placeholder="e.g. Toyota Aqua" className="input bg-gray-50 dark:bg-gray-700 w-full" required />
            </div>
            <div>
              <label className=" label font-medium mb-1">Category</label>
              <select name="category" className="select bg-gray-50 dark:bg-gray-700 select-bordered w-full" required>
                <option disabled>Select Vehicle Type</option>
                  { categories.map( category => ( <option key={category} value={category}> {category} </option>))}
              </select>
              </div>
            <div>
              <label className=" label font-medium mb-1">Price per Day ($)</label>
              <input type="number" name="pricePerDay" placeholder="e.g. 3500" className="input bg-gray-50 dark:bg-gray-700 w-full" required />
            </div>
            <div>
              <label className=" label font-medium mb-1">Seating Capacity</label>
              <input type="number" name="seatingCapacity" placeholder="e.g. 5" className="input bg-gray-50 dark:bg-gray-700 w-full" required />
            </div>
            <div>
              <label className=" label font-medium mb-1">Location (City, Country)</label>
              <input type="text" name="location" placeholder="e.g. Dhaka, Bangladesh" className="input bg-gray-50 dark:bg-gray-700 w-full" required />
            </div>
            <div>
              <label className=" label font-medium mb-1">Features (comma separated)</label>
              <input type="text" name="features" placeholder="e.g. AC, GPS, Cruise Control" className="input bg-gray-50 dark:bg-gray-700 w-full" required />
            </div>
            <div className="md:col-span-2">
              <label className="label font-semibold mb-1">Cover Image URL</label>
              <input type="text" name="coverImage" placeholder="https://..." className="input bg-gray-50 dark:bg-gray-700 w-full" required />
            </div>
            <div className="md:col-span-2">
              <label className="label font-semibold mb-1">Description</label>
              <textarea name="description" placeholder="Write a short description about the vehicle..." className="textarea bg-gray-50 dark:bg-gray-700 textarea-bordered w-full h-24" rows={3} required></textarea>
            </div>
          </div>
          <h2 className="text-2xl font-bold">Owner Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="label font-semibold mb-1">Owner Name (Read Only)</label>
              <input type="text" name="ownerName" defaultValue={user?.displayName } className="input w-full bg-gray-50 dark:bg-gray-700 cursor-not-allowed" readOnly />
            </div>
            <div>
              <label className="label font-semibold mb-1">Owner Photo URL (Read Only)</label>
              <input type="text" name="ownerPhoto" defaultValue={user?.photoURL } className="input w-full bg-gray-50 dark:bg-gray-700 cursor-not-allowed" readOnly />
            </div>
            <input type="hidden" name="userEmail" defaultValue={user?.email} />
          </div>
          <div className="form-control"><button type="submit" className="btn-primary-w-full mt-4" >Add Vehicle</button></div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;