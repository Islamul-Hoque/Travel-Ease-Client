import React, { useEffect, useState } from "react";
import VehiclesCard from "../Components/VehiclesCard";
import useAxios from "../Hooks/useAxios";
import Spinner from "./Spinner";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("")
  const axiosInstance = useAxios()

  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/all-vehicles")
      .then(data => {
        setVehicles(data.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  }, [axiosInstance]);

  const handleSortedPrice = (e) => {
    const value = e.target.value;
    setSortOrder(value);

    const sortedVehicles = [...vehicles].sort((a, b) => {
      if (value === "Low to High") return a.pricePerDay - b.pricePerDay
      if (value === "High to Low") return b.pricePerDay - a.pricePerDay
      return 0;
    })
    setVehicles(sortedVehicles);
  }

  if (loading) return <Spinner/>

  return (
    <div className="px-6 md:px-10 mx-auto mb-16">
      <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center text- black py-12">All Available <span className='text-gradient'>Vehicles ({vehicles.length})</span></h2>

      <div className="flex justify-end mb-10 -mt-4">
        <select className="select bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200 " value={sortOrder} onChange={handleSortedPrice}>
          <option value="" disabled>Sort by price</option>
          <option value="Low to High">Low to High</option>
          <option value="High to Low">High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        { vehicles.map(vehicle => (
          <VehiclesCard key={vehicle._id} vehicle={vehicle} />))
        }
      </div>
    </div>
  )}

export default AllVehicles;