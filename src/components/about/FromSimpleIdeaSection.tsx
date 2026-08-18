"use client";

import React, { useEffect, useState } from "react";
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
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % milestones.length), 4000);
    return () => clearInterval(t);
  }, []);

  const milestoneCard = (m: (typeof milestones)[number], idx: number) => (
    <>
      <span className="w-0.5 h-10 sm:h-12 border-l-2 border-dashed border-[#FCEE57]/70" />
      <span
        className="milestone-badge bg-white text-black font-black text-2xl px-8 py-2 rounded-full border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]"
        style={{ animationDelay: `${idx * 4 + 2}s` }}
      >
        {m.year}
      </span>
      <span className="bg-[#FCEE57] text-black font-bold text-sm px-4 py-1.5 rounded-full border-[3px] border-black mt-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
        {m.title}
      </span>
      <div className="mt-5 bg-[#FCEE57] text-black rounded-2xl p-5 w-full border-[3px] border-black shadow-[6px_6px_0_0_rgba(0,0,0,0.45)] hover:-translate-y-1 transition-transform duration-300">
        <p className="text-xs leading-relaxed font-medium">
          {m.desc}
        </p>
      </div>
    </>
  );

  return (
    <section className="w-full">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[54px] font-black leading-[1.05] font-serif">
              <span className="text-white block">From A Simple Idea</span>
              <span className="text-white block">to India&apos;s Poha</span>
              <span className="text-[#FCEE57] block text-[46px] sm:text-[60px] lg:text-[74px] tracking-tight">
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

      <div className="relative w-full -mt-6 sm:-mt-12 lg:-mt-23 h-10 sm:h-20 bg-black border-y border-[#666666] flex items-center justify-center overflow-hidden">
        <div className="w-full border-t-2 border-dashed border-[#FCEE57]" />
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
                className="object-contain"
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
          <div>
            <div className="sm:hidden">
              <div className="relative min-h-[280px] flex items-center justify-center">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full max-w-sm mx-auto flex flex-col items-center text-center"
                >
                  <span className="w-0.5 h-10 border-l-2 border-dashed border-[#FCEE57]/70" />
                  <span className="bg-white text-black font-black text-3xl px-8 py-2 rounded-full border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
                    {milestones[active].year}
                  </span>
                  <span className="bg-[#FCEE57] text-black font-bold text-sm px-4 py-1.5 rounded-full border-[3px] border-black mt-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
                    {milestones[active].title}
                  </span>
                  <div className="mt-5 bg-[#FCEE57] text-black rounded-2xl p-5 w-full border-[3px] border-black shadow-[6px_6px_0_0_rgba(0,0,0,0.45)]">
                    <p className="text-xs leading-relaxed font-medium">
                      {milestones[active].desc}
                    </p>
                  </div>
                </motion.div>
              </div>
              <div className="flex justify-center gap-2">
                {milestones.map((m, i) => (
                  <span
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full border border-[#666666] ${
                      i === active ? "bg-[#FCEE57]" : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
              {milestones.map((m, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className={`flex flex-col items-center text-center ${idx % 2 ? "lg:rotate-1" : "lg:-rotate-1"}`}
                >
                  {milestoneCard(m, idx)}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
