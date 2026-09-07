"use client";

import React, { useState } from "react";
import { CTASection } from "@/components/cta/CTASection";
import { Reveal } from "@/components/shared/Reveal";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  Utensils,
  Coffee,
  CupSoda,
  Sandwich,
  Popcorn,
  Wheat,
  Soup,
  Flame,
  Leaf,
  Milk,
  Cake,
  GlassWater,
  type LucideIcon,
} from "lucide-react";

interface MenuVariant {
  label?: string;
  price: string;
}

interface MenuItem {
  name: string;
  variants: MenuVariant[];
}

interface MenuCategory {
  key: string;
  title: string;
  icon: LucideIcon;
  subtitle?: string;
  items: MenuItem[];
}

const single = (price: string): MenuVariant[] => [{ price }];
const paired = (a: string, b: string): MenuVariant[] => [
  { label: "Regular", price: a },
  { label: "With Ice Cream", price: b },
];

const menuCategories: MenuCategory[] = [
  {
    key: "poha",
    title: "Special Poha's (9 Types of Poha)",
    icon: Utensils,
    items: [
      { name: "Kanda Poha", variants: single("₹40") },
      { name: "Tarri Poha", variants: single("₹50") },
      { name: "Matki Poha", variants: single("₹65") },
      { name: "Dahi Poha", variants: single("₹60") },
      { name: "Chiwda Poha", variants: single("₹60") },
      { name: "Misal Poha", variants: single("₹60") },
      { name: "Paneer Poha", variants: single("₹70") },
      { name: "Indori Poha", variants: single("₹60") },
      { name: "Jain Poha", variants: single("₹60") },
      { name: "Kanda Poha (1 kg)", variants: single("₹199") },
    ],
  },
  {
    key: "beverages",
    title: "Beverages",
    icon: Coffee,
    items: [
      { name: "Special Kadak Tea", variants: [{ label: "60 ml", price: "₹20" }, { label: "100 ml", price: "₹35" }] },
      { name: "Ginger Tea", variants: [{ label: "60 ml", price: "₹25" }, { label: "100 ml", price: "₹45" }] },
      { name: "Elaichi Tea", variants: [{ label: "60 ml", price: "₹25" }, { label: "100 ml", price: "₹45" }] },
      { name: "Kulhad Tea", variants: [{ label: "60 ml", price: "₹30" }, { label: "100 ml", price: "₹50" }] },
      { name: "Lemon Tea", variants: [{ label: "100 ml", price: "₹30" }] },
      { name: "Hot Coffee", variants: [{ label: "100 ml", price: "₹40" }] },
      { name: "Black Coffee", variants: [{ label: "100 ml", price: "₹35" }] },
      { name: "Green Tea", variants: [{ label: "100 ml", price: "₹40" }] },
      { name: "Green Tea With Honey", variants: [{ label: "100 ml", price: "₹50" }] },
      { name: "Hot Milk", variants: [{ label: "100 ml", price: "₹40" }] },
      { name: "Haldi Milk", variants: [{ label: "100 ml", price: "₹45" }] },
      { name: "Bornvita Milk", variants: [{ label: "100 ml", price: "₹50" }] },
      { name: "Boost", variants: [{ label: "100 ml", price: "₹50" }] },
    ],
  },
  {
    key: "seasonals",
    title: "Seasonals",
    icon: CupSoda,
    items: [
      { name: "Butter Milk", variants: [{ label: "Regular", price: "₹40" }] },
      { name: "Lemon Juice", variants: [{ label: "Regular", price: "₹40" }] },
      { name: "Aam Ras", variants: [{ label: "Regular", price: "₹50" }] },
      { name: "Lassi", variants: paired("₹60", "₹80") },
      { name: "Mango Lassi", variants: paired("₹80", "₹100") },
    ],
  },
  {
    key: "spring-roll",
    title: "Spring Roll",
    icon: Sandwich,
    items: [
      { name: "Veg Spring Roll", variants: single("₹129") },
      { name: "Chilli Garlic", variants: single("₹149") },
      { name: "Cheese Corn", variants: single("₹149") },
      { name: "Dosa Roll", variants: single("₹129") },
    ],
  },
  {
    key: "snacks",
    title: "Snacks",
    icon: Popcorn,
    items: [
      { name: "Upma", variants: single("₹49") },
      { name: "Veg Upma", variants: single("₹59") },
      { name: "Ghee Upma", variants: single("₹69") },
      { name: "Poha Nuggets", variants: single("₹69") },
      { name: "Mung Nuggets", variants: single("₹89") },
      { name: "Poha Cheese Corn Nuggets", variants: single("₹119") },
    ],
  },
  {
    key: "paratha",
    title: "Paratha",
    icon: Wheat,
    items: [
      { name: "Methi Paratha", variants: single("₹59") },
      { name: "Aloo Paratha", variants: single("₹79") },
      { name: "Mix Veg Paratha", variants: single("₹89") },
      { name: "Paneer Paratha", variants: single("₹110") },
      { name: "Puran Poli", variants: single("₹69") },
    ],
  },
  {
    key: "pav",
    title: "Pav Specials",
    icon: Soup,
    items: [
      { name: "Vada Pav (Single)", variants: single("₹29") },
      { name: "Cheese Vada Pav", variants: single("₹49") },
      { name: "Makai Palak Vada Pav", variants: single("₹49") },
      { name: "Misal Pav", variants: single("₹99") },
      { name: "Special Misal Pav", variants: single("₹129") },
      { name: "Veg Keema Pav", variants: single("₹99") },
      { name: "Veg Bhurji Pav", variants: single("₹99") },
      { name: "Bun Maska", variants: single("₹49") },
      { name: "Bun Maska Grilled", variants: single("₹59") },
    ],
  },
  {
    key: "maggie",
    title: "Maggie",
    icon: Soup,
    items: [
      { name: "Masala Maggie", variants: single("₹59") },
      { name: "Veg Maggie", variants: single("₹79") },
      { name: "Cheese Maggie", variants: single("₹89") },
      { name: "Paneer Maggie", variants: single("₹89") },
      { name: "Special Tarri Maggie", variants: single("₹89") },
      { name: "Punjabi Maggie", variants: single("₹89") },
      { name: "Cheese Corn Maggie", variants: single("₹99") },
    ],
  },
  {
    key: "fries",
    title: "French Fries",
    icon: Flame,
    items: [
      { name: "Salted Fries", variants: single("₹89") },
      { name: "Masala Fries", variants: single("₹99") },
      { name: "Cheesy Fries", variants: single("₹129") },
      { name: "Peri Peri Fries", variants: single("₹99") },
      { name: "Honey Chilly Potato", variants: single("₹179") },
    ],
  },
  {
    key: "upvas",
    title: "Upvas Specials",
    icon: Leaf,
    items: [
      { name: "Sabudana Vada", variants: single("₹49") },
      { name: "Sabudana Khichdi", variants: single("₹79") },
      { name: "Sabudana Khichdi With Dahi", variants: single("₹99") },
    ],
  },
  {
    key: "shakes",
    title: "Special Shakes (With Ice Cream)",
    icon: Milk,
    items: [
      { name: "Strawberry Shake", variants: single("₹99") },
      { name: "Butterscotch Shake", variants: single("₹99") },
      { name: "Mango Shake", variants: single("₹99") },
      { name: "Oreo Shake", variants: single("₹119") },
      { name: "Chocochips Shake", variants: single("₹119") },
      { name: "Kitkat Shake", variants: single("₹119") },
      { name: "Chocolate Shake", variants: single("₹119") },
      { name: "Brownie Shake", variants: single("₹119") },
    ],
  },
  {
    key: "cold-coffee",
    title: "Cold Coffee",
    icon: GlassWater,
    items: [
      { name: "Cold Coffee", variants: paired("₹79", "₹99") },
      { name: "Creamy Cold Coffee", variants: paired("₹99", "₹119") },
      { name: "Chocolate Cold Coffee", variants: paired("₹99", "₹119") },
      { name: "Choco Cold Coffee", variants: paired("₹99", "₹119") },
    ],
  },
  {
    key: "sweet",
    title: "Sweet Delight",
    icon: Cake,
    items: [
      { name: "Gulab Jamun", variants: [{ label: "Regular", price: "₹30" }] },
      { name: "Choco Lava Cake", variants: [{ label: "Regular", price: "₹79" }] },
      { name: "Chocolate Brownie", variants: paired("₹89", "₹109") },
      { name: "Walnut Brownie", variants: paired("₹99", "₹119") },
    ],
  },
];

