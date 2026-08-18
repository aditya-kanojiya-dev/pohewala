"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const fromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const fromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export const LeadersSection: React.FC = () => {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="w-full"
    >
      <div className="flex flex-col md:flex-row items-stretch shadow-2xl overflow-visible">
        <motion.div
          variants={fromLeft}
          className="bg-[#FCEE57] text-black font-black select-none flex items-center justify-center md:w-25 md:self-center md:h-[500px] py-5 md:py-0 md:rounded-r-[40px]"
        >
          <span className="font-serif md:rotate-180 md:[writing-mode:vertical-rl] text-2xl tracking-[0.5em]">
            LEADERS
          </span>
        </motion.div>
        <motion.div
  variants={fadeUp}
  className="relative w-full min-h-[300px] md:w-[37%] md:h-[520px] md:self-center md:z-10 " 
  // Changed: min-h-[260px] → min-h-[320px], h-[440px] → h-[520px]
>
  <Image
    src="/images/founder.png"
    alt="Pohewala Founders"
    fill
    loading="eager"
    fetchPriority="high"
    className="object-cover rounded-3xl"
    sizes="(max-width: 760px) 100vw, 40vw"
    onError={(e) => {
      console.error('Image failed to load:', e);
    }}
  />
</motion.div>
        <motion.div
          variants={fromRight}
          className="bg-[#FCEE57] flex-1 md:self-center md:h-[500px] md:-ml-46 md:rounded-l-[40px] text-black p-8 sm:p-10 space-y-4 md:pl-56 md:pr-36 flex flex-col justify-center"
        >
          <p className="leading-relaxed font-medium text-sm sm:text-base">
            In a city like Nagpur, where mornings start with the aroma of tarri poha, two young minds decided to turn this everyday dish into something extraordinary.
          </p>
          <p className="leading-relaxed font-medium text-sm sm:text-base">
            Back in 2018, with limited resources but limitless passion, the founders of Pohewala set out on a mission — to make Poha more accessible, more consistent, and more loved than ever before.
          </p>
          <p className="leading-relaxed font-medium text-sm sm:text-base">
            What started as a small initiative soon turned into something bigger, From late-night deliveries to thousands of plates served, Pohewala quickly became a part of people&apos;s daily lives.
          </p>
          <p className="leading-relaxed font-medium text-sm sm:text-base">
            Because this wasn&apos;t just about food.
          </p>
          <p className="tagline leading-relaxed text-base">
            It was about comfort, culture, and connection.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
