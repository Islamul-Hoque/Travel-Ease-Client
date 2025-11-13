import React from 'react';

const TopCategories = () => {
const topCategories = [
    {
        id: 0,
        name: "SUV",
        description:"Perfect for family adventures, long drives, and off-road experiences. SUVs offer spacious comfort, powerful performance, and reliability on every terrain.",
        imageUrl: "https://i.ibb.co.com/QvCNY0Km/SUV.jpg"
    },
    {
        id: 1,
        name: "Electric",
        description: "Go green with advanced electric vehicles that deliver zero emissions, smart technology, and a smooth, silent driving experience for the modern traveler.",
        imageUrl: "https://i.ibb.co.com/qY4V2JhW/HEADER-Nissan-LEAF-Australia-Oct-2018-jpg-ximg-l-8-m-smart.jpg"
    },
    {
        id: 2,
        name: "Van",
        description: "Ideal for groups, business trips, or large families — vans provide extra space, flexibility, and comfort for long-distance or multi-person travel.",
        imageUrl: "https://i.ibb.co.com/WWjrs82t/toyota-hiace-front-angle-low-view-454261.jpg"
    },
    {
        id: 3,
        name: "Sedan",
        description: "A perfect choice for urban driving — sedans combine elegance, comfort, and efficiency, making them ideal for daily commutes or weekend escapes.",
        imageUrl: "https://i.ibb.co.com/hRG6xQKR/mercedes-benz-c-class-sedan-side-medium-view-828425.jpg"
    }
]

    return (
        <div className="px-6 md:px-10">
            <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center my-12">Popular Vehicle <span className='text-gradient'>Categories</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
            { 
                topCategories.map( category => (
                <div key={category.id} className="card rounded-xl overflow-hidden shadow hover:shadow-lg dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] transition duration-300 transform hover:scale-[1.02] group bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="h-[15.2rem] md:h-[13.2rem] overflow-hidden"> <img src={category.imageUrl} className="w-full h-full object-cover transition duration-500 hover:scale-105" alt={category.name} /> </div>
                    <div className="p-6 text-center">
                        <h3 className="text-[1.3rem] font-bold text-center mb-3 text-gray-800 dark:text-gray-100">{category.name}</h3>
                        <p className="text-[0.9rem] text-gray-600 dark:text-gray-400">{category.description}</p>
                    </div>
                </div>))
            }
            </div>
        </div>
)}

export default TopCategories;