"use client";

import React, { useState } from "react";
import { CTASection } from "@/components/cta/CTASection";
import { Reveal } from "@/components/shared/Reveal";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Utensils, Flame, Coffee, Sandwich, type LucideIcon } from "lucide-react";

interface MenuItem {
  name: string;
  price: string;
  desc: string;
  tag?: string;
}

interface MenuCategory {
  key: string;
  title: string;
  icon: LucideIcon;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    key: "signature",
    title: "Signature Poha Varieties",
    icon: Utensils,
    items: [
      { name: "Nagpuri Tarri Poha", price: "₹40", desc: "Authentic spicy black chickpea tarri poured over fluffy steamed poha", tag: "Bestseller" },
      { name: "Indori Sev Poha", price: "₹35", desc: "Sweet & tangy Indori poha topped with crunchy Ratlami sev and pomegranate", tag: "Popular" },
      { name: "Cheese Butter Poha", price: "₹50", desc: "Rich butter cooked poha loaded with melted mozzarella & cheddar", tag: "Chef Special" },
      { name: "Sprouts Protein Poha", price: "₹45", desc: "Healthy steamed poha mixed with boiled moong sprouts & roasted peanuts", tag: "Healthy" },
    ],
  },
  {
    key: "snacks",
    title: "Snacks & Sides",
    icon: Sandwich,
    items: [
      { name: "Crispy Kanda Bhajiya", price: "₹40", desc: "Golden fried onion fritters served with spicy green chutney" },
      { name: "Tarri Samosa (2 pcs)", price: "₹45", desc: "Hot potato samosas topped with Nagpur special tarri gravy" },
      { name: "Sabudana Vada (2 pcs)", price: "₹50", desc: "Crispy tapioca patties served with sweet curd chutney" },
    ],
  },
  {
    key: "beverages",
    title: "Beverages",
    icon: Coffee,
    items: [
      { name: "Nagpuri Special Chai", price: "₹15", desc: "Strong ginger & cardamom spiced cutting tea" },
      { name: "Icy Cold Coffee", price: "₹40", desc: "Thick creamy chilled coffee with cocoa drizzle" },
      { name: "Fresh Masala Lassi", price: "₹35", desc: "Traditional sweet churned buttermilk" },
    ],
  },
];

const tabs = [
  { key: "all", label: "All" },
  ...menuCategories.map((c) => ({ key: c.key, label: c.title.split(" ")[0] })),
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function MenuPage() {
  const [active, setActive] = useState("all");
  const groups =
    active === "all" ? menuCategories : menuCategories.filter((c) => c.key === active);

  const count = (key: string) =>
    key === "all"
      ? menuCategories.reduce((n, c) => n + c.items.length, 0)
      : menuCategories.find((c) => c.key === key)!.items.length;

  return (
    <MotionConfig reducedMotion="user">
      <div className="space-y-16 py-8">
        {/* 1. HERO */}
        <section className="text-center space-y-5 max-w-4xl mx-auto px-4 pt-6 sm:pt-10">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#E6DA34] tracking-tight font-serif">
              Our Menu
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex items-center justify-center gap-2">
              <span className="block w-16 h-[2px] bg-[#E6DA34]/40 rounded-full" />
              <span className="block w-2 h-2 bg-[#E6DA34] rounded-full" />
              <span className="block w-16 h-[2px] bg-[#E6DA34]/40 rounded-full" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-neutral-200 text-sm sm:text-base leading-relaxed font-medium max-w-2xl mx-auto">
              Freshly made Poha, rich in flavor and tradition. Satisfy your cravings anytime with Pohewala!
            </p>
          </Reveal>
        </section>

        {/* 2. CATEGORY TABS */}
        <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map((t) => {
              const isActive = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  aria-pressed={isActive}
                  className={`cursor-pointer px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-200 ${
                    isActive
                      ? "bg-[#E6DA34] border-[#E6DA34] text-neutral-950 shadow-lg scale-105"
                      : "bg-white/5 border-neutral-600 text-neutral-300 hover:bg-white/10 hover:border-[#E6DA34]/60"
                  }`}
                >
                  {t.label}
                  <span
                    className={`ml-1.5 text-xs font-semibold ${
                      isActive ? "text-neutral-800" : "text-neutral-500"
                    }`}
                  >
                    {count(t.key)}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* 3. MENU SECTIONS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={container}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              className="space-y-14"
            >
              {groups.map((cat) => (
                <div key={cat.key} className="space-y-6">
                  <motion.div
                    variants={item}
                    className="flex items-center gap-3 border-b-2 border-[#E6DA34] pb-2"
                  >
                    <span className="w-10 h-10 rounded-full bg-[#E6DA34]/15 border border-[#E6DA34]/40 flex items-center justify-center shrink-0">
                      <cat.icon className="w-5 h-5 text-[#E6DA34]" />
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                      {cat.title}
                    </h2>
                    <span className="hidden sm:inline-flex text-xs font-bold text-neutral-500">
                      {cat.items.length} items
                    </span>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {cat.items.map((mi) => (
                      <motion.div
                        key={mi.name}
                        variants={item}
                        className="group bg-neutral-800/80 rounded-2xl p-5 border border-neutral-700 hover:border-[#E6DA34] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,.35)] transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-baseline gap-2">
                          <h3 className="font-bold text-white text-lg font-serif leading-snug shrink-0">
                            {mi.name}
                          </h3>
                          {mi.tag && (
                            <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-black text-[#E6DA34] uppercase tracking-wider border border-[#E6DA34]/40 rounded-full px-2 py-0.5 -translate-y-0.5">
                              <Flame className="w-3 h-3" /> {mi.tag}
                            </span>
                          )}
                          <span
                            aria-hidden
                            className="flex-1 border-b border-dotted border-neutral-500 group-hover:border-[#E6DA34]/70 transition-colors duration-300"
                          />
                          <span className="shrink-0 font-black text-[#E6DA34] text-base">
                            {mi.price}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed mt-2 max-w-[90%]">
                          {mi.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        <CTASection />
      </div>
    </MotionConfig>
  );
}
