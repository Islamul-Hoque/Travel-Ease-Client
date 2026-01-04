import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import VehiclesCard from "../Components/VehiclesCard";
import useAxios from "../Hooks/useAxios";
import Spinner from "./Spinner";
import { FaSearch, FaFilter } from "react-icons/fa";

const AllVehicles = () => {
  const axiosInstance = useAxios();

  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [sort, setSort] = useState("date-desc");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: filterData, isLoading: filtersLoading } = useQuery({
    queryKey: ["vehicle-filters"],
    queryFn: async () => {
      const res = await axiosInstance.get("/vehicle-filters");
      return res.data;
    },
  });

  const categories = filterData?.categories || [];
  const locations = filterData?.locations || [];

  const { data: vehiclesData, isLoading } = useQuery({
    queryKey: ["all-vehicles", searchQuery, sort, page, limit, filterCategory, filterLocation],

    queryFn: async () => {
      const res = await axiosInstance.get("/all-vehicles", {
        params: { search: searchQuery, sort, page, limit, category: filterCategory, location: filterLocation },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const vehicles = vehiclesData?.data || [];
  const total = vehiclesData?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="px-6 md:px-10 mb-16">
  <h2 className="text-3xl md:text-4xl font-bold text-center py-12">All Available <span className="text-gradient">Vehicles ({total})</span></h2>

<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6 max-w-7xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-[1rem]" />
      <input type="search" value={search}
        onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Search by name, location or category..." />
    </div>

    <select  value={filterCategory}  onChange={(e) => setFilterCategory(e.target.value)} className="select border border-slate-300 rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700">
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat}>{cat}</option>
      ))}
    </select>

    <select  value={filterLocation}  onChange={(e) => setFilterLocation(e.target.value)} className="select border border-slate-300 rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700" >
      <option value="">All Locations</option>
      {locations.map((loc) => (
        <option key={loc}>{loc}</option>
      ))}
    </select>

    <select value={sort}  onChange={(e) => setSort(e.target.value)}  className="select border border-slate-300 rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700" >
      <option value="price-desc">Sort by Price: High to Low</option>
      <option value="price-asc">Sort by Price: Low to High</option>
      <option value="date-desc">Sort by Date: Newest First</option>
      <option value="date-asc">Sort by Date: Oldest First</option>
    </select>
  </div>
</div>

  <div className="">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {isLoading ? (<div className="col-span-4 text-center items-center"><Spinner /></div>) : 
      vehicles.length > 0 ? 
      (vehicles.map((vehicle) => (<VehiclesCard key={vehicle._id} vehicle={vehicle} />))) :
        (<div className="col-span-4 text-center py-20 text-gray-500">
        <p className="text-lg font-medium">No vehicles found.</p></div>)}
    </div>
  </div>


  <div className="flex justify-center mt-8">
    <div className="join gap-2">
      {page > 1 && (<button onClick={() => setPage(page - 1)} className="join-item btn btn-sm bg-indigo-100 text-gray-800 hover:bg-indigo-200">Previous</button>)}
      {Array.from({ length: totalPages }, (_, i) => (<button key={i} onClick={() => setPage(i + 1)} className={`join-item btn btn-sm ${page === i + 1 ? "btn-active bg-indigo-600 text-white" : "bg-indigo-100 text-gray-800 hover:bg-indigo-200 shadow"}`}>{i + 1}</button>))}
      {page < totalPages && (<button onClick={() => setPage(page + 1)} className="join-item btn btn-sm bg-indigo-100 text-gray-800 hover:bg-indigo-200">Next</button>)}
    </div>
  </div>
</div>

  );
};

export default AllVehicles;