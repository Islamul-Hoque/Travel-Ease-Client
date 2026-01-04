import React from "react";
import { FaMousePointer, FaMoneyBillWave, FaCar } from "react-icons/fa";

const reasons = [
  {
    id: 1,
    title: "Easy Booking",
    description: "Book your vehicle in just a few clicks with a smooth process.",
    icon: <FaMousePointer className="text-xl text-blue-600" />,
  },
  {
    id: 2,
    title: "Affordable Pricing",
    description: "Transparent per‑day rates with no hidden charges.",
    icon: <FaMoneyBillWave className="text-xl text-green-600" />,
  },
  {
    id: 3,
    title: "Wide Selection",
    description: "SUVs, Sedans, Hatchbacks — pick what suits your trip.",
    icon: <FaCar className="text-xl text-red-600" />,
  },
];

const WhyChooseUs = () => {
  return (
    <div className="px-6 md:px-10 my-16">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">Why <span className="text-gradient">Choose Us</span></h2>
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        <div className="aspect-16/11 overflow-hidden rounded-xl shadow-lg"><img src="https://i.ibb.co.com/RpRthN44/unnamed.jpg" alt="Luxury car" className="h-full w-full object-cover" /></div>
        <div className="space-y-6">
          {reasons.map((reason) => (
            <div key={reason.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">{reason.icon}<h3 className="font-semibold text-lg">{reason.title}</h3></div>
              <p className="text-gray-600 dark:text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
