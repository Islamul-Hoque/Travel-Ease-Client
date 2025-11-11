import React, { useEffect, useState } from "react";
import VehiclesCard from "../Components/VehiclesCard";
import { TailSpin } from "react-loader-spinner";
import useAxios from "../Hooks/useAxios";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios()

  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/all-vehicles")
      .then((data) => {
        setVehicles(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      });
  }, [axiosInstance]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <TailSpin
          height="80"
          width="80"
          color="#632ee3"
          ariaLabel="loading-spinner"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl bg-gray-100 mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        All Available <span className="text-primary">Vehicles</span> (
        {vehicles.length})
      </h2>

      {vehicles.length === 0 ? (
        <div className="text-center py-20 text-xl text-gray-500">
          No vehicles are currently listed.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <VehiclesCard key={vehicle._id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVehicles;