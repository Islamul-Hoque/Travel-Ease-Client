// src/Components/AddVehicle.jsx

import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import {
  FaCar,
  FaUser,
  FaCamera,
  FaDollarSign,
  FaMapMarkerAlt,
  FaChair,
  FaListAlt,
  FaImage,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../Hooks/useAxios.jsx";

const VEHICLE_CATEGORIES = ["Sedan", "SUV", "Electric", "Van"];

const AddVehicle = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const vehicleName = e.target.vehicleName.value;
    const category = e.target.category.value;
    const pricePerDay = e.target.pricePerDay.value;
    const location = e.target.location.value;
    const seatingCapacity = e.target.seatingCapacity.value;
    const features = e.target.features.value;
    const description = e.target.description.value;
    const coverImage = e.target.coverImage.value;

    const ownerName = e.target.ownerName.value || user?.displayName;
    const ownerPhoto = e.target.ownerPhoto.value || user?.photoURL;
    const userEmail = user?.email;

    const createdAt = new Date().toISOString();
    const status = "active";
    const rating = 0;
    const reviewsCount = 0;
    const totalBookings = 0;

const newVehicleData = { vehicleName, category, location, description, coverImage, ownerName, ownerPhoto, userEmail, createdAt, status, rating, reviewsCount, totalBookings, pricePerDay: parseInt(pricePerDay), seatingCapacity: parseInt(seatingCapacity), features: features.split(",").map(f => f.trim()) };

    axiosInstance
      .post("/add-vehicle", newVehicleData, 
        { headers: { "Content-Type": "application/json" }
      } )
      .then((data) => {
        if (data.data.insertedId) {
          toast.success(`"${vehicleName}" has been added successfully! 🚗`);
          e.target.reset();
        }
      })
      .catch((err) => {
        toast.error(`Failed to add ${vehicleName}. Please try again! ❌`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          {" "}
          Add New <span className="text-primary">Vehicle</span>{" "}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="label font-semibold text-gray-700 flex items-center gap-2">
                <FaCar /> Vehicle Name
              </label>
              <input
                type="text"
                name="vehicleName"
                placeholder="e.g. Toyota Aqua"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold text-gray-700 flex items-center gap-2">
                Category
              </label>
              <select
                name="category"
                defaultValue=""
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                {VEHICLE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label font-semibold text-gray-700 flex items-center gap-2">
                <FaDollarSign /> Price per Day (BDT)
              </label>
              <input
                type="number"
                name="pricePerDay"
                placeholder="e.g. 3500"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold text-gray-700 flex items-center gap-2">
                <FaChair /> Seating Capacity
              </label>
              <input
                type="number"
                name="seatingCapacity"
                placeholder="e.g. 5"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold text-gray-700 flex items-center gap-2">
                <FaMapMarkerAlt /> Location (City, Country)
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Dhaka, Bangladesh"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold text-gray-700 flex items-center gap-2">
                <FaListAlt /> Features (comma separated)
              </label>
              <input
                type="text"
                name="features"
                placeholder="e.g. AC, GPS, Bluetooth"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="label font-semibold text-gray-700 flex items-center gap-2">
                <FaImage /> Cover Image URL
              </label>
              <input
                type="text"
                name="coverImage"
                placeholder="https://example.com/car.jpg"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="label font-semibold text-gray-700 flex items-center gap-2">
                <FaInfoCircle /> Description
              </label>
              <textarea
                name="description"
                placeholder="Write a short description about the vehicle features..."
                className="textarea textarea-bordered w-full h-24"
                rows={3}
                required
              ></textarea>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 pt-4 border-t border-gray-200">
            Owner Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="label font-semibold text-gray-700 flex items-center gap-2">
                <FaUser /> Owner Name (Read Only)
              </label>
              <input
                type="text"
                name="ownerName"
                defaultValue={user?.displayName || "N/A"}
                className="input input-bordered w-full bg-gray-50 cursor-not-allowed"
                readOnly
              />
            </div>

            <div>
              <label className="label font-semibold text-gray-700 flex items-center gap-2">
                <FaCamera /> Owner Photo URL (Read Only)
              </label>
              <input
                type="text"
                name="ownerPhoto"
                defaultValue={user?.photoURL || "N/A"}
                className="input input-bordered w-full bg-gray-50 cursor-not-allowed"
                readOnly
              />
            </div>

            <input
              type="hidden"
              name="userEmail"
              defaultValue={user?.email || ""}
            />
          </div>

          <div className="form-control mt-8 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="btn btn-primary-w-full mt-4"
              disabled={loading}
            >
              {" "}
              {loading ? "Adding Vehicle..." : "Add Vehicle"}{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
