import React from "react";
import { FaCar } from "react-icons/fa";

import { LuCar, LuMousePointerClick, LuCalendarCheck, LuSmile } from "react-icons/lu";
import { FaCarSide } from "react-icons/fa";

import { IoCarSport } from "react-icons/io5";

const steps = [
  {
    id: 1,
    title: "Browse Vehicles",
    description: "Discover a curated collection of cars across every category, tailored to your journey.",
    icon: <IoCarSport className="text-[20px] text-primary" />,
    side: "start",
  },

{
  id: 2,
  title: "Choose Your Ride",
  description: "Select the perfect vehicle that matches your style, comfort, and travel needs.",
  icon: <LuMousePointerClick className="text-[20px] text-primary" />,
  side: "end",
},

  {
    id: 3,
    title: "Confirm Booking",
    description: "Secure your reservation instantly through the dashboard with transparent pricing.",
    icon: <LuCalendarCheck className="text-[20px] text-primary" />,
    side: "start",
  },
  {
    id: 4,
    title: "Enjoy the Journey",
    description: "Hit the road with confidence and enjoy a seamless travel experience from start to finish.",
    icon: <LuSmile className="text-[20px] text-primary" />,
    side: "end",
  },
];

const HowItWorks = () => {
  return (
    <section className="px-6 md:px-10 my-16">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
        How <span className="text-gradient">It Works</span>
      </h2>

   <ul className="timeline timeline-vertical">
  {steps.map((step, index) => (
    <li key={step.id}>
      {index !== 0 && <hr className="bg-primary" />}
      {step.side === "start" && (
        <div className="timeline-start timeline-box">
          <div className="flex items-center gap-2 mb-2">
            {step.icon}
            <h3 className="font-semibold">{step.title}</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
        </div>
      )}
      <div className="timeline-middle">
        {/* check icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-primary h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {step.side === "end" && (
        <div className="timeline-end timeline-box">
          <div className="flex items-center gap-2 mb-2">
            {step.icon}
            <h3 className="font-semibold">{step.title}</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
        </div>
      )}
    </li>
  ))}
</ul>



    </section>
  );
};

export default HowItWorks;
