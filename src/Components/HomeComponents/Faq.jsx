import React from "react";
import { motion } from "framer-motion";

const Faq = () => {
const faqs = [
  {
    id: 1,
    question: "How do I book a vehicle?",
    answer: "Simply browse our listings, choose your preferred vehicle, and confirm your booking online."
  },
  {
    id: 2,
    question: "Can I cancel my booking?",
    answer: "Yes, cancellations are allowed up to 24 hours before pickup without extra charges."
  },
  {
    id: 3,
    question: "Are the vehicles insured?",
    answer: "All listed vehicles are verified and come with basic insurance coverage."
  },
  {
    id: 4,
    question: "Do you offer long‑term rentals?",
    answer: "Yes, we provide flexible rental options including weekly and monthly plans."
  }
];

    return (
        <div className="px-6 md:px-10 ">
          <div className="">
            <div className="text-center mb-12">
                <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                 className="text-3xl md:text-4xl font-bold ">Frequently <span className="text-gradient"> Asked Questions</span></motion.h2>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} 
                className="mt-3  text-lg md:text-xl  mx-auto">Get detailed guidance on GreenNest, plant care, and our Healthy Plant Guarantee.</motion.p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                <motion.div key={faq.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }}>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
                        <div className="collapse-title font-semibold text-[1.2rem]">{faq.question}</div>
                        <div className="collapse-content   text-lg leading-relaxed">{faq.answer}</div>
                    </div>
                </motion.div>
                ))}
            </div>
         </div>
        </div>
);
};

export default Faq;





