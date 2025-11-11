import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
    {
        slogan: "Your Next Adventure is Just a Click Away",
        subtitle:"Whether it's an inner-city commute or a long road trip, book the perfect vehicle for your needs today.",
        image: "https://images4.alphacoders.com/112/1129817.jpg",
    },
    {
        slogan: "Effortless Travel, Zero Hassle",
        subtitle: "Access verified vehicles from trusted owners and manage your entire trip with our easy-to-use tools.",
        image: "https://cimg3.ibsrv.net/ibimg/hgm/1920x1080-1/100/768/audi-e-tron_100768331.jpg",
    },
    {
        slogan: "Got a Vehicle? Start Earning Now",
        subtitle: "List your unused car on our platform and rent it out to reliable customers, growing your income effortlessly.",
        image: "https://renty.ae/uploads/car/photo/l/black_mercedes-s_2022_5255_main_efd3732b6f6d8eeb32efceb88c9617ae.jpg",
    },
    {
        slogan: "Explore a World of Categories",
        subtitle:"From compact Sedans to rugged SUVs and eco-friendly Electric options, find the exact ride for your journey.",
        image: "https://images7.alphacoders.com/124/1243224.jpg",
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
        <div className="w-full h-[60vh] md:h-[87vh] bg-cover bg-center relative flex items-center justify-center transition-all duration-1000 ease-in-out" style={{ backgroundImage: `url(${image})` }}>
        <div className="absolute inset-0 bg-black/40 z-0" />
            <button onClick={prevSlide} className="absolute left-4 z-20 text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition duration-300 hidden md:block" > <FaChevronLeft size={20} /> </button>
            <motion.div key={current} variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 text-center text-white px-4 w-[90%] mx-auto" >
                <motion.h2 variants={itemVariants} className="text-[2rem] md:text-[3.5rem] w-[95%] md:w-full drop-shadow-lg mx-auto font-bold md:font-extrabold mb-4 leading-tight" > {slogan} </motion.h2>

                <motion.p variants={itemVariants} className="text-[1.15rem] w-[90%] md:text-[1.48rem] mx-auto drop-shadow-lg mb-8 md:font-medium">
                    {subtitle}
                </motion.p>

                <motion.div variants={itemVariants}>
                    <Link to="/all-vehicles"> <button className="btn btn-primary">All Vehicles</button> </Link>
                </motion.div>
            </motion.div>
            <button onClick={nextSlide} className="absolute right-4 z-20 text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition duration-300 hidden md:block"  > <FaChevronRight size={20} /> </button>
        </div>
)}

export default Banner;