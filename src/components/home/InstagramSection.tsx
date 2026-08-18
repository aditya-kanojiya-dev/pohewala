"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InstagramCard } from "./instagram/InstagramCard";

const instagramPosts = [
  { id: 1, image: "/images/gallery1.jpg", alt: "Poha bowl on table" },
  { id: 2, image: "/images/gallery2.jpg", alt: "Poha preparation" },
  { id: 3, image: "/images/Blogs/blog.jpg", alt: "Pohewala outlet" },
  { id: 4, image: "/images/store1.jpg", alt: "Pohewala store front" },
  { id: 5, image: "/images/poha-bowl-small.png", alt: "Fresh poha bowl" },
  { id: 6, image: "/images/spread.png", alt: "Poha feast spread" },
  { id: 7, image: "/images/poha-card.png", alt: "Poha menu card" },
  { id: 8, image: "/images/ingredients.png", alt: "Poha ingredients" },
];

const PER_PAGE = 4;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export const InstagramSection: React.FC = () => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(instagramPosts.length / PER_PAGE);

  const visible = instagramPosts.slice(
    page * PER_PAGE,
    page * PER_PAGE + PER_PAGE
  );

  const next = () => setPage((p) => (p + 1 >= totalPages ? 0 : p + 1));
  const prev = () => setPage((p) => (p - 1 < 0 ? totalPages - 1 : p - 1));

  return (
    <section className="relative w-full bg-[#FCEE57] py-[60px] sm:py-[90px] overflow-hidden">

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/60">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span className="text-black/60 text-[13px] font-semibold uppercase tracking-[.2em]">
            @pohewala_india
          </span>
        </div>
        <h1
          className="font-serif font-bold text-[28px] sm:text-[36px] md:text-[44px] lg:text-[56px] text-black text-center mb-8 sm:mb-10 lg:mb-[60px] tracking-tight"
        >
          Visit Our Instagram
        </h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
          >
            {visible.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <InstagramCard image={post.image} alt={post.alt} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,.08)]"
            aria-label="Previous posts"
          >
            <ArrowLeft size={20} className="text-black" />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === page
                    ? "bg-black w-6"
                    : "bg-black/40 hover:bg-black/60"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,.15)]"
            aria-label="Next posts"
          >
            <ArrowRight size={20} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};
