import React from "react";
import Image from "next/image";

interface InstagramCardProps {
  image: string;
  alt: string;
}

export const InstagramCard: React.FC<InstagramCardProps> = ({ image, alt }) => {
  return (
    <div className="group w-[250px] h-[430px] overflow-hidden cursor-pointer rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,.1)] hover:shadow-[0_16px_40px_rgba(0,0,0,.18)] transition-all duration-500 ease-out">
      <div className="w-full h-full relative overflow-hidden rounded-[20px]">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="250px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </div>
          <span className="text-white text-[13px] font-semibold tracking-wide uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75">
            View Post
          </span>
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#833AB4]">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span className="text-[11px] font-semibold text-[#333]">Instagram</span>
        </div>
      </div>
    </div>
  );
};
