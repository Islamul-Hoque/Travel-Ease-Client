import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ayesha Rahman",
    location: "Dhaka, Bangladesh",
    review: "Loved the variety of vehicles available. Found exactly what I needed for my trip.",
    image: "https://i.ibb.co.com/s9N0JRx9/img231.jpg",
  },
  {
    name: "Tanvir Ahmed",
    location: "Chattogram, Bangladesh",
    review: "Great service, smooth pickup and return process. Will definitely use again.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Nusrat Jahan",
    location: "Sylhet, Bangladesh",
    review: "Affordable pricing and verified vehicles gave me peace of mind during my trip.",
    image: "https://i.ibb.co.com/sd9pLH2b/female-1.jpg",
  },
  {
    name: "Sayedul Hoque",
    location: "Rajshahi, Bangladesh",
    review: "The booking process was smooth and the support team was very responsive.",
    image: "https://i.ibb.co.com/0yFv71Xh/puzzled-displeased-man-with-stubble-grows-house-plants-needs-wipe-dust-sansevieria-273609-27490.jpg",
  },

];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Testimonials = () => {
  return (
    <div className="max-w-7xl mx-auto mb-16 text-gray-800 px-6 md:px-10">
      <div className="mx-auto text-center my-14">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
          What Our <span className="text-gradient">Customers Say</span>
        </h2>
      </div>

      {/* Motion grid with staggered children */}
      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="group bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-16 h-16 rounded-full mb-4 object-cover transition-all duration-300 group-hover:scale-110"
            />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{t.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t.location}</p>
            <p className="mt-3 text-gray-700 dark:text-gray-300">{t.review}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonials;