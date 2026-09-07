"use client";

import React from "react";
import { motion } from "framer-motion";
import { InstagramCard } from "./instagram/InstagramCard";

const instagramPosts = [
  {
    id: 1,
    image: "/images/thumbnails/post-1.webp",
    alt: "Pohewala reel thumbnail",
    href: "https://www.instagram.com/reel/DctBWnxsyOH/",
  },
  {
    id: 2,
    image: "/images/thumbnails/post-2.webp",
    alt: "Pohewala reel thumbnail",
    href: "https://www.instagram.com/reel/Dca09SQJtEh/",
  },
  {
    id: 3,
    image: "/images/thumbnails/post-3.webp",
    alt: "Pohewala reel thumbnail",
    href: "https://www.instagram.com/reel/DcirnsqpQYL/",
  },
  {
    id: 4,
    image: "/images/thumbnails/post-4.webp",
    alt: "Pohewala reel thumbnail",
    href: "https://www.instagram.com/reel/Db5TO_3p71t/",
  },
];

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
  return (
    <section className="relative w-full bg-[#FCEE57] py-[60px] sm:py-[90px] overflow-hidden">

      <div className="relative mx-auto max-w-7xl px-6">
        <a
          href="https://www.instagram.com/pohewalaindia_/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 mb-4 w-fit mx-auto"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/60">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span className="text-black/60 text-[13px] font-semibold uppercase tracking-[.2em] hover:text-black transition">
            @pohewalaindia_
          </span>
        </a>
        <h1
          className="font-serif font-bold text-[28px] sm:text-[36px] md:text-[44px] lg:text-[56px] text-black text-center mb-8 sm:mb-10 lg:mb-[60px] tracking-tight"
        >
          Visit Our Instagram
        </h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
        >
          {instagramPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <InstagramCard image={post.image} alt={post.alt} href={post.href} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
