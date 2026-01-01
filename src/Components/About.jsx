
import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const aboutCards = [
  {
    id: 1,
    title: "Our Mission",
    description:
      "Simplify vehicle booking and trip management by providing a secure, scalable, and user-friendly platform for travelers and owners.",
  },
  {
    id: 2,
    title: "Our Vision",
    description:
      "Redefine travel convenience with modern technology, clean design, and reliable service — making every journey effortless and trustworthy.",
  },
  {
    id: 3,
    title: "Our Values",
    description:
      "We operate with innovation, transparency, and a commitment to excellence — ensuring seamless experiences and long-term reliability.",
  },
];

const About = () => {
  return (
    <div className="py-20 px-6 md:px-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100">
            About <span className="text-gradient">TravelEase</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4 mb-12">
            Welcome to TravelEase! We are passionate about making vehicle booking
            and trip management seamless. Our platform blends modern UI, secure
            authentication, and scalable backend design to deliver a smooth
            journey for both travelers and vehicle owners.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {aboutCards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className="p-6 rounded-xl shadow hover:shadow-lg dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] transition bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
