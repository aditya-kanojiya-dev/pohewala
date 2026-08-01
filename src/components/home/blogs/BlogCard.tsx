import React from "react";
import Image from "next/image";
import { Eye, MessageCircle, ArrowRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  author: string;
  avatar: string;
  image: string;
  date: string;
  views: number;
  comments: number;
  reverseLayout?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  author,
  avatar,
  image,
  date,
  views,
  comments,
  reverseLayout = false,
}) => {
  const ImageSection = (
    <div className="h-[210px] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 z-10 transition-colors duration-500" />
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        sizes="380px"
      />
    </div>
  );

  const ContentSection = (
    <div className="h-[290px] p-6 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0 ring-2 ring-gray-100">
            <Image src={avatar} alt={author} fill className="object-cover" sizes="40px" />
          </div>
          <span className="font-medium text-[15px] text-[#333]">{author}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[13px] text-[#666] group-hover:text-[#444] transition-colors duration-300">
            <Eye size={16} className="group-hover:scale-110 transition-transform duration-300" />
            <span>{views}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-[#666] group-hover:text-[#444] transition-colors duration-300">
            <MessageCircle size={16} className="group-hover:scale-110 transition-transform duration-300" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 my-4" />
      <p className="text-[20px] font-medium text-[#444] leading-relaxed flex-1 whitespace-pre-line group-hover:text-[#333] transition-colors duration-300">
        {title}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[14px] text-[#888]">{date}</span>
        <div className="flex items-center gap-2 group/btn">
          <span className="text-[14px] font-medium text-[#666] group-hover:text-[#333] transition-colors duration-300">Read More</span>
          <div className="w-11 h-11 rounded-full bg-[#FFD93D] flex items-center justify-center flex-shrink-0 group-hover/btn:bg-[#f5d030] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">
            <ArrowRight size={20} className="text-black group-hover:translate-x-0.5 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="group w-full max-w-[380px] h-[480px] sm:h-[500px] bg-white rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,.15)] hover:-translate-y-2 transition-all duration-500 ease-out">
      {reverseLayout ? (
        <>
          {ContentSection}
          {ImageSection}
        </>
      ) : (
        <>
          {ImageSection}
          {ContentSection}
        </>
      )}
    </div>
  );
};
