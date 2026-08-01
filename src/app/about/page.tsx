"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LeadersSection } from "@/components/about/LeadersSection";
import { FromSimpleIdeaSection } from "@/components/about/FromSimpleIdeaSection";
import { CTASection } from "@/components/cta/CTASection";
import { Lightbulb, Target, Coins } from "lucide-react";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const strivePoints = [
  {
    icon: Lightbulb,
    title: "Mission",
    desc: "To Serve Authentic, Fresh, And Nutritious Poha Conveniently And Affordably To Everyone, Anytime.",
    variant: "default" as const,
  },
  {
    icon: Target,
    title: "Vision",
    desc: "To Elevate India's Favorite Comfort Breakfast Into A Universally Loved, Globally Accessible Food Habit.",
    variant: "highlighted" as const,
  },
  {
    icon: Coins,
    title: "Values",
    desc: "Uncompromising Hygiene, Consistent Taste, Relentless Innovation, Customer-First Service, & Affordable Pricing For All Food Lovers.",
    variant: "default" as const,
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [flowPath, setFlowPath] = useState({ d: "", w: 0, h: 0 });

  const measureFlow = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const centers = circleRefs.current
      .filter((el): el is HTMLDivElement => !!el)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left - rect.left + r.width / 2,
          y: r.top - rect.top + r.height / 2,
          r: r.width / 2,
        };
      });
    if (centers.length < 3) return;
    const [c1, c2, c3] = centers;
    const top1 = c1.y - c1.r;
    const bottom2 = c2.y + c2.r;
    const top3 = c3.y - c3.r;
    const mid12 = (top1 + bottom2) / 2;
    const mid23 = (bottom2 + top3) / 2;
    const d = `M ${c1.x} ${top1} C ${c1.x} ${mid12}, ${c2.x} ${mid12}, ${c2.x} ${bottom2} C ${c2.x} ${mid23}, ${c3.x} ${mid23}, ${c3.x} ${top3}`;
    setFlowPath({ d, w: rect.width, h: rect.height });
  }, []);

  useLayoutEffect(() => {
    measureFlow();
    const onResize = () => measureFlow();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measureFlow]);

  return (
    <div className="space-y-16 py-8">

      {/* 1. PAGE TITLE */}
      <section className="text-center space-y-5 max-w-5xl mx-auto px-4 pt-6 sm:pt-10 pb-2">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[32px] sm:text-[44px] md:text-[56px] lg:text-[68px] font-black text-white tracking-tight font-serif leading-[1.05]"
        >
          The Pohewala Journey
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="text-[#E6DA34] text-sm sm:text-base md:text-lg leading-relaxed font-medium max-w-5xl mx-auto"
        >
          In a city like Nagpur, where mornings start with the aroma of tarri poha, two young minds decided to turn this everyday dish into something extraordinary.
        </motion.p>
      </section>

      {/* 2. LEADERS SECTION */}
      <LeadersSection />

      {/* 3. FROM A SIMPLE IDEA */}
      <FromSimpleIdeaSection />

      {/* 4. WHAT MAKES US DIFFERENT */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-black text-white font-serif [text-shadow:4px_4px_0_rgba(0,0,0,0.5)]">
            What Makes Us Different
          </h2>
          <p className="text-[#E6DA34] text-sm sm:text-base">
            In a city like Nagpur, where mornings start with the aroma of tarri poha, two young minds decided to turn this everyday dish into something extraordinary.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="bg-neutral-900 rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-[12px_12px_0_0_rgba(230,218,52,0.4)] relative overflow-hidden border-[3px] border-neutral-950"
        >
          <Image
            src="/images/ingredients.png"
            alt="What Makes Pohewala Different"
            width={2880}
            height={1280}
            className="w-full h-auto object-contain"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
      </motion.section>

      {/* 6. AT POHEWALA, WE STRIVE FOR */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeUp} className="text-center mb-14 lg:mb-20">
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-black text-white font-serif leading-tight [text-shadow:4px_4px_0_rgba(0,0,0,0.5)]">
            At Pohewala, We{" "}
            <span className="text-[#E6DA34]">Strive For</span>
          </h2>
        </motion.div>

        <div
          ref={containerRef}
          className="relative flex flex-col lg:flex-row justify-center items-center gap-y-14 lg:gap-x-24"
        >
          {flowPath.d && (
            <svg
              className="absolute inset-0 hidden lg:block w-full h-full pointer-events-none"
              viewBox={`0 0 ${flowPath.w} ${flowPath.h}`}
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                id="flow-path"
                d={flowPath.d}
                stroke="#E6DA34"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 10"
              />
              <g>
                <path d="M 0 0 L 14 7 L 0 14 Z" fill="#E6DA34" />
                <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#flow-path" />
                </animateMotion>
              </g>
            </svg>
          )}
          {strivePoints.map((item, i) => {
            const highlighted = item.variant === "highlighted";
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="relative flex flex-col items-center text-center"
              >
                {/* Front circle */}
                <div
                  ref={(el) => {
                    circleRefs.current[i] = el;
                  }}
                  className={`relative rounded-full flex flex-col items-center justify-center text-center px-8 pt-12 pb-10 gap-3.5 border-[3px] border-neutral-950 ${
                    highlighted
                      ? "bg-[#E6DA34] w-[260px] h-[260px] lg:w-[300px] lg:h-[300px] shadow-[10px_10px_0_0_rgba(0,0,0,0.45)]"
                      : "bg-white w-[240px] h-[240px] lg:w-[270px] lg:h-[270px] shadow-[10px_10px_0_0_rgba(0,0,0,0.45)]"
                  }`}
                >
                  <span
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center border-[3px] border-neutral-950 text-base font-black font-serif ${
                      highlighted ? "bg-white text-neutral-950" : "bg-[#E6DA34] text-neutral-950"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-[3px] border-neutral-950 ${
                      highlighted ? "bg-white" : "bg-[#E6DA34]"
                    }`}
                  >
                    <item.icon className="w-8 h-8 text-neutral-900" strokeWidth={2.5} />
                  </span>
                  <span
                    className={`font-black text-lg tracking-wide font-serif ${
                      highlighted ? "text-neutral-950" : "text-neutral-950"
                    }`}
                  >
                    {item.title}
                  </span>
                  <p
                    className={`text-sm leading-relaxed max-w-[220px] font-medium ${
                      highlighted ? "text-neutral-900" : "text-neutral-800"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <CTASection />
    </div>
  );
}
