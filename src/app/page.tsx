"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FindPohewalaSection } from "@/components/home/FindPohewalaSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { BlogsSection } from "@/components/home/BlogsSection";
import { CTASection } from "@/components/cta/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FindPohewalaSection />
      <WhyChooseUsSection />
      <BlogsSection />
      <TestimonialSection />
      <InstagramSection />
      <CTASection />
    </>
  );
}
