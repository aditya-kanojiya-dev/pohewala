import React from "react";
import { Quote, User } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  designation: string;
  message: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  designation,
  message,
}) => {
  return (
    <div className="group w-full max-w-[340px] h-[250px] bg-white rounded-[32px] p-7 shadow-[0_4px_20px_rgba(0,0,0,.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,.15)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-3 right-4 text-[#FCEE57]/20">
        <Quote size={32} />
      </div>
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-14 h-14 rounded-full overflow-hidden relative flex-shrink-0 ring-2 ring-[#BCBCBC] group-hover:ring-[#FCEE57]/40 transition-all duration-300 bg-[#FCEE57] flex items-center justify-center">
          <User size={24} className="text-black" />
        </div>
        <div>
          <h3 className="font-bold text-[20px] text-black">{name}</h3>
          <p className="text-[14px] text-[#BCBCBC]">{designation}</p>
        </div>
      </div>
      <p className="text-[18px] font-normal text-[#666666] leading-[1.8] mt-4 line-clamp-4 relative z-10">
        {message}
      </p>
    </div>
  );
};
