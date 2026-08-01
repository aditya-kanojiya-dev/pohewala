"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const AboutSection: React.FC = () => {
  return (
    <section
      className="w-full min-h-[620px] flex items-center pt-36 lg:pt-46 pb-24 lg:pb-20 bg-pohe-gradient"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 px-6 sm:px-10 lg:pl-[90px]">
          {/* Left — Food Spread Image */}
          <motion.div
            className="w-full lg:w-[45%] flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div
              className="relative w-full max-w-[560px]"
              style={{
                animation: "float-about 6s ease-in-out infinite",
                filter: "drop-shadow(0 25px 40px rgba(0,0,0,.22))",
                aspectRatio: "1/1",
              }}
            >
              <Image
                src="/images/spread.png"
                alt="Poha Feast Spread"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 560px"
              />
            </div>
          </motion.div>

          {/* Right — About Content */}
          <motion.div
            className="w-full lg:w-[55%] lg:pl-[clamp(40px, 10vw, 120px)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif">
              <span className="text-[28px] sm:text-[34px] md:text-[44px] lg:text-[56px] font-semibold leading-tight block text-white">
                Welcome To
              </span>
              <span className="text-[36px] sm:text-[44px] md:text-[60px] lg:text-[76px] font-bold leading-[1.1] block mt-1 tracking-tight">
                <span style={{ color: "#FCEE57" }}>POHE</span>
                <span className="text-white">WALA</span>
              </span>
            </h2>

            <div className="mt-7 space-y-7">
              <p
                className="font-sans font-normal text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.7] max-w-[520px] text-left"
                style={{ color: "rgba(255,255,255,.92)" }}
              >
                At Pohewala, we believe that every bowl of poha tells a story
                of tradition, taste, and togetherness. Our journey began with a
                simple mission — to bring the authentic flavours of Maharashtra
                to every corner of India, one wholesome bowl at a time.
              </p>
              <p
                className="font-sans font-normal text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.7] max-w-[520px] text-left"
                style={{ color: "rgba(255,255,255,.92)" }}
              >
                Made with premium ingredients and a secret blend of traditional
                spices, our poha is crafted to deliver a burst of flavour in
                every bite. Whether it&apos;s a quick breakfast or a hearty
                meal, Pohewala promises a taste that feels like home.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
