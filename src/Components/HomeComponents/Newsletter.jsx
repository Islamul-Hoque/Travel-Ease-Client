import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email!");
      return;
    }
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <div className=" py-16 px-6 md:px-10">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md py-12 px-6">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Stay Updated with <span className="text-gradient">New Rides</span></h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Subscribe to get the latest offers and travel updates directly in your inbox.</p>
        <form onSubmit={handleSubscribe} className="flex justify-center">
          <div className="join w-full md:w-2/3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
              className="input join-item w-full bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" />

            <button type="submit" className="btn join-item bg-primary text-white hover:bg-primary-dark rounded-r-full">Subscribe</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;