import React, { useEffect, useState } from "react";
import VehiclesCard from "../Components/VehiclesCard";
import useAxios from "../Hooks/useAxios";
import Spinner from "./Spinner";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios()

  useEffect(() => {
    setLoading(true)
    axiosInstance.get("/all-vehicles")
      .then(data => {
        setVehicles(data.data)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
      })
  }, [axiosInstance])

  if (loading) return <Spinner/>

  return (
    <div className="px-6 md:px-10 bg-gray- 100 mx-auto mb-16">
      <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center text- black py-12">All Available <span className='text-gradient'>Vehicles ({vehicles.length})</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        { vehicles.map(vehicle => (
          <VehiclesCard key={vehicle._id} vehicle={vehicle} />))
        }
      </div>
    </div>
  )}

export default AllVehicles;