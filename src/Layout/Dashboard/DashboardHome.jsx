import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import Spinner from "../../Components/Spinner";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const email = user?.email || user?.providerData?.[0]?.email

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardOverview", email],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/dashboard-overview?email=${email}`
      );
      return res.data;
    },
    enabled: !!email,
  });

  if (isLoading) return <Spinner />;
  if (isError || !data)
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load dashboard overview
      </div>
    );

  const {
    vehiclesCount = 0,
    bookingsCount = 0,
    deletedCount = 0,
  } = data;

  return (
    <div className="px-6 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center py-6 text-gray-800 dark:text-gray-100">
        Dashboard <span className="text-gradient">Overview</span>
      </h2>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="card rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 text-center shadow hover:shadow-lg transition duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-gray-200">Vehicles Added</h3>
          <p className="text-3xl font-extrabold text-primary">{vehiclesCount}</p>
        </div>
        <div className="card rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 text-center shadow hover:shadow-lg transition duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-gray-200">Bookings Made</h3>
          <p className="text-3xl font-extrabold text-primary">{bookingsCount}</p>
        </div>
        <div className="card rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 text-center shadow hover:shadow-lg transition duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-gray-200">Vehicles Deleted</h3>
          <p className="text-3xl font-extrabold text-primary">{deletedCount}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="card rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow">
        <h3 className="font-bold mb-4 text-gray-700 dark:text-gray-200">Overview Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Vehicles Added", value: vehiclesCount },
              { name: "Bookings Made", value: bookingsCount },
              { name: "Vehicles Deleted", value: deletedCount },
            ]}
          >
            <XAxis dataKey="name" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937", 
                border: "none",
                color: "#fff",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="value" fill="#c8dff7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardHome;