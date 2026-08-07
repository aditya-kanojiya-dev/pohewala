"use client";

import React from "react";
import { motion } from "framer-motion";
import { BlogCard } from "./blogs/BlogCard";

const blogPost = {
  title:
    "Nothing Beats The Magic Of\nWatching The Monsoon Rain\nA Plate Of Piping Hot,\nCrispy Bhajiya.",
  author: "John Wilson",
  avatar: "/images/Blogs/blog-avatar1.png",
  image: "/images/Blogs/blog-poster.png",
  date: "10 July 2026",
  views: 100,
  comments: 50,
};

const blogPosts = [false, true, false].map((reverseLayout) => ({
  ...blogPost,
  reverseLayout,
}));

export const BlogsSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#FCEE57] py-[90px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <span className="inline-block w-12 h-1 bg-black/20 rounded-full mb-6" />
          <h1 className="font-serif font-bold text-[32px] sm:text-[40px] lg:text-[56px] text-black text-center tracking-tight">
            Blogs
          </h1>
          <p className="mx-auto max-w-[850px] text-center text-[15px] sm:text-[17px] lg:text-[22px] font-semibold leading-[1.5] text-black/80 mt-5">
            We are here to deliver quality you can trust. At Pohewala, our journey continues with one simple goal—to serve happiness in every bite.
          </p>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="flex justify-center mt-[70px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
            {blogPosts.map((post, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
