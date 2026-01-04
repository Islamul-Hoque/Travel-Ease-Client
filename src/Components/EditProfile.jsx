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

    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">My <span className="text-gradient">Profile</span> </h1>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div className="grid md:grid-cols-5">

        <div className="md:col-span-2 bg-sky-50 dark:bg-gray-700 p-8 text-gray-800 dark:text-white flex flex-col gap-8">
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
