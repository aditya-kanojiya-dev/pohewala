"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TestimonialCard } from "./testimonials/TestimonialCard";

const testimonials = [
  {
    id: 1,
    name: "Jenny Wilson",
    designation: "Food Blogger",
    image: "/images/Blogs/blog-avatar1.png",
    message:
      "\"Perfectly fluffy, steaming hot, and topped with the perfect crunch of sev and onions. It's the ultimate comfort food breakfast that gets the authentic flavors exactly right.\"",
  },
  {
    id: 2,
    name: "Robert Chen",
    designation: "Chef",
    image: "/images/Blogs/blog-avatar2.png",
    message:
      "\"Thick, creamy, and served icy cold with a wonderfully bold coffee kick. It's incredibly refreshing and a fantastic treat to beat the afternoon heat.\"",
  },
  {
    id: 3,
    name: "Sarah Patel",
    designation: "Regular Customer",
    image: "/images/Blogs/blog-avatar1.png",
    message:
      "\"The tarri poha is absolutely divine. The blend of spices and the aroma takes me straight back to the streets of Pune. Absolutely addictive!\"",
  },
  {
    id: 4,
    name: "Amit Sharma",
    designation: "Food Critic",
    image: "/images/Blogs/blog-avatar2.png",
    message:
      "\"I've had poha across the country, but nothing compares to this. The freshness, the texture, the balance of flavors—it's a masterpiece.\"",
  },
  {
    id: 5,
    name: "Priya Kapoor",
    designation: "Nutritionist",
    image: "/images/Blogs/blog-avatar1.png",
    message:
      "\"Finally a healthy breakfast option that doesn't compromise on taste. Light, nutritious, and bursting with authentic Maharashtrian flavors.\"",
  },
  {
    id: 6,
    name: "David Kim",
    designation: "Travel Blogger",
    image: "/images/Blogs/blog-avatar2.png",
    message:
      "\"Cold coffee here is a game changer. Rich, velvety, and perfectly sweet—just what you need to recharge after exploring the city all day.\"",
  },
  {
    id: 7,
    name: "Meera Joshi",
    designation: "Local Foodie",
    image: "/images/Blogs/blog-avatar1.png",
    message:
      "\"Been coming here every weekend for months. The consistency is incredible—every single plate tastes as good as the first one I ever had.\"",
  },
  {
    id: 8,
    name: "Rahul Verma",
    designation: "Office Worker",
    image: "/images/Blogs/blog-avatar2.png",
    message:
      "\"Quick, affordable, and delicious. My go-to breakfast before work. The sev puri topping is the cherry on top—crunches in every bite!\"",
  },
];

const STEP = 2;

export const TestimonialSection: React.FC = () => {
  const [index, setIndex] = useState(0);

  const next = () =>
    setIndex((i) => (i + STEP >= testimonials.length ? 0 : i + STEP));

  const prev = () =>
    setIndex((i) =>
      i - STEP < 0 ? Math.max(0, testimonials.length - STEP) : i - STEP
    );

  const visible = testimonials.slice(index, index + STEP);

  return (
    <section className="relative w-full bg-pohe-gradient border-t-[6px] border-[#FCEE57] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FCEE57]/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        <div className="absolute text-[#FCEE57]/8 top-12 left-[15%] hidden lg:block" style={{ animation: "float-star 4s ease-in-out infinite" }}>
          <Star size={24} fill="currentColor" />
        </div>
        <div className="absolute text-[#FCEE57]/6 bottom-20 right-[20%] hidden lg:block" style={{ animation: "float-star-delayed 5s ease-in-out infinite" }}>
          <Star size={18} fill="currentColor" />
        </div>
        <div className="absolute text-[#FCEE57]/5 top-1/3 right-[10%] hidden lg:block" style={{ animation: "float-star 6s ease-in-out infinite 1s" }}>
          <Star size={14} fill="currentColor" />
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-[40%] lg:sticky lg:top-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-2 mb-2"
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={16}
                  className="text-[#FCEE57] fill-[#FCEE57]"
                />
              ))}
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="inline-block text-[#FCEE57] font-bold text-[20px] border-b-2 border-[#FCEE57] pb-0.5"
            >
              Testimonial
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-serif font-bold text-white text-[28px] sm:text-[36px] md:text-[44px] lg:text-6xl leading-[1.15] mt-5 sm:mt-7 mb-8 sm:mb-12"
            >
              What They
              <br />
              Say About Us
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={20} className="text-black" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ArrowRight size={20} className="text-white" />
              </button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="text-[14px] text-white/40 mt-4"
            >
              {index / STEP + 1} / {Math.ceil(testimonials.length / STEP)}
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="w-full lg:w-[60%] relative"
          >
            <div className="absolute bg-[#FCEE57] rounded-[40px] w-[700px] h-[360px] -right-12 top-1/2 -translate-y-1/2 z-0 hidden lg:block" />
            <div className="relative z-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col lg:flex-row gap-10 items-center lg:items-start"
                >
                  {visible.map((t) => (
                    <TestimonialCard key={t.id} {...t} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
