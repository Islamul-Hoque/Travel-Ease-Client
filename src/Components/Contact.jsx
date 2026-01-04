import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const contactInfo = [
  {
    id: 1,
    icon: <FaEnvelope />,
    title: "Email",
    detail: "travelease@gmail.com",
  },
  {
    id: 2,
    icon: <FaPhoneAlt />,
    title: "Phone",
    detail: "+880 1234 567890",
  },
  {
    id: 3,
    icon: <FaMapMarkerAlt />,
    title: "Location",
    detail: "Chattogram, Bangladesh",
  },
];

const Contact = () => {
  const { user } = useAuth();

  const handleSubmit = (e) => { 
    e.preventDefault();
    toast.success("Message sent successfully!"); };

  return (
    <div className="py-20 px-6 md:px-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">  Contact <span className="text-gradient">Us</span> </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4 mb-12"> Have questions or need support? Reach out to us — we’re here to help you with bookings, vehicle listings, or any inquiries.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.15 }}
            className="space-y-6"
          >
            {contactInfo.map((info) => (
              <motion.div key={info.id} variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-6 rounded-xl shadow hover:shadow-lg dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] transition bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="flex items-center gap-2 text-xl font-semibold mb-2 text-[#632ee3]"> {info.icon} {info.title}  </h3>
                <p className="text-gray-600 dark:text-gray-300">{info.detail}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">   Send us a message  </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" defaultValue={  user?.displayName || user?.providerData?.[0]?.displayName }  placeholder="Your Name"
                className="w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"  />
              <input  required type="email"  defaultValue={user?.email || user?.providerData?.[0]?.email} placeholder="Your Email"
                className="w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"  />
              <textarea rows="4" placeholder="Your Message" required
                className="w-full focus:outline-none focus:ring-2 focus:ring-indigo-500  p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" >
              </textarea>
              <button type="submit" className="w-full btn-primary mt-4">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Contact;