"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CX = 1124;
const CY = 267;
const R = 318;
const ANGLES = [135, 112.5, 90, 67.5, 45];
const SIZES = [110, 120, 130, 120, 110];

const VARIANTS = [
  { label: "Classic Poha", color: "#FCEE57", bgColor: "rgba(252,238,87,.25)" },
  { label: "Tarri Poha", color: "#E85D3A", bgColor: "rgba(232,93,58,.25)" },
  { label: "Special Poha", color: "#4CAF50", bgColor: "rgba(76,175,80,.25)" },
  { label: "Cheese Poha", color: "#FF9800", bgColor: "rgba(255,152,0,.25)" },
  { label: "Fruit Poha", color: "#E91E63", bgColor: "rgba(233,30,99,.25)" },
];

function pos(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: CX + R * Math.cos(rad),
    y: CY + R * Math.sin(rad),
  };
}

interface MiniBowlProps {
  p: { x: number; y: number };
  size: number;
  variant: { label: string; color: string };
  isActive: boolean;
  activeShadow: string;
  idleShadow?: string;
  borderWidth: number;
  delay: number;
  imgScale?: string;
  showLabel?: boolean;
  onClick: () => void;
}

const MiniBowl: React.FC<MiniBowlProps> = ({
  p,
  size,
  variant,
  isActive,
  activeShadow,
  idleShadow,
  borderWidth,
  delay,
  imgScale = "scale-[1.3]",
  showLabel = false,
  onClick,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, ease: "easeOut", delay }}
    className="absolute"
    style={{
      left: p.x - size / 2,
      top: p.y - size / 2,
      width: size,
      height: size,
      cursor: "pointer",
      pointerEvents: "auto",
      zIndex: isActive ? 20 : 10,
    }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <motion.div
      animate={isActive ? { scale: 1.15 } : { scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-full h-full"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `${borderWidth}px solid ${variant.color}`,
          boxShadow: isActive ? activeShadow : idleShadow,
          transition: "box-shadow 0.3s ease",
        }}
      />
      <Image
        src="/images/poha-bowl-small.png"
        alt={variant.label}
        width={496}
        height={479}
        className={`object-contain w-full h-full ${imgScale}`}
      />
      {showLabel && (
        <AnimatePresence>
          {isActive && (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-black bg-white/90 px-2 py-0.5 rounded-full shadow"
            >
              {variant.label}
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  </motion.div>
);

export const HeroSection: React.FC = () => {
  const [activeMini, setActiveMini] = useState(2);

  const next = useCallback(() => {
    setActiveMini((i) => (i + 1) % VARIANTS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full bg-[#FCEE57] overflow-visible">
      <div className="relative mx-auto flex flex-col lg:flex-row max-w-[1440px] min-h-[600px] lg:min-h-0 lg:h-[453px]">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 w-full lg:w-[45%] flex flex-col justify-center px-4 sm:px-10 lg:pl-[60px] pt-8 lg:pt-0 pb-6 lg:pb-0"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="font-serif font-semibold text-[28px] sm:text-[36px] md:text-[48px] lg:text-[72px] leading-[1.05] lg:leading-[100%] text-black"
            style={{ textShadow: "0 15.7px 16px rgba(255,174,0,.01), 0 30px 92px rgba(255,174,0,.28)" }}
          >
            India&apos;s First Authentic
            <br />
            Pohewala
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
            className="font-serif font-normal text-[16px] sm:text-[18px] md:text-[22px] lg:text-[24px] text-black mt-3 sm:mt-4 lg:mt-6"
            style={{ textShadow: "0 15.7px 16px rgba(255,174,0,.01), 0 30px 92px rgba(255,174,0,.28)" }}
          >
            Your ultimate food experience is here!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            className="flex flex-wrap gap-3 sm:gap-4 mt-5 sm:mt-6 lg:mt-8"
          >
            <Link
              href="/contact"
              className="font-inter font-bold text-[16px] sm:text-[18px] lg:text-[20px] text-white rounded-[10px] bg-gradient-to-r from-[#898989] to-[#4B4B4B] hover:-translate-y-[3px] hover:scale-[1.03] hover:shadow-[0_10px_25px_rgba(0,0,0,.18)] transition-all duration-200 flex items-center justify-center"
              style={{ width: "150px", height: "48px", maxWidth: "100%" }}
            >
              Enquire Now
            </Link>
            <Link
              href="/menu"
              className="font-inter font-bold text-[16px] sm:text-[18px] lg:text-[20px] text-[#4B4B4B] rounded-[10px] border-2 border-[#4B4B4B] hover:-translate-y-[3px] hover:scale-[1.03] hover:shadow-[0_10px_25px_rgba(0,0,0,.18)] transition-all duration-200 flex items-center justify-center"
              style={{ width: "150px", height: "48px", maxWidth: "100%" }}
            >
              Our Menu
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Composition - Desktop */}
        <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute"
            style={{
              width: "636px",
              height: "636px",
              left: "806px",
              top: "-51px",
            }}
          >
            <svg width="636" height="636" viewBox="0 0 636 636">
              <circle
                cx="318"
                cy="318"
                r="317"
                fill="none"
                stroke="rgba(255,255,255,.75)"
                strokeWidth="2"
                strokeDasharray="28 26"
              />
            </svg>
          </motion.div>

          {/* Colored backing circle */}
          <div
            className="absolute rounded-full"
            style={{
              width: "522px",
              height: "522px",
              left: "863px",
              top: "6px",
              backgroundColor: "#FCEE57",
            }}
          />

          {/* Main bowl with AnimatePresence */}
          <div
            className="absolute"
            style={{
              width: "583px",
              height: "563px",
              left: "803px",
              top: "-15px",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMini}
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full relative"
              >
                <Image
                  src="/images/poha-bowl.png"
                  alt={VARIANTS[activeMini].label}
                  width={496}
                  height={479}
                  className="object-contain w-full h-full scale-[1.38]"
                  loading="eager"
                  fetchPriority="high"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mini Bowls */}
          {ANGLES.map((angle, i) => {
            const p = pos(angle);
            const s = SIZES[i];
            return (
              <MiniBowl
                key={i}
                p={p}
                size={s}
                variant={VARIANTS[i]}
                isActive={i === activeMini}
                activeShadow={`0 0 20px ${VARIANTS[i].color}66, 0 8px 25px rgba(0,0,0,.2)`}
                idleShadow="0 8px 22px rgba(0,0,0,.28)"
                borderWidth={3}
                delay={0.5 + i * 0.08}
                showLabel
                onClick={() => setActiveMini(i)}
              />
            );
          })}
        </div>

        {/* Right Composition - Mobile (mirrors desktop, stacked below) */}
        <div className="block lg:hidden relative w-full px-4 pb-8 overflow-visible">
          <div className="relative mx-auto" style={{ width: "380px", maxWidth: "100%", height: "400px" }}>
            {/* Rotating dashed circle */}
            <div
              className="absolute"
              style={{ width: "350px", height: "350px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-full h-full"
              >
                <svg width="350" height="350" viewBox="0 0 350 350">
                  <circle
                    cx="175"
                    cy="175"
                    r="174"
                    fill="none"
                    stroke="rgba(255,255,255,.75)"
                    strokeWidth="2"
                    strokeDasharray="15 14"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Colored backing circle */}
            <div
              className="absolute rounded-full"
              style={{
                width: "287px",
                height: "287px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#FCEE57",
              }}
            />

            {/* Main bowl */}
            <div
              className="absolute"
              style={{
                width: "320px",
                height: "310px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMini}
                  initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full relative"
                >
                  <Image
                    src="/images/poha-bowl.png"
                    alt={VARIANTS[activeMini].label}
                    width={496}
                    height={479}
                    className="object-contain w-full h-full scale-[1.38]"
                    loading="eager"
                    fetchPriority="high"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mini Bowls */}
            {ANGLES.map((angle, i) => {
              const s = SIZES[i] * 0.44;
              const rad = (angle * Math.PI) / 180;
              return (
                <MiniBowl
                  key={i}
                  p={{ x: 190 + 175 * Math.cos(rad), y: 205 + 175 * Math.sin(rad) }}
                  size={s}
                  variant={VARIANTS[i]}
                  isActive={i === activeMini}
                  activeShadow={`0 0 12px ${VARIANTS[i].color}66`}
                  idleShadow="0 8px 22px rgba(0,0,0,.28)"
                  borderWidth={3}
                  delay={0.3 + i * 0.06}
                  showLabel
                  onClick={() => setActiveMini(i)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
