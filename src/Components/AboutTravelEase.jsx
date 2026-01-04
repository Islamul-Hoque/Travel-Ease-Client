import React from "react";

const AboutTravelEase = () => {
    const infoCards = [
    {
        id: 0,
        title: "Easy Booking",
        description: "Find and book vehicles instantly through a smooth and intuitive interface — no hassle, no hidden fees.",
    },
    {
        id: 1,
        title: "Trusted Owners",
        description: "Every owner and vehicle is verified to ensure safe and reliable trips for all our users.",
    },
    {
        id: 2,
        title: "Flexible Choices",
        description: "From compact sedans to rugged SUVs and eco-friendly electrics — TravelEase offers the perfect match for every journey.",
    },
]

    return (
        <div className="px-6 md:px-10 pb-16">
            <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center">About <span className='text-gradient'>TravelEase</span></h2>
            <p className="w-[85%] mx-auto text-center text-gray-600 dark:text-gray-400 text-[1rem] md:text-[1.1rem] leading-relaxed mt-4 mb-10"> TravelEase is a modern vehicle rental platform built to make travel simple, flexible, and affordable. Whether you’re exploring new cities, heading out for a weekend getaway, or need a reliable ride for everyday tasks — TravelEase connects you with verified vehicles and trusted owners in just a few clicks. </p>
            {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {infoCards.map((card) => (
                <div key={card.id} className="rounded-xl text-center p-6 shadow-md transform transition duration-300 hover:shadow-xl hover:-translate-y-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300">
                    <h3 className="text-[1.3rem] font-bold text-center mb-3">{card.title} </h3>
                    <p className="text-[0.9rem] leading-relaxed text-gray-600 dark:text-gray-400"> {card.description} </p>
                </div>))
                }
            </div> */}
        </div>
)}

export default AboutTravelEase;