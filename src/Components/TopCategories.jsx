import React from 'react';

const TopCategories = () => {
const topCategories = [
    {
        id: 0,
        name: "SUV",
        description: "Ideal for family travel and rough roads.",
        imageUrl: "https://i.ibb.co.com/QvCNY0Km/SUV.jpg"
    },
    {
        id: 1,
        name: "Electric",
        description: "Eco-friendly and modern travel system.",
        imageUrl: "https://i.ibb.co.com/qY4V2JhW/HEADER-Nissan-LEAF-Australia-Oct-2018-jpg-ximg-l-8-m-smart.jpg"
    },
    {
        id: 2,
        name: "Van",
        description: "Convenient for groups or large families.",
        imageUrl: "https://imgcdn.oto.com/large/gallery/exterior/38/801/toyota-hiace-front-angle-low-view-454261.jpg"
    },
    {
        id: 3,
        name: "Sedan",
        description: "Comfortable for daily use within the city.",
        imageUrl: "https://i.ibb.co.com/hRG6xQKR/mercedes-benz-c-class-sedan-side-medium-view-828425.jpg"
    }
]

    return (
        <div className="px-6 md:px-10">
            <h2 className="text-[2rem] md:text-[2.8rem] font-bold text-center my-12">Popular Vehicle <span className='text-gradient'>Categories</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
            { 
                topCategories.map( category => (
                <div key={category.id} className="rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition duration-300 transform hover:scale-[1.02]">
                    <div className="h-48"> <img src={category.imageUrl} className="w-full h-full object-cover" alt={category.name} /> </div>
                    <div className="p-6 text-center">
                        <h3 className="text-[1.3rem] font-bold text-center mb-3">{category.name}</h3>
                        <p className="text-[0.9rem]">{category.description}</p>
                    </div>
                </div>))
            }
            </div>
        </div>
)}

export default TopCategories;