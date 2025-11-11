import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  FaCar,
  FaDollarSign,
  FaMapMarkerAlt,
  FaChair,
  FaListAlt,
  FaImage,
  FaInfoCircle,
} from "react-icons/fa";
import useAxios from "../Hooks/useAxios.jsx";

const Categories = ["Sedan", "SUV", "Electric", "Van"];

const UpdateVehicle = () => {
  const vehicle = useLoaderData();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedVehicle = {
      vehicleName: e.target.vehicleName.value,
      category: e.target.category.value,
      pricePerDay: parseInt(e.target.pricePerDay.value),
      location: e.target.location.value,
      seatingCapacity: parseInt(e.target.seatingCapacity.value),
      features: e.target.features.value
        .split(",")
        .map((feature) => feature.trim()),
      description: e.target.description.value,
      coverImage: e.target.coverImage.value,
    };

    axiosInstance
      .patch(`/my-vehicles/${vehicle._id}`, updatedVehicle)
      .then((data) => {
        if (data.data.modifiedCount) {
          toast.success(
            `"${updatedVehicle.vehicleName}" updated successfully! 🚗`
          );
          navigate("/my-vehicles");
        }
      })
      .catch((err) => {
        console.error("Update Vehicle Error:", err);
        toast.error("Failed to update vehicle. Try again!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          {" "}
          Update <span className="text-primary">Vehicle</span>{" "}
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          <fieldset>
            {/* <fieldset className="fieldset"> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="label font-semibold text-gray-700 flex items-center gap-2">
                  <FaCar /> Vehicle Name
                </label>
                <input
                  type="text"
                  name="vehicleName"
                  defaultValue={vehicle.vehicleName}
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
                  defaultValue={vehicle.category}
                  className="select select-bordered w-full"
                  required
                >
                  {Categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
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
                  defaultValue={vehicle.pricePerDay}
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
                  defaultValue={vehicle.seatingCapacity}
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
                  defaultValue={vehicle.location}
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
                  defaultValue={vehicle.features.join(", ")}
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
                  defaultValue={vehicle.coverImage}
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
                  defaultValue={vehicle.description}
                  className="textarea textarea-bordered w-full h-24"
                  rows={3}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary-w-full mt-4"
              disabled={loading}
            >
              {" "}
              {loading ? "Updating..." : "Update Vehicle"}{" "}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default UpdateVehicle;
