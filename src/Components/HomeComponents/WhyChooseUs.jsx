// "use client";
// import React from "react";

// const reasons = [
//   {
//     id: 1,
//     title: "Easy Booking",
//     description: "Book your vehicle in just a few clicks with our simple process.",
//     icon: "🖱️",
//   },
//   {
//     id: 2,
//     title: "Affordable Pricing",
//     description: "Transparent per‑day rates with no hidden charges.",
//     icon: "💰",
//   },
//   {
//     id: 3,
//     title: "Wide Selection",
//     description: "Choose from SUVs, Sedans, Hatchbacks to match your trip needs.",
//     icon: "🚗",
//   },
//   {
//     id: 4,
//     title: "Quick Pickup & Return",
//     description: "Smooth pickup and return process for hassle‑free trips.",
//     icon: "⚡",
//   },
//   {
//     id: 5,
//     title: "Customer Satisfaction",
//     description: "Trusted by riders across Bangladesh for reliable service.",
//     icon: "😊",
//   },
// ];

// const WhyChooseUs = () => {
//   return (
//     <section className="px-6 md:px-10 my-16">
//       <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
//         Why <span className="text-gradient">Choose Us</span>
//       </h2>

//       <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
//         {reasons.map((reason) => (
//           <div
//             key={reason.id}
//             className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-transform duration-300 hover:scale-[1.03]"
//           >
//             <div className="text-4xl mb-4">{reason.icon}</div>
//             <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
//             <p className="text-gray-600 dark:text-gray-400">{reason.description}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;

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
    <section className="px-6 md:px-10 my-16">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
        Why <span className="text-gradient">Choose Us</span>
      </h2>

      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Image */}
        <div className="aspect-16/11 overflow-hidden rounded-xl shadow-lg">
          <img
            // src="https://i.ibb.co.com/yc25hth7/salesman-customer-standing-front-different-cars-male-character-making-deal-selling-vehicle-flat-vect.jpg"
            src="https://i.ibb.co.com/WNkq181v/Rental-Car-4.jpg"
            alt="Luxury car"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right: USP cards */}
        <div className="space-y-6">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"
            >
              {/* Icon + Heading same line */}
              <div className="flex items-center gap-3 mb-2">
                {reason.icon}
                <h3 className="font-semibold text-lg">{reason.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
