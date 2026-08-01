"use client";

import React from "react";
import Image from "next/image";

interface ImagePlaceholderProps {
  label: string;
  imageSrc: string;
  aspectRatio?: string;
  className?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  label,
  imageSrc,
  aspectRatio = "aspect-square",
  className = "",
}) => {
  return (
    <div className={`relative ${aspectRatio} ${className}`}>
      <Image
        src={imageSrc}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );
};
