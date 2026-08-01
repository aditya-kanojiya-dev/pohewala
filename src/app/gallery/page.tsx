"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CTASection } from "@/components/cta/CTASection";
import { Reveal } from "@/components/shared/Reveal";
import { X, ZoomIn } from "lucide-react";

type Category = "food" | "store" | "person";

interface GalleryItem {
  title: string;
  tag: string;
  type: Category;
  image: string;
  aspect: string;
}

const galleryItems: GalleryItem[] = [
  {
    title: "Nagpuri Tarri Poha Platter",
    tag: "Signature Dish",
    type: "food",
    image: "/images/gallary/pic-1.png",
    aspect: "aspect-[3/4]",
  },
  {
    title: "Nagpur Store Front",
    tag: "Outlet",
    type: "store",
    image: "/images/gallary/pic-2.png",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Poha Preparation Counter",
    tag: "Kitchen",
    type: "food",
    image: "/images/gallary/pic-3.png",
    aspect: "aspect-[16/9]",
  },
  {
    title: "Founders Launch Ceremony",
    tag: "Event",
    type: "person",
    image: "/images/gallary/pic-4.png",
    aspect: "aspect-[5/2]",
  },
  {
    title: "Pune Franchise Store",
    tag: "Outlet",
    type: "store",
    image: "/images/gallary/pic-5.png",
    aspect: "aspect-[3/2]",
  },
  {
    title: "Indori Sev Poha Special",
    tag: "Dish",
    type: "food",
    image: "/images/gallary/pic-6.png",
    aspect: "aspect-[3/2]",
  },
  {
    title: "Happy Customers",
    tag: "Community",
    type: "person",
    image: "/images/gallary/pic-7.png",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Bengaluru Regional Office",
    tag: "Office",
    type: "store",
    image: "/images/outlets.png",
    aspect: "aspect-[3/2]",
  },
  {
    title: "Fresh Ingredients",
    tag: "Quality",
    type: "food",
    image: "/images/ingredients.png",
    aspect: "aspect-[3/2]",
  },
  {
    title: "Kulhad Chai Moments",
    tag: "Culture",
    type: "person",
    image: "/images/Blogs/blog-poster.png",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Tarri Poha Special",
    tag: "Food Post",
    type: "food",
    image: "/images/Posts/post1.png",
    aspect: "aspect-[3/4]",
  },
  {
    title: "Fan Favorites",
    tag: "Food Post",
    type: "food",
    image: "/images/Posts/post2.png",
    aspect: "aspect-[3/4]",
  },
  {
    title: "Snacks & Chai Combo",
    tag: "Food Post",
    type: "food",
    image: "/images/Posts/post3.png",
    aspect: "aspect-[3/4]",
  },
  {
    title: "Street Style Poha",
    tag: "Food Post",
    type: "food",
    image: "/images/Posts/post4.png",
    aspect: "aspect-[3/4]",
  },
];

const filters: Array<{ key: Category | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "food", label: "Food" },
  { key: "store", label: "Outlets" },
  { key: "person", label: "People" },
];

export default function GalleryPage() {
  const [active, setActive] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const items = active === "all" ? galleryItems : galleryItems.filter((i) => i.type === active);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="space-y-16 py-8">
      {/* Hero */}
      <Reveal className="text-center space-y-4 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#E6DA34] tracking-tight font-serif">
          Pohewala Gallery
        </h1>
        <p className="text-neutral-200 text-sm sm:text-base leading-relaxed font-medium">
          A glimpse into our food, outlets, culture, and growing movement across India.
        </p>
      </Reveal>

      {/* Category Filter */}
      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((f) => {
            const count =
              f.key === "all"
                ? galleryItems.length
                : galleryItems.filter((i) => i.type === f.key).length;
            const isActive = active === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                aria-pressed={isActive}
                className={`cursor-pointer px-5 py-2 rounded-full text-sm font-bold border transition-all duration-200 ${
                  isActive
                    ? "bg-[#E6DA34] border-[#E6DA34] text-neutral-950 shadow-lg scale-105"
                    : "bg-white/5 border-neutral-600 text-neutral-300 hover:bg-white/10 hover:border-[#E6DA34]/60"
                }`}
              >
                {f.label}
                <span
                  className={`ml-1.5 text-xs font-semibold ${
                    isActive ? "text-neutral-800" : "text-neutral-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.button
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelected(item)}
                aria-label={`Open ${item.title}`}
                className="group relative block w-full mb-5 break-inside-avoid rounded-2xl overflow-hidden cursor-pointer text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E6DA34]/60"
              >
                <div className={`${item.aspect} relative overflow-hidden bg-neutral-900`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Zoom hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-5 h-5 text-neutral-950" />
                    </div>
                  </div>

                  {/* Tag badge */}
                  <span className="absolute top-3 left-3 bg-[#E6DA34] text-neutral-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {item.tag}
                  </span>

                  {/* Title */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close gallery"
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.figure
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`relative w-full ${selected.aspect} max-h-[75vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-neutral-900`}
              >
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  sizes="100vw"
                  className="object-contain bg-neutral-900"
                />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-center gap-3 justify-center">
                <span className="bg-[#E6DA34] text-neutral-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {selected.tag}
                </span>
                <h3 className="text-white font-bold text-lg font-serif">{selected.title}</h3>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
    </div>
  );
}
