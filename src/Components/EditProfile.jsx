// import React, { useMemo, useState } from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../Hooks/useAuth";
// import { Toaster, toast } from "react-hot-toast";

// const EditProfile = () => {
//   const { user, updateUser } = useAuth();

//   // Fallbacks for name & photo
//   const initial = useMemo(
//     () => ({
//       displayName: user?.displayName || user?.providerData?.[0]?.displayName || "",
//       photoURL: user?.photoURL || user?.providerData?.[0]?.photoURL || "",
//       phoneNumber: user?.phoneNumber || "",
//     }),
//     [user]
//   );

//   const { register, handleSubmit, watch, formState: { isSubmitting }, reset } = useForm({ defaultValues: initial });
//   const [previewError, setPreviewError] = useState("");

//   // Live preview values
//   const liveName = watch("displayName");
//   const livePhoto = watch("photoURL");

//   const onSubmit = async (data) => {
//     setPreviewError("");
//     try {
//       await updateUser({ displayName: data.displayName, photoURL: data.photoURL });
//       toast.success("Profile updated successfully");
//       reset(data);
//     } catch (err) {
//       toast.error("Failed to update profile");
//       console.error(err);
//     }
//   };

//   const handleImgError = () => setPreviewError("Image preview failed. Check the URL.");

//   return (
//     <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
//       <Toaster position="top-right" />
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">Edit <span className="text-gradient">Profile</span></h2>
//         <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">UID: {user?.uid}</span>
//       </div>

//       {/* Preview card */}
//       <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 mb-10">
//         <div className="flex items-center gap-5">
//           <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
//             {livePhoto ? <img src={livePhoto} alt={liveName || "Profile"} className="w-full h-full object-cover" onError={handleImgError} /> : <div className="w-full h-full grid place-items-center bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-xs">No photo</div>}
//           </div>
//           <div className="flex-1">
//             <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">{liveName || user?.providerData?.[0]?.displayName || "Your display name"}</p>
//             <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || user?.providerData?.[0]?.email} • Verified: {user?.emailVerified ? "Yes" : "No"}</p>
//             {previewError && <p className="mt-1 text-xs text-red-500">{previewError}</p>}
//           </div>
//         </div>
//       </div>

//       {/* Read-only info */}
//       <div className="grid md:grid-cols-2 gap-6 mb-10 text-sm">
//         <div className="rounded-lg p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"><p className="text-gray-500 dark:text-gray-400">Email</p><p className="font-medium text-gray-800 dark:text-gray-100">{user?.email}</p></div>
//         <div className="rounded-lg p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"><p className="text-gray-500 dark:text-gray-400">Last login</p><p className="font-medium text-gray-800 dark:text-gray-100">{user?.metadata?.lastSignInTime}</p></div>
//         <div className="rounded-lg p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"><p className="text-gray-500 dark:text-gray-400">Created at</p><p className="font-medium text-gray-800 dark:text-gray-100">{user?.metadata?.creationTime}</p></div>
//         <div className="rounded-lg p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"><p className="text-gray-500 dark:text-gray-400">Provider</p><p className="font-medium text-gray-800 dark:text-gray-100">{user?.providerData?.[0]?.providerId || "firebase"}</p></div>
//       </div>

//       {/* Editable form */}
//       <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 space-y-6">
//         <div><label className="block font-semibold mb-1 text-gray-800 dark:text-gray-100">Display name</label><input {...register("displayName", { maxLength: 50 })} className="input input-bordered w-full" placeholder="Your name" /><p className="mt-1 text-xs text-gray-500 dark:text-gray-400">This updates your public display name.</p></div>
//         <div><label className="block font-semibold mb-1 text-gray-800 dark:text-gray-100">Photo URL</label><input {...register("photoURL")} className="input input-bordered w-full" placeholder="Profile image URL" /><p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Paste a valid image URL to see instant preview above.</p></div>
//         <div><label className="block font-semibold mb-1 text-gray-800 dark:text-gray-100">Phone number (optional)</label><input {...register("phoneNumber")} className="input input-bordered w-full" placeholder="+8801XXXXXXXXX" /><p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Firebase updateProfile doesn’t store phone here. Use your backend if needed.</p></div>
//         <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"><button type="submit" className="btn btn-primary flex-1" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save changes"}</button><button type="button" onClick={() => reset(initial)} className="btn btn-outline flex-1" disabled={isSubmitting}>Reset</button></div>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;


