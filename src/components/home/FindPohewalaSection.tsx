"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const states = [
  { id: "mh", label: "Maharashtra" },
  { id: "cg", label: "Chhattisgarh" },
  { id: "ka", label: "Karnataka" },
];

const outlets = [
  { id: 1, city: "Mumbai", image: "/images/store-outlets.png", count: 19 },
  { id: 2, city: "Pune", image: "/images/store-outlets.png", count: 12 },
  { id: 3, city: "Nagpur", image: "/images/store-outlets.png", count: 8 },
  { id: 4, city: "Nashik", image: "/images/store-outlets.png", count: 5 },
  { id: 5, city: "Thane", image: "/images/store-outlets.png", count: 3 },
  { id: 6, city: "Aurangabad", image: "/images/store-outlets.png", count: 1 },
];

function AnimatedCount({ to }: { to: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 800;
    const step = 16;
    const total = Math.ceil(duration / step);
    const inc = to / total;
    const timer = setInterval(() => {
      start += inc;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}</span>;
}

export const FindPohewalaSection: React.FC = () => {
  const [activeState, setActiveState] = useState("mh");
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
      }),
    ],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const handleMouseEnter = useCallback(() => {
    emblaApi?.plugins()?.autoplay?.stop();
  }, [emblaApi]);

  const handleMouseLeave = useCallback(() => {
    emblaApi?.plugins()?.autoplay?.play();
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-visible">
      <style>{`
        @keyframes bowl-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .embla-container { display: flex; gap: 12px; }
        .embla-slide { flex: 0 0 100%; min-width: 0; }
        @media (min-width: 480px) { .embla-slide { flex: 0 0 calc((100% - 12px) / 2); } }
        @media (min-width: 768px) { .embla-slide { flex: 0 0 calc((100% - 24px) / 3); } }
        @media (min-width: 1024px) { .embla-slide { flex: 0 0 calc((100% - 36px) / 4); } }
        @media (min-width: 1280px) { .embla-slide { flex: 0 0 calc((100% - 48px) / 5); } }
      `}</style>

      {/* Yellow background with notch */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#FCEE57",
          clipPath: "polygon(0 0, 44% 0, 56% 70px, 100% 70px, 100% 100%, 0 100%)",
        }}
      />

      {/* Left leaf */}
      <div
        className="absolute z-5 pointer-events-none visible md:block"
        style={{
          width: "clamp(100px, 12vw, 175px)", height: "auto", left: 0, top: "-160px",
          transform: "translate(-35%, 0) rotate(-18deg)",
          filter: "drop-shadow(0 8px 18px rgba(0,0,0,.18))",
          animation: "bowl-float 4s ease-in-out infinite",
        }}
      >
        <Image src="/images/left-leaf.png" alt="" width={390} height={901} className="w-full h-auto" />
      </div>

      {/* Right leaf */}
      <div
        className="absolute z-5 pointer-events-none visible md:block"
        style={{
          width: "clamp(100px, 12vw, 175px)", height: "auto", right: 0, top: "-160px",
          transform: "translate(35%, 0) rotate(18deg)",
          filter: "drop-shadow(0 8px 18px rgba(0,0,0,.18))",
          animation: "bowl-float 4s ease-in-out infinite",
        }}
      >
        <Image src="/images/right-leaf.png" alt="" width={348} height={854} className="w-full h-auto" />
      </div>

      {/* Floating bowl badge */}
      <div
        className="absolute z-10"
        style={{ left: "50%", top: "30px", transform: "translate(-50%, -50%)" }}
      >
        <div style={{ animation: "bowl-float 4s ease-in-out infinite" }}>
          <div
            className="rounded-full bg-white flex items-center justify-center overflow-visible"
            style={{
              width: "clamp(90px, 14vw, 140px)", height: "clamp(90px, 14vw, 140px)",
              border: "clamp(5px, .6vw, 8px) solid #fff",
              boxShadow: "0 8px 24px rgba(0,0,0,.18), 0 4px 10px rgba(0,0,0,.08)",
            }}
          >
            <Image
              src="/images/poha-bowl-small.png"
              alt="Poha Bowl"
              width={496} height={479}
              className="object-contain w-[85%] h-[85%] scale-[1.5]"
            />
          </div>
        </div>
      </div>

      {/* Heading + Tabs */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 sm:px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-serif font-bold text-[26px] sm:text-[30px] md:text-[38px] lg:text-[48px] xl:text-[56px] leading-[1.15] lg:leading-[1.1] text-[#232323] pt-[80px] sm:pt-[90px] md:pt-[120px] lg:pt-[180px] xl:pt-[220px]"
        >
          Find Pohewala, Wherever You Are
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
          className="flex gap-3 sm:gap-4 mt-5 sm:mt-6 md:mt-[28px] overflow-x-auto pb-2 scrollbar-none"
        >
          {states.map((s) => {
            const isActive = s.id === activeState;
            return (
              <button
                key={s.id}
                onClick={() => setActiveState(s.id)}
                className={`shrink-0 h-10 sm:h-12 rounded-[10px] font-semibold text-[13px] sm:text-[15px] px-4 sm:px-6 transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black shadow-[0_4px_16px_rgba(252,238,87,.4)]"
                    : "bg-[#FFF7C5] text-[#666] border border-black/8 hover:bg-white"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Carousel */}
      <div
        className="relative z-10 mt-6 sm:mt-8 md:mt-10 lg:mt-[40px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="embla-container">
            {outlets.map((o, i) => (
              <div key={o.id} className="embla-slide shrink-0">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                  className="group h-full"
                >
                  <div className="bg-white/80 backdrop-blur-md rounded-[16px] sm:rounded-[18px] p-[10px] sm:p-[12px] shadow-[0_8px_32px_rgba(0,0,0,.1)] transition-all duration-400 ease-out hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(252,238,87,.25)] border border-white/60 h-full flex flex-col">
                    <div className="relative rounded-[12px] sm:rounded-[14px] overflow-hidden" style={{ aspectRatio: "4/3", minHeight: "160px" }}>
                      <Image
                        src={o.image}
                        alt={o.city}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        sizes="(max-width: 480px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        loading={i < 4 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#232323]/40 via-transparent to-transparent" />
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#FCEE57] to-[#FFE84D] text-[#232323] text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-[0_4px_12px_rgba(252,238,87,.3)] transition-transform duration-300 ease-out group-hover:scale-105">
                          <span className="w-2 h-2 rounded-full bg-current opacity-60" />
                          <AnimatedCount to={o.count} /> Outlet{o.count > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FCEE57] to-transparent" />
                    </div>
                    <div className="py-2 sm:py-3 px-1 sm:px-1.5 flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-[#232323] leading-tight relative">
                          {o.city}
                          <span className="block w-6 sm:w-8 h-[2px] bg-[#FCEE57] mt-1 rounded-full transition-all duration-300 group-hover:w-8 sm:group-hover:w-12" />
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 mt-auto pt-2 sm:pt-3 text-[#999] text-[11px] sm:text-[12px] font-medium group-hover:text-[#232323] transition-colors duration-300">
                        <MapPin size={12} className="sm:w-[14px] sm:h-[14px]" />
                        <span className="flex-1">View Outlets</span>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-[#FCEE57]/20 flex items-center justify-center group-hover:bg-[#FCEE57]/40 transition-all duration-300 group-hover:translate-x-0.5">
                          <ArrowRight size={10} strokeWidth={2.5} className="text-[#232323] sm:w-[11px] sm:h-[11px] lg:w-[12px] lg:h-[12px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 flex justify-center gap-4 sm:gap-5 pt-6 sm:pt-8 pb-8 sm:pb-12 md:pb-16">
        <button
          onClick={scrollPrev}
          className="w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] md:w-[44px] md:h-[44px] rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,.1)] flex items-center justify-center hover:scale-110 hover:shadow-[0_4px_20px_rgba(252,238,87,.3)] transition-all duration-300 active:scale-95"
          aria-label="Previous outlets"
        >
          <ChevronLeft size={14} strokeWidth={2.5} className="text-[#222] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" />
        </button>
        <button
          onClick={scrollNext}
          className="w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] md:w-[44px] md:h-[44px] rounded-full bg-[#232323] shadow-[0_4px_16px_rgba(0,0,0,.15)] flex items-center justify-center hover:scale-110 hover:shadow-[0_4px_20px_rgba(252,238,87,.25)] transition-all duration-300 active:scale-95"
          aria-label="Next outlets"
        >
          <ChevronRight size={14} strokeWidth={2.5} className="text-white sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" />
        </button>
      </div>
    </section>
  );
};