const tabs = [
  { key: "all", label: "All" },
  ...menuCategories.map((c) => ({ key: c.key, label: c.title })),
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#FCEE57] tracking-tight font-serif">
              Our Menu
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex items-center justify-center gap-2">
              <span className="block w-16 h-[2px] bg-[#FCEE57]/40 rounded-full" />
              <span className="block w-2 h-2 bg-[#FCEE57] rounded-full" />
              <span className="block w-16 h-[2px] bg-[#FCEE57]/40 rounded-full" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white text-sm sm:text-base leading-relaxed font-medium max-w-2xl mx-auto">
              Freshly made Poha, rich in flavor and tradition. Satisfy your cravings anytime with Pohewala!
            </p>
          </Reveal>
        </section>

        {/* 2. CATEGORY TABS */}
        <Reveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      ? "bg-[#FCEE57] border-[#FCEE57] text-black shadow-lg scale-105"
                      : "bg-white/5 border-[#666666] text-white hover:bg-white/10 hover:border-[#FCEE57]/60"
                  }`}
                >
                  {t.label}
                  <span
                    className={`ml-1.5 text-xs font-semibold ${
                      isActive ? "text-[#666666]" : "text-[#BCBCBC]"
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
                    className="flex items-center gap-3 border-b-2 border-[#FCEE57] pb-2"
                  >
                    <span className="w-10 h-10 rounded-full bg-[#FCEE57]/15 border border-[#FCEE57]/40 flex items-center justify-center shrink-0">
                      <cat.icon className="w-5 h-5 text-[#FCEE57]" />
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                      {cat.title}
                    </h2>
                    <span className="hidden sm:inline-flex text-xs font-bold text-[#BCBCBC]">
                      {cat.items.length} items
                    </span>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {cat.items.map((mi) => (
                      <motion.div
                        key={mi.name}
                        variants={item}
                        className="group bg-black/80 rounded-2xl p-5 border border-[#666666] hover:border-[#FCEE57] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,.35)] transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-baseline gap-2">
                          <h3 className="font-bold text-white text-lg font-serif leading-snug shrink-0">
                            {mi.name}
                          </h3>
                          <span
                            aria-hidden
                            className="flex-1 border-b border-dotted border-[#666666] group-hover:border-[#FCEE57]/70 transition-colors duration-300"
                          />
                          <div className="shrink-0 flex items-center gap-3">
                            {mi.variants.map((v, i) => (
                              <span key={i} className="flex items-baseline gap-1">
                                {v.label && (
                                  <span className="text-[10px] font-semibold text-[#BCBCBC] uppercase tracking-wide">
                                    {v.label}
                                  </span>
                                )}
                                <span className="font-black text-[#FCEE57] text-base whitespace-nowrap">
                                  {v.price}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
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