import { GrUpdate } from "react-icons/gr";
import { Target, Award, Upload, Edit } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";
import { User, Mail, Camera, Save } from "lucide-react";

const Profile = () => {
  const { user, updateUser, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  // initialize form
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast.error("Display name is required!");
      return;
    }

    setLoading(true);

    try {
      await updateUser({ displayName, photoURL });
      setUser({ ...user, displayName, photoURL });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (

<div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
  <div className="max-w-4xl mx-auto">
    {/* Header */}
    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">My <span className="text-gradient">Profile</span> </h1>
    </div>

    {/* Card */}
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="grid md:grid-cols-5">

        {/* Left */}
        <div className="md:col-span-2 bg-sky-50 dark:bg-gray-700 p-8 text-gray-800 dark:text-white flex flex-col gap-8">
          {/* Profile */}
          <div className="flex flex-col items-center text-center">
            <div className="w-38 h-38 rounded-full overflow-hidden border-4 border-white/30 mb-3">
              {photoURL || user?.photoURL ? (
                <img src={photoURL || user?.photoURL} alt="Profile" className="w-full h-full object-cover" onError={(e) => (e.target.src = "https://i.ibb.co.com/XrwQtrwD/User.jpg")} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/10"><User size={64} /></div>
              )}
            </div>
            <h3 className="text-xl font-semibold">{displayName || "User"}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">{user?.email}</p>
          </div>

          {/* Stats */}
         <div className="space-y-3 w-full">
  <div className="bg-sky-100 dark:bg-white/10 backdrop-blur rounded-xl p-3 border border-gray-200 dark:border-white/20">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-sky-200 dark:bg-white/20 rounded-lg flex items-center justify-center"><Target size={20} /></div>
      <div>
        <p className="text-gray-700 dark:text-gray-300 text-xs">Member Since</p>
        <p className="font-semibold">
          {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—"}
        </p>
      </div>
    </div>
  </div>

  <div className="bg-sky-100 dark:bg-white/10 backdrop-blur rounded-xl p-3 border border-gray-200 dark:border-white/20">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-sky-200 dark:bg-white/20 rounded-lg flex items-center justify-center"><Award size={20} /></div>
      <div>
        <p className="text-gray-700 dark:text-gray-300 text-xs">Account Status</p>
        <p className="font-semibold">Active</p>
      </div>
    </div>
  </div>
</div>

        </div>

        {/* Right */}
        <div className="md:col-span-3 dark:bg-gray-900 p-8 md:p-10">
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="text-sm font-semibold flex items-center gap-2 mb-2 text-gray-700 dark:text-gray-200"><User size={16} /> Display Name</label>
              <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-gray-600 outline-none text-gray-800 dark:text-white" />
            </div>

            <div>
              <label className="text-sm font-semibold flex items-center gap-2 mb-2 text-gray-700 dark:text-gray-200"><Mail size={16} /> Email (read only)</label>
              <input type="email" value={user?.email || ""} readOnly className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed text-gray-800 dark:text-gray-300" />
            </div>

            <div>
              <label className="text-sm font-semibold flex items-center gap-2 mb-2 text-gray-700 dark:text-gray-200"><Camera size={16} /> Photo URL</label>
              <input type="url" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} placeholder="https://example.com/photo.jpg" className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-gray-600 outline-none text-gray-800 dark:text-white" />
            </div>

            <button type="submit" disabled={loading} className=" btn-primary-w-full"><GrUpdate size={18} />{loading ? "Updating..." : "Update Profile"}</button>
          </form>
        </div>

      </div>
    </div>
  </div>
</div>

  );
};

export default Profile;
