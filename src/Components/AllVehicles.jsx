// import React, { useEffect, useState } from "react";
// import VehiclesCard from "../Components/VehiclesCard";
// import useAxios from "../Hooks/useAxios";
// import Spinner from "./Spinner";

// const AllVehicles = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sortOrder, setSortOrder] = useState("")
//   const axiosInstance = useAxios()

//   useEffect(() => {
//     setLoading(true);
//     axiosInstance.get("/all-vehicles")
//       .then(data => {
//         setVehicles(data.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setLoading(false);
//       });
//   }, [axiosInstance]);

//   const handleSortedPrice = (e) => {
//     const value = e.target.value;
//     setSortOrder(value);

//     const sortedVehicles = [...vehicles].sort((a, b) => {
//       if (value === "Low to High") return a.pricePerDay - b.pricePerDay
//       if (value === "High to Low") return b.pricePerDay - a.pricePerDay
//       return 0;
//     })
//     setVehicles(sortedVehicles);
//   }

//   if (loading) return <Spinner/>

//   return (
//     <div className="px-6 md:px-10 mx-auto mb-16">
//       <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center text- black py-12">All Available <span className='text-gradient'>Vehicles ({vehicles.length})</span></h2>

//       <div className="flex justify-end mb-10 -mt-4">
//         <select className="select bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200 " value={sortOrder} onChange={handleSortedPrice}>
//           <option value="" disabled>Sort by price</option>
//           <option value="Low to High">Low to High</option>
//           <option value="High to Low">High to Low</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         { vehicles.map(vehicle => (
//           <VehiclesCard key={vehicle._id} vehicle={vehicle} />))
//         }
//       </div>
//     </div>
//   )}

// export default AllVehicles;




import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import VehiclesCard from "../Components/VehiclesCard";
import useAxios from "../Hooks/useAxios";
import Spinner from "./Spinner";
import { FaSearch, FaFilter } from "react-icons/fa";

const AllVehicles = () => {
  const axiosInstance = useAxios();

  // Local states
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [sort, setSort] = useState("date-desc");
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // fetch filters
  const { data: filterData, isLoading: filtersLoading } = useQuery({
    queryKey: ["vehicle-filters"],
    queryFn: async () => {
      const res = await axiosInstance.get("/vehicle-filters");
      return res.data;
    },
  });

  const categories = filterData?.categories || [];
  const locations = filterData?.locations || [];

  // fetch vehicles
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
      <h2 className="text-3xl md:text-4xl font-bold text-center py-12">
        All Available <span className="text-gradient">Vehicles ({total})</span>
      </h2>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {/* Search */}
          <div className="relative w-full sm:w-64 md:w-80">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-[1rem]" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search by name, location or category..."
            />
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:border-indigo-500"
          >
            <FaFilter /> Filters
          </button>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select border border-slate-300 rounded-lg px-3 py-2 text-sm bg-slate-50"
          >
            <option value="price-desc">Sort by Price: High to Low</option>
            <option value="price-asc">Sort by Price: Low to High</option>
            <option value="date-desc">Sort by Date: Newest First</option>
            <option value="date-asc">Sort by Date: Oldest First</option>
          </select>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="select inputField"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="select inputField"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Vehicles Grid */}
      <div className="w-[85vw]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[300px]">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <Spinner />
            </div>
          ) : vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <VehiclesCard key={vehicle._id} vehicle={vehicle} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
              <p className="text-lg font-medium">No vehicles found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="join gap-2">
          {page > 1 && (
            <button
              onClick={() => setPage(page - 1)}
              className="join-item btn btn-sm bg-indigo-100 text-gray-800 hover:bg-indigo-200"
            >
              Previous
            </button>
          )}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`join-item btn btn-sm ${
                page === i + 1
                  ? "btn-active bg-indigo-600 text-white"
                  : "bg-indigo-100 text-gray-800 hover:bg-indigo-200 shadow"
              }`}
            >
              {i + 1}
            </button>
          ))}
          {page < totalPages && (
            <button
              onClick={() => setPage(page + 1)}
              className="join-item btn btn-sm bg-indigo-100 text-gray-800 hover:bg-indigo-200"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllVehicles;

