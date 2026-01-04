import React from "react";
import { motion } from "framer-motion";

const features = [
    {
        imgUrl: "https://i.ibb.co.com/ksmtCnyT/1767474097391.png",
        title: "Well-Maintained Fleet",
        desc: "Our vehicles are regularly checked to ensure smooth and safe rides.",
    },
    {
        imgUrl: "https://i.ibb.co.com/JwnpfZjT/12988517.png",
        title: "Comfortable Interiors",
        desc: "Enjoy spacious seating and clean interiors designed for your comfort.",
    },
    {
        imgUrl: "https://i.ibb.co.com/dJkDvCqR/9835801.png",
        title: "Fast Booking",
        desc: "Book your ride instantly with our easy-to-use platform.",
    },
    {
        imgUrl: "https://i.ibb.co.com/VFzLCc5/4961759.png",
        title: "24/7 Support",
        desc: "Our support team is available anytime to assist you.",
    },
];
const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

const SafetyComfort = () => {
    return (
        <div className="py-12 px-6 md:px-10">
            <div className="text-center mb-12">
                <h2 className="text-[1.4rem] md:text-[2.4rem] font-bold">Safety & <span className="text-gradient">Comfort Features</span></h2>
                <p className="text-gray-600 dark:text-gray-300 mt-4">We prioritize your comfort and convenience in every ride.</p>
            </div>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.4 }} transition={{ staggerChildren: 0.15 }}>
                {features.map((item, idx) => (
                    <motion.div key={idx} variants={cardVariants} className="group flex flex-col items-center text-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-md transform transition-all duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer">
                        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 group-hover:scale-110"><img src={item.imgUrl} alt={item.title} className="w-12 h-12 object-contain" /></div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{item.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default SafetyComfort;