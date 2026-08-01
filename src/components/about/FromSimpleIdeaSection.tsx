"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const milestones = [
  {
    year: "2018",
    title: "The Beginning",
    desc: "It all started in Nagpur with a simple cloud kitchen model. A small team, a big dream, and a belief that poha deserved more.",
  },
  {
    year: "2019",
    title: "Stepping to Streets",
    desc: "Moving from online delivery to physical outlets, Pohewala let customers truly experience the brand, not just order it.",
  },
  {
    year: "2020",
    title: "Building Trust",
    desc: "Focusing on consistency built word-of-mouth trust, inspiring satisfied customers not only to return, but to bring others along.",
  },
  {
    year: "2023",
    title: "Expanding Across Cities",
    desc: "Expanding beyond its roots, Pohewala gained recognition across new cities by serving its signature, authentic taste to all.",
  },
  {
    year: "2026",
    title: "A Growing Movement",
    desc: "With multiple city outlets serving thousands daily, Pohewala is more than food—it's a habit, routine, and feeling.",
  },
];

export const FromSimpleIdeaSection: React.FC = () => {
  return (
    <section className="w-full">
      <style>{`
        @keyframes vehicle-drive {
          0% { left: -6%; }
          10% { left: 10%; }
          30% { left: 30%; }
          50% { left: 50%; }
          70% { left: 70%; }
          90% { left: 90%; }
          100% { left: 106%; }
        }
        @keyframes vehicle-react {
          0%, 100% { transform: scale(1) rotate(0deg); }
          9% { transform: scale(1); }
          10% { transform: scale(1.25) rotate(-6deg); }
          12% { transform: scale(1) rotate(0deg); }
          29% { transform: scale(1); }
          30% { transform: scale(1.25) rotate(6deg); }
          32% { transform: scale(1) rotate(0deg); }
          49% { transform: scale(1); }
          50% { transform: scale(1.25) rotate(-6deg); }
          52% { transform: scale(1) rotate(0deg); }
          69% { transform: scale(1); }
          70% { transform: scale(1.25) rotate(6deg); }
          72% { transform: scale(1) rotate(0deg); }
          89% { transform: scale(1); }
          90% { transform: scale(1.25) rotate(-6deg); }
          92% { transform: scale(1) rotate(0deg); }
        }
        @keyframes card-react {
          0%, 7%, 100% { transform: scale(1) rotate(0deg); }
          3% { transform: scale(1.3) rotate(-5deg); }
        }
        .vehicle-bob { animation: vehicle-react 20s linear infinite; }
        .milestone-badge { animation: card-react 20s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .vehicle-bob, .milestone-badge { animation: none; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[54px] font-black leading-[1.05] font-serif">
              <span className="text-white block">From A Simple Idea</span>
              <span className="text-white block">to India&apos;s Poha</span>
              <span className="text-[#E6DA34] block text-[46px] sm:text-[60px] lg:text-[74px] tracking-tight">
                MOVEMENT
              </span>
            </h2>
          </div>

          <div className="relative min-h-[280px] sm:min-h-[400px] lg:min-h-[400px]">
            <Image
              src="/images/store-logo.png"
              alt="Pohewala Outlet Storefront Illustration"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <div className="relative w-full -mt-23 h-10 sm:h-20 bg-neutral-800 border-y border-neutral-700 flex items-center justify-center overflow-hidden">
        <div className="w-full border-t-2 border-dashed border-[#E6DA34]" />
        <div className="absolute inset-y-0 left-0 right-0 mx-auto max-w-7xl px-4 pointer-events-none">
          <span
            className="absolute top-1/2 -translate-y-1/2"
            style={{ animation: "vehicle-drive 20s linear infinite" }}
            aria-hidden
          >
            <span className="vehicle-bob inline-block">
              <Image
                src="/images/delivery-man.png"
                alt=""
                width={56}
                height={56}
                className="object-contain -scale-x-100"
              />
            </span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {milestones.map((m, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className={`flex flex-col items-center text-center ${idx % 2 ? "lg:rotate-1" : "lg:-rotate-1"}`}
              >
                <span className="w-0.5 h-10 sm:h-12 border-l-2 border-dashed border-[#E6DA34]/70" />
                <span
                  className="milestone-badge bg-white text-neutral-950 font-black text-2xl px-8 py-2 rounded-full border-[3px] border-neutral-950 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]"
                  style={{ animationDelay: `${idx * 4 + 2}s` }}
                >
                  {m.year}
                </span>
                <span className="bg-[#E6DA34] text-neutral-950 font-bold text-sm px-4 py-1.5 rounded-full border-[3px] border-neutral-950 mt-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
                  {m.title}
                </span>
                <div className="mt-5 bg-[#E6DA34] text-neutral-900 rounded-2xl p-5 w-full border-[3px] border-neutral-950 shadow-[6px_6px_0_0_rgba(0,0,0,0.45)] hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-xs leading-relaxed font-medium">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
