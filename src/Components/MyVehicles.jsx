import React, { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router';
import { FaEye, FaEdit, FaTrash, FaDollarSign, FaChair, FaMapMarkerAlt, FaCar } from 'react-icons/fa'; // FaCar আইকন যোগ করা হলো
import { MdOutlineDateRange } from 'react-icons/md';
import Spinner from './Spinner';
import Swal from 'sweetalert2';

const MyVehicles = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            axiosSecure.get(`/my-vehicles?email=${user.email}`)
                .then(data => {
                    setVehicles(data.data);
                })
                .catch(err => {
                    console.error("Fetch My Vehicles Error:", err);
                    toast.error('Failed to fetch your vehicles.');
                })
                .finally(() => setLoading(false));
        }
    }, [user, axiosSecure]);

    const handleDelete = (id, name) => {
        toast.custom((t) => (
            <div className={`bg-white px-6 py-4 shadow-xl rounded-md ${t.visible ? 'animate-enter' : 'animate-leave'} flex items-center gap-4 border-l-4 border-red-500`}>
                <p className="text-gray-700">Are you sure you want to delete <span className="font-bold text-red-600">{name}</span>?</p>
                <div className='flex gap-2'>
                    <button onClick={() => { toast.dismiss(t.id); confirmDelete(id); }} className="btn btn-sm bg-red-600 text-white hover:bg-red-700 border-none">Delete</button>
                    <button onClick={() => toast.dismiss(t.id)} className="btn btn-sm bg-gray-200 text-gray-800 hover:bg-gray-300 border-none">Cancel</button>
                </div>
            </div>
        ), { duration: 5000 });
    };

    const handleDeleteVehicle = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        .then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/my-vehicles/${id}`)
                    .then(res => {
                        if(res.data.deletedCount){
                            Swal.fire({ title: "Deleted!", text: "Vehicle deleted successfully.", icon: "success" });
                            setVehicles(prev => prev.filter(vehicle => vehicle._id !== id));
                        } else {
                            Swal.fire({ title: "Failed!", text: "Vehicle not found or already deleted.", icon: "error" });
                        }
                    })
                    .catch(err => {
                        console.error("Delete Vehicle Error:", err);
                        Swal.fire({ title: "Error!", text: "Failed to delete vehicle.", icon: "error" });
                    })
            }
        });
    };

    const handleUpdate = (id) => {
        navigate(`/update-vehicle/${id}`);
    };

    const handleView = (id) => {
        navigate(`/vehicle-details/${id}`);
    };

    if (loading) {
        return (<div className="min-h-screen flex justify-center items-center bg-gray-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>);
    }

    if (vehicles.length === 0) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 bg-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">❌ No Vehicles Listed Yet</h2>
                <p className="text-lg text-gray-600 mb-6">It looks like you haven't added any vehicles for rent yet.</p>
                <Link to="/add-vehicle" className="btn btn-primary text-white font-semibold shadow-lg">Add Your First Vehicle Now!</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">My <span className='text-primary'>Listed Vehicles</span></h1>
            <p className="text-center text-gray-500 mb-10">Manage your vehicle listings, update details, or remove them from the platform.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vehicles.map(vehicle => {
                    const price = vehicle.pricePerDay?.$numberInt ? parseInt(vehicle.pricePerDay.$numberInt) : vehicle.pricePerDay;

                    return (
                        <div key={vehicle._id} className="card w-full bg-white shadow-xl transition-all duration-300 transform hover:shadow-2xl border border-gray-100 rounded-2xl overflow-hidden flex flex-col group">
                            
                            <figure className='relative h-56 w-full overflow-hidden'>
                                <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="badge badge-lg badge-accent absolute top-4 left-4 text-white text-sm font-semibold p-3 shadow-md">{vehicle.category}</div>
                            </figure>

                            <div className="card-body p-6 space-y-3 flex-grow">
                                <h2 className="card-title text-2xl font-bold text-gray-900">{vehicle.vehicleName}</h2>

                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-600 text-sm">
                                    <span className='flex items-center gap-1 font-bold text-primary'>
                                        <FaCar className="text-primary text-sm" />
                                        {vehicle.category}
                                    </span>
                                    <span className='flex items-center gap-1 font-medium'>
                                        <FaChair className="text-primary text-sm" /> 
                                        {vehicle.seatingCapacity} Seats
                                    </span>
                                    <span className='flex items-center gap-1 font-medium'>
                                        <FaMapMarkerAlt className="text-primary text-sm" /> 
                                        {vehicle.location?.split(',')[0]}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-1 font-medium text-gray-500 text-sm">
                                    <MdOutlineDateRange className='text-primary text-base' /> 
                                    Added: {new Date(vehicle.createdAt).toLocaleDateString()}
                                </div>

                                <p className="flex items-baseline font-extrabold text-3xl text-secondary pt-2">
                                    <FaDollarSign className='text-primary text-xl mr-1'/> 
                                    {price} 
                                    <span className='text-base text-gray-500 font-normal'>/ Day</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-3 p-6 pt-0 border-t border-gray-100 gap-2">
                                <button onClick={() => handleView(vehicle._id)} className="btn btn-sm btn-primary text-white flex items-center gap-1 w-full"> <FaEye /> Details </button>
                                <button onClick={() => handleUpdate(vehicle._id)} className="btn btn-sm btn-warning text-white flex items-center gap-1 w-full"> <FaEdit /> Update </button>
                                <button onClick={() => handleDeleteVehicle(vehicle._id, vehicle.vehicleName)} className="btn btn-sm btn-error text-white flex items-center gap-1 w-full"> <FaTrash /> Delete  </button>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyVehicles;