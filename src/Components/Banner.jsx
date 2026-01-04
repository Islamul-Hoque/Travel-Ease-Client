import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    slogan: "Adventure Starts With a Click",
    subtitle: "Book the right vehicle for city rides or long trips in seconds.",
    image: "https://i.ibb.co.com/23C8mc8p/1129817.jpg",
  },
  {
    slogan: "Travel Made Simple",
    subtitle: "Choose verified vehicles and manage trips easily, hassle‑free.",
    image: "https://i.ibb.co.com/3YsVd2mD/audi-e-tron-100768331.jpg",
  },
  {
    slogan: "Turn Your Car Into Income",
    subtitle: "List your vehicle and earn from trusted renters effortlessly.",
    image: "https://i.ibb.co.com/35FCC8ww/black-mercedes-jpg.png",
  },
  {
    slogan: "Find Your Perfect Ride",
    subtitle: "From Sedans to SUVs to EVs, explore categories for every journey.",
    image: "https://i.ibb.co.com/rGLbSWWD/1243224.jpg",
  },
];


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        }
    }
    }

const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
        }
    }
    }

const Banner = () => {
    const [current, setCurrent] = useState(0);
    const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)}
    const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}

    useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
    }, [current]);

    const { slogan, subtitle, image } = slides[current];

    return (
        <div className="px-6 md:px-10">
            <div className="w-full h-[50vh] md:h-[65vh]  bg-cover bg-center relative flex items-center justify-center transition-all duration-1000 ease-in-out" style={{ backgroundImage: `url(${image})` }}>
        <div className="absolute inset-0 bg-black/50 z-0" />
            <button onClick={prevSlide} className="absolute left-4 z-20 text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition duration-300 hidden md:block" > <FaChevronLeft size={20} /> </button>
            <motion.div key={current} variants={containerVariants} initial="hidden" animate="visible" 
            className="relative z-10 text-center text-white px-4 w-[90%] mx-auto" >
                <motion.h2 variants={itemVariants} className="text-[1.7rem] md:text-[3.5rem] w-[95%] md:w-full drop-shadow-lg mx-auto font-bold md:font-bold mb-4 leading-tight" > {slogan} </motion.h2>

                <motion.p variants={itemVariants} className="text-[1.15rem] w-[90%] md:text-[1.48rem] mx-auto drop-shadow-lg mb-8 md:font-medium">
                    {subtitle}
                </motion.p>

                <motion.div variants={itemVariants}>
                    <Link to="/all-vehicles"> <button className="btn btn-primary">Explore Vehicles</button> </Link>
                </motion.div>
            </motion.div>
            <button onClick={nextSlide} className="absolute right-4 z-20 text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition duration-300 hidden md:block"  > <FaChevronRight size={20} /> </button>
        </div>
        </div>
)}

export default Banner;