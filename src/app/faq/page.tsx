"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { CTASection } from "@/components/cta/CTASection";
import { Plus, X, MapPin } from "lucide-react";

interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export default function FAQPage() {
  // Track open item ID (default open: "about-1")
  const [openId, setOpenId] = useState<string | null>("about-1");

  const faqData: FAQCategory[] = [
    {
      category: "About Pohewala India",
      items: [
        {
          id: "about-1",
          number: "01",
          question: "What is Pohewala India?",
          answer:
            "Pohewala India is India's first quick-service café chain dedicated to serving authentic and innovative Poha varieties across multiple states.",
        },
        {
          id: "about-2",
          number: "02",
          question: "Where are Pohewala stores located?",
          answer:
            "Pohewala stores are present across Maharashtra, Chhattisgarh, Karnataka, and rapidly expanding to 20+ major cities including Nagpur, Pune, Bengaluru, Raipur, and Mumbai.",
        },
        {
          id: "about-3",
          number: "03",
          question: "When was Pohewala India started?",
          answer:
            "Pohewala was founded in 2018 in Nagpur with a mission to elevate India's favorite comfort breakfast into a accessible quick-service food brand.",
        },
      ],
    },
    {
      category: "Customer Queries",
      items: [
        {
          id: "cust-1",
          number: "01",
          question: "What types of Poha do you serve?",
          answer:
            "We serve Nagpuri Tarri Poha, Indori Sev Poha, Cheese Poha, Butter Poha, Sprouts Poha, and signature regional fusion varieties crafted with fresh ingredients.",
        },
        {
          id: "cust-2",
          number: "02",
          question: "Can I order online?",
          answer:
            "Yes! You can order your favorite Pohewala dishes online via Swiggy, Zomato, or directly through our official ordering channels for quick doorstep delivery.",
        },
        {
          id: "cust-3",
          number: "03",
          question: "Do you offer catering or bulk orders?",
          answer:
            "Absolutely! We provide fresh, hygienic, and affordable bulk meals for corporate events, offices, weddings, and parties with timely delivery.",
        },
      ],
    },
    {
      category: "Franchise Queries",
      items: [
        {
          id: "fran-1",
          number: "01",
          question: "How can I take a Pohewala franchise?",
          answer:
            "You can apply by clicking the 'Enquire Now' button on our website or submitting your contact details. Our franchise expansion manager will guide you through the process.",
        },
        {
          id: "fran-2",
          number: "02",
          question: "How long does it take to start a franchise after signing the agreement?",
          answer:
            "Typically, it takes between 3 to 4 weeks to complete site setup, interior branding, staff training, and official outlet launch.",
        },
        {
          id: "fran-3",
          number: "03",
          question: "What support does Pohewala provide to franchisees?",
          answer:
            "We provide complete store setup support, supply chain logistics, secret recipe pre-mixes, staff training, digital marketing support, and POS software.",
        },
      ],
    },
    {
      category: "General Queries",
      items: [
        {
          id: "gen-1",
          number: "01",
          question: "Do you have international expansion plans?",
          answer:
            "Yes, Pohewala aims to bring authentic Indian comfort breakfast to global markets including the Middle East and Southeast Asia in the near future.",
        },
        {
          id: "gen-2",
          number: "02",
          question: "How can I contact Pohewala India?",
          answer:
            "You can email us at Pohewalacare@gmail.com or call our customer care numbers: +91-9923000480, +91-8888843354, or +91-9552714131.",
        },
      ],
    },
  ];

  const citiesList = [
    { name: "Nagpur", count: "12" },
    { name: "Hubli", count: "01" },
    { name: "Bangalore", count: "02" },
    { name: "Pune", count: "02" },
    { name: "Bhilai", count: "01" },
    { name: "Durg", count: "02" },
    { name: "Bilaspur", count: "01" },
    { name: "Raipur", count: "02" },
    { name: "Akola", count: "01" },
    { name: "Bhandara", count: "01" },
    { name: "Wardha", count: "01" },
    { name: "Amravati", count: "02" },
    { name: "Balaghat", count: "01" },
    { name: "Buttibori", count: "01" },
    { name: "Chandrapur", count: "01" },
    { name: "Nashik", count: "01" },
    { name: "New Mumbai", count: "01" },
  ];

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-20 py-8">

      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 max-w-5xl mx-auto px-4 pt-6 sm:pt-10">
        <h1
          className="font-serif font-bold text-[32px] sm:text-[40px] md:text-[50px] lg:text-[58px] leading-[1.1] text-white"
          style={{ textShadow: "0 15.7px 16px rgba(252,238,87,.01), 0 30px 92px rgba(252,238,87,.28)" }}
        >
          Frequently Asked{" "}
          <span className="text-[#FCEE57]">Questions</span>
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="block w-16 h-[2px] bg-[#FCEE57]/40 rounded-full" />
          <span className="block w-2 h-2 bg-[#FCEE57] rounded-full" />
          <span className="block w-16 h-[2px] bg-[#FCEE57]/40 rounded-full" />
        </div>
        <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed font-medium max-w-5xl mx-auto">
          In a city like Nagpur, where mornings start with the aroma of tarri poha, two young minds decided to turn this everyday dish into something extraordinary.
        </p>
      </section>

      {/* 2. ACCORDION SECTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {faqData.map((cat, catIdx) => (
          <motion.div
            key={catIdx}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-5"
          >

            {/* Category Title */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#FCEE57] flex items-center justify-center shadow-[0_6px_16px_rgba(252,238,87,.35)] font-serif font-bold text-black text-base">
                {String(catIdx + 1).padStart(2, "0")}
              </span>
              <h2 className="font-serif font-bold text-[22px] sm:text-[26px] lg:text-[30px] text-white">
                {cat.category}
              </h2>
            </motion.div>

            {/* Accordion Items */}
            <div className="space-y-4">
              {cat.items.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    className={`rounded-[18px] overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-r from-[#FCEE57] to-[#FCEE57] shadow-[0_18px_35px_rgba(252,238,87,.18),0_6px_15px_rgba(0,0,0,.08)]"
                        : "bg-white shadow-[0_10px_25px_rgba(0,0,0,.12),0_4px_10px_rgba(0,0,0,.06)] hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(0,0,0,.16)]"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(item.id)}
                      aria-expanded={isOpen}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-serif font-bold shrink-0 transition-colors duration-300 ${
                            isOpen
                              ? "bg-white text-black shadow-[0_4px_10px_rgba(0,0,0,.12)]"
                              : "bg-[#FFFFFF] text-[#BCBCBC]"
                          }`}
                        >
                          {item.number}
                        </span>
                        <span
                          className={`font-sans font-semibold text-[15px] sm:text-[17px] leading-snug ${
                            isOpen ? "text-[#000000]" : "text-[#000000]"
                          }`}
                        >
                          {item.question}
                        </span>
                      </div>

                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "bg-[#000000] text-white rotate-180"
                            : "bg-[#FCEE57]/20 text-[#000000]"
                        }`}
                      >
                        {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#000000]/10">
                            <div className="flex items-center gap-2 pb-3">
                              <span className="w-6 h-[2px] bg-[#000000]/30 rounded-full" />
                              <span className="w-1.5 h-1.5 bg-[#000000]/30 rounded-full" />
                              <span className="w-6 h-[2px] bg-[#000000]/30 rounded-full" />
                            </div>
                            <p className="font-sans font-medium text-[14px] sm:text-[15px] leading-relaxed text-[#666666] max-w-2xl">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        ))}
      </section>

      {/* 3. FIND POHEWALA WHEREVER YOU ARE SECTION */}
      <section className="relative overflow-hidden rounded-[28px] mx-4 sm:mx-8 lg:mx-12 bg-[#FCEE57]">
        <style>{`
          @keyframes float-soft { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        `}</style>
        <div
          className="absolute rounded-full bg-white"
          style={{ width: "280px", height: "280px", left: "-90px", top: "20%", filter: "blur(70px)", opacity: ".25" }}
          aria-hidden
        />
        <div
          className="absolute rounded-full bg-white"
          style={{ width: "220px", height: "220px", right: "-60px", bottom: "10%", filter: "blur(60px)", opacity: ".25" }}
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="font-serif font-bold text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] text-[#000000]">
              Find Pohewala, Wherever You Are
            </h2>
            <p className="tagline text-[17px] sm:text-[19px] text-[#000000]">
              &ldquo;Expanding to 20+ Cities and Beyond!&rdquo;
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="block w-16 h-[2px] bg-[#000000]/25 rounded-full" />
              <span className="block w-2 h-2 bg-[#000000] rounded-full" />
              <span className="block w-16 h-[2px] bg-[#000000]/25 rounded-full" />
            </div>
          </div>

          {/* Cities Badge Cloud */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {citiesList.map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white text-black px-4 py-2 rounded-full font-sans font-semibold text-xs sm:text-sm shadow-[0_8px_20px_rgba(0,0,0,.1)] flex items-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,0,0,.15)]"
              >
                <MapPin className="w-4 h-4 text-[#000000]" fill="#FCEE57" />
                <span>{c.name}</span>
                <span className="bg-[#FCEE57] text-black px-2 py-0.5 rounded-full text-xs font-bold">
                  {c.count}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Outlet Photo Grid Placeholder */}
          <div className="pt-6 max-w-4xl mx-auto">
            <div className="relative rounded-[22px] overflow-hidden shadow-[0_18px_35px_rgba(0,0,0,.18),0_6px_15px_rgba(0,0,0,.08)]">
              <ImagePlaceholder
                label="Pohewala Multi-City Outlet Network Grid"
                aspectRatio="aspect-[2880/1761]"
                imageSrc="/images/outlets.png"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <CTASection />

    </div>
  );
}
