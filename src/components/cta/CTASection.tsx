"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { Phone } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export const CTASection: React.FC = () => {
  return (
    <section className="relative w-full bg-pohe-gradient py-16 md:py-24 lg:py-[200px]">
      <style>{`
        @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(255,255,255,.4)} 70%{box-shadow:0 0 0 12px rgba(255,255,255,0)} 100%{box-shadow:0 0 0 0 rgba(255,255,255,0)} }
        .call-btn { animation: pulse-ring 2.5s ease-in-out infinite; }
      `}</style>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto max-w-7xl px-4 sm:px-6 relative"
      >
        <div className="relative bg-[#FFF25A] w-full rounded-3xl md:rounded-[48px] shadow-[0_20px_60px_rgba(0,0,0,.15)] hover:shadow-[0_25px_70px_rgba(0,0,0,.2)] transition-shadow duration-500 flex flex-col lg:flex-row items-center lg:h-[320px] lg:pl-[380px] px-6 lg:px-0 py-8 md:py-10 lg:py-0">
          <motion.div
            variants={itemVariants}
            className="relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 flex justify-center w-full lg:w-auto -mt-4 md:-mt-6 lg:mt-0"
          >
            <div className="relative w-[180px] sm:w-[220px] md:w-[280px] lg:w-[430px] h-[260px] sm:h-[320px] md:h-[400px] lg:h-[540px] group-hover:-translate-y-2 transition-transform duration-500 ease-out">
              <Image
                src="/images/phone.png"
                alt="Pohewala mobile app interface"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 280px, 430px"
              />
            </div>
          </motion.div>

          <div className="flex flex-col items-center lg:items-start justify-center w-full lg:w-auto mt-3 md:mt-4 lg:mt-0 lg:py-8">
            <motion.div variants={itemVariants}>
              <div
                className={`${playfair.className} font-bold text-[18px] sm:text-[20px] lg:text-[22px] text-black bg-white rounded-full px-6 sm:px-8 py-2.5 sm:py-3 mb-4 sm:mb-5 lg:mb-8 shadow-[0_4px_12px_rgba(0,0,0,.06)]`}
              >
                Enquire Now
              </div>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className={`${playfair.className} font-bold text-[26px] sm:text-[30px] md:text-[34px] lg:text-[36px] xl:text-[40px] text-[#111111] leading-[1.15] max-w-[600px] text-center lg:text-left`}
            >
              Serve India&apos;s Favorite Breakfast,
              Own Your Success!
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="font-sans font-normal text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-[#2D2D2D] leading-[1.6] md:leading-[1.7] max-w-[560px] lg:max-w-[660px] mt-3 sm:mt-4 lg:mt-5 text-center lg:text-left"
            >
              Join India&apos;s fastest-growing breakfast brand and turn every
              morning into a profitable business with our low-investment,
              high-demand outlet model.
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            className="absolute top-[-20px] sm:top-[-24px] md:top-[-28px] lg:top-[-50px] right-3 sm:right-4"
          >
            <button
              className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,.12)] flex items-center justify-center hover:scale-105 hover:rotate-[8deg] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 transition-all duration-300 cursor-pointer call-btn"
              aria-label="Call to enquire about franchise"
            >
              <Phone
                strokeWidth={2}
                className="text-black w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px] lg:w-[52px] lg:h-[52px]"
              />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
