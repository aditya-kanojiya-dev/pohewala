"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Eye, MessageCircle, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/blogs";

interface BlogReaderModalProps {
  post: BlogPost;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-black border-2 border-[#FCEE57] rounded-3xl shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-black font-bold w-10 h-10 rounded-full bg-[#FCEE57] hover:bg-white flex items-center justify-center transition"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-56 sm:h-72">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="768px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        <div className="p-6 sm:p-10">
          <div className="flex items-center gap-3 text-[13px] text-[#BCBCBC]">
            <div className="w-9 h-9 rounded-full overflow-hidden relative ring-2 ring-[#FCEE57]">
              <Image src={post.avatar} alt={post.author} fill sizes="36px" className="object-cover" />
            </div>
            <span className="font-semibold text-white">{post.author}</span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={14} /> {post.views}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle size={14} /> {post.comments}
            </span>
          </div>

          <h2 className="mt-4 font-serif font-bold text-white text-2xl sm:text-4xl leading-tight">
            {post.title}
          </h2>

          <div className="w-16 h-1 bg-[#FCEE57] mt-4 mb-6" />

          {post.body.map((p, i) => (
            <p
              key={i}
              className="text-[15px] sm:text-base text-white/80 leading-[1.9] mb-5"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};