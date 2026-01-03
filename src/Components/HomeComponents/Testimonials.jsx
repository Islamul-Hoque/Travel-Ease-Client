import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

const testimonials = [
  {
    name: "Ayesha Rahman",
    location: "Dhaka, Bangladesh",
    review: "Booking was super easy and the car was in perfect condition. Highly recommend!",
    image: "https://i.ibb.co.com/s9N0JRx9/img231.jpg",
  },
  {
    name: "Tanvir Ahmed",
    location: "Chattogram, Bangladesh",
    review: "Great service, smooth pickup and return process. Will definitely use again.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Nusrat Jahan",
    location: "Sylhet, Bangladesh",
    review: "Affordable pricing and verified vehicles gave me peace of mind during my trip.",
    image: "https://i.ibb.co.com/sd9pLH2b/female-1.jpg",
  },
  {
    name: "Sayedul Hoque",
    location: "Rajshahi, Bangladesh",
    review: "The booking process was smooth and the support team was very responsive.",
    image: "https://i.ibb.co.com/0yFv71Xh/puzzled-displeased-man-with-stubble-grows-house-plants-needs-wipe-dust-sansevieria-273609-27490.jpg",
  },
  {
    name: "Jannatun Nayeem",
    location: "Feni, Bangladesh",
    review: "Loved the variety of vehicles available. Found exactly what I needed for my trip.",
    image: "https://i.ibb.co.com/39rvpx0y/female-2.jpg",
  },
  {
    name: "Nokibul Islam",
    location: "London, UK",
    review: "Quick delivery and the car was spotless. Excellent experience overall!",
    image: "https://i.ibb.co.com/8nkHLw1R/360-F-611894278-6s-Iq-Ai9-Akdrw9a-Nul-K77-WHPJJHJFWTV0.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="mb-16 text-gray-800  px-6 md:px-10">
      <div className="mx-auto text-center my-14">
       <h2 className="text-2xl md:text-4xl font-bold text-center mb-8"> What Our <span className="text-gradient">Customers Say</span></h2>
      </div>

      <Swiper loop={true} effect={"coverflow"} grabCursor={true} centeredSlides={true} slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          scale: 0.9,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper "
        breakpoints={{
          320: { slidesPerView: 1, coverflowEffect: { depth: 50, modifier: 1.5 } },
          640: { slidesPerView: 1, coverflowEffect: { depth: 70, modifier: 1.8 } },
          768: { slidesPerView: 2, coverflowEffect: { depth: 80, modifier: 1.5 } },
          1024: { slidesPerView: 3, coverflowEffect: { depth: 100, modifier: 2 } },
        }}
      >
   
{testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <SwiperSlide key={i}>
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center text-center h-full">
    <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full mb-4 object-cover" />
    <h3 className="font-semibold text-lg">{t.name}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">{t.location}</p>
    <p className="mt-3 text-gray-700 dark:text-gray-300">{t.review}</p>
  </div>
</SwiperSlide>

          </SwiperSlide>
        ))}

      </Swiper>
    </section>
  );
}

export default Testimonials;