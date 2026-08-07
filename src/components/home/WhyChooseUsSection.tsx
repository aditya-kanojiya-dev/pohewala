"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const cards = [
  {
    icon: "/images/poha-bowl-small.png",
    title: "Authentic Poha",
    desc: "Experience the true taste of tradition with our poha—a light, flavorful start to your wonderful day ahead."
  },
  {
    icon: "/images/delivery-man.png",
    title: "Home Delivery",
    desc: "Enjoy authentic Pohewala flavors comfortably at home with quick, hygienic delivery via Swiggy and Zomato."
  },
  {
    icon: "/images/wallet.png",
    title: "Low Cost",
    desc: "Our core mission has always been delivering nutritious, high-quality, and wholesome food at highly affordable prices."
  },
  {
    icon: "/images/van.png",
    title: "Bulk Food Order",
    desc: "Fresh, hygienic, and affordable bulk meals for events, offices, and parties. Timely delivery with authentic taste."
  },
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section
      className="w-full overflow-hidden bg-pohe-gradient"
    >
      <style>{`
        @keyframes pulse-glow { 0%,100%{opacity:.08} 50%{opacity:.14} }
        @keyframes drift-slow { 0%,100%{transform:translate(0,0)} 50%{transform:translate(8px,-10px)} }
        @media (max-width: 640px) { .wcu-inner { padding-top: 60px !important; padding-bottom: 60px !important; } }
      `}</style>

      <div className="relative w-full h-[2px] bg-[#FCEE57] z-10" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute rounded-full bg-[#FCEE57]"
          style={{ width: "400px", height: "400px", left: "-120px", top: "10%", filter: "blur(80px)", opacity: ".06", animation: "pulse-glow 5s ease-in-out infinite, drift-slow 8s ease-in-out infinite" }} />
        <div className="absolute rounded-full bg-[#FCEE57]"
          style={{ width: "300px", height: "300px", right: "-80px", top: "50%", filter: "blur(70px)", opacity: ".05", animation: "pulse-glow 7s ease-in-out infinite, drift-slow 10s ease-in-out infinite 2s" }} />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 z-10 wcu-inner" style={{ paddingTop: "90px", paddingBottom: "100px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2
            className="font-serif font-bold text-[32px] sm:text-[40px] lg:text-[56px] leading-[1.1] text-white"
            style={{ textShadow: "0 15.7px 16px rgba(252,238,87,.01), 0 30px 92px rgba(252,238,87,.28)" }}
          >
            Why Choose Us
          </h2>
          <p
            className="font-serif font-bold text-[16px] sm:text-[18px] lg:text-[24px] text-[#FCEE57] mx-auto mt-4 sm:mt-6"
            style={{ maxWidth: "900px", textShadow: "0 15.7px 16px rgba(252,238,87,.01), 0 30px 92px rgba(252,238,87,.28)" }}
          >
            We are here to deliver quality you can trust.
            <br />
            At Pohewala, our journey continues with one simple goal—
            to serve happiness in every bite.
          </p>
          <div className="flex items-center justify-center gap-2 mt-8">
            <span className="block w-16 h-[2px] bg-[#FCEE57]/40 rounded-full" />
            <span className="block w-2 h-2 bg-[#FCEE57] rounded-full" />
            <span className="block w-16 h-[2px] bg-[#FCEE57]/40 rounded-full" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mt-14"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {cards.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
                className="group cursor-pointer w-full max-w-[280px]"
              >
                <div className="relative w-full" style={{ minHeight: "340px" }}>
                  {/* Circular image */}
                  <div className="relative z-10 flex justify-center" style={{ marginBottom: "-48px" }}>
                    <div
                      className="rounded-full flex items-center justify-center overflow-hidden"
                      style={{
                        width: "120px",
                        height: "120px",
                        border: "8px solid #FCEE57",
                        boxShadow: "0 10px 25px rgba(0,0,0,.2)",
                      }}
                    >
                      <div className="w-full h-full relative">
                        <Image
                          src={c.icon}
                          alt={c.title}
                          fill
                          className="object-cover scale-125"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    </div>
                  </div>

                  {/* White card */}
                  <div
                    className="relative bg-white rounded-[22px] text-center w-full"
                    style={{
                      padding: "80px 24px 52px",
                      minHeight: "255px",
                      boxShadow: "0 18px 35px rgba(0,0,0,.18), 0 6px 15px rgba(0,0,0,.08)",
                    }}
                  >
                    <h3 className="font-sans font-semibold text-[18px] leading-[1.3] text-[#000000]">
                      {c.title}
                    </h3>
                    <p className="font-sans font-medium text-[14px] leading-[1.6] text-[#666666] mt-2">
                      {c.desc}
                    </p>

                    {/* Decorative dots */}
                    <div className="flex items-center justify-center gap-1.5 mt-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FCEE57]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FCEE57]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FCEE57]" />
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="relative z-10 flex justify-center" style={{ marginTop: "-22px" }}>
                    <button
                      className="font-serif font-bold text-[16px] text-[#000000] bg-[#FCEE57] flex items-center justify-center cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03]"
                      style={{
                        width: "180px",
                        height: "44px",
                        borderRadius: "999px",
                        boxShadow: "0 8px 20px rgba(252,238,87,.35), 0 4px 12px rgba(0,0,0,.1)",
                      }}
                    >
                      {c.title}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
