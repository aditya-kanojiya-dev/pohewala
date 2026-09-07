"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CTASection } from "@/components/cta/CTASection";
import { Reveal } from "@/components/shared/Reveal";
import { BlogCard } from "@/components/home/blogs/BlogCard";
import { BlogReaderModal } from "@/components/blog/BlogReaderModal";
import { blogPosts, type BlogPost } from "@/lib/blogs";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const FeatureCard: React.FC<{ post: BlogPost; onOpen: (p: BlogPost) => void }> = ({
  post,
  onOpen,
}) => (
  <button
    onClick={() => onOpen(post)}
    className="group w-full text-left bg-white rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,.18)] transition-all duration-500 ease-out grid md:grid-cols-2"
    aria-label={`Read ${post.title}`}
  >
    <div className="relative h-[260px] md:h-full overflow-hidden">
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
    <div className="p-6 sm:p-10 flex flex-col">
      <span className="inline-block w-12 h-1 bg-[#FCEE57] mb-5" />
      <h2 className="font-serif font-bold text-black text-2xl sm:text-4xl leading-tight">
        {post.title}
      </h2>
      <p className="text-[15px] text-[#666666] leading-relaxed mt-4">{post.excerpt}</p>
      <div className="flex items-center gap-3 mt-auto pt-6">
        <div className="w-10 h-10 rounded-full overflow-hidden relative ring-2 ring-[#BCBCBC]">
          <Image src={post.avatar} alt={post.author} fill sizes="40px" className="object-cover" />
        </div>
        <div className="text-sm">
          <p className="font-bold text-black">{post.author}</p>
          <p className="text-[#BCBCBC]">{post.date} · {post.views} views</p>
        </div>
      </div>
    </div>
  </button>
);

export default function BlogPage() {
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [feature, ...rest] = blogPosts;

  return (
    <div className="space-y-16 py-8">
      {/* Masthead */}
      <Reveal className="max-w-5xl mx-auto px-4 text-center space-y-4">
        <span className="inline-block w-12 h-1 bg-[#FCEE57] rounded-full" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#FCEE57] tracking-tight font-serif">
          Pohewala Blogs
        </h1>
        <p className="text-white text-sm sm:text-base leading-relaxed font-medium">
          Stories, recipes, and updates from the world of Pohewala — served fresh, like our poha.
        </p>
      </Reveal>

      {/* Lead feature */}
      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeatureCard post={feature} onOpen={setSelected} />
      </Reveal>

      {/* The rest of the paper */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-serif font-bold text-white text-xl sm:text-2xl">More Stories</h2>
          <div className="flex-1 h-px bg-[#FCEE57]/30" />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[40px] max-w-4xl"
        >
          {rest.map((post) => (
            <motion.div key={post.id} variants={fadeUp}>
              <button
                onClick={() => setSelected(post)}
                className="block w-full text-left"
                aria-label={`Read ${post.title}`}
              >
                <BlogCard {...post} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <CTASection />

      {/* Popup reader */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <BlogReaderModal post={selected} onClose={() => setSelected(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}