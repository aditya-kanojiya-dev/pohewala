"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Menu", href: "/menu" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-pohe-gradient border-2 border-[#000000] [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(115deg,transparent_42%,rgba(255,255,255,0.07)_50%,transparent_58%)] [background-size:18px_18px,100%_100%]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-28 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group">
          <div className="p-1 group-hover:scale-105 transition-transform">
<Image
  src="/images/Navlogo.png"
  alt="Pohewala Logo"
  loading="eager"
  width={370}
  height={103}
  priority
  className="w-[140px] sm:w-[185px] h-auto object-contain"
/>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm lg:text-base font-medium transition-colors hover:text-[#FCEE57] ${
                isActive(item.href)
                  ? "text-[#FCEE57] border-b-2 border-[#FCEE57] pb-1 font-semibold"
                  : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="/partner"
            className="bg-[#FCEE57] hover:bg-black hover:text-[#FCEE57] text-black font-bold px-5 py-2.5 rounded-md shadow-md transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide"
          >
            Become a Partner
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-white hover:text-white hover:bg-[#666666]/50"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#000000] border-b border-[#666666] px-4 pt-3 pb-6 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.href)
                  ? "bg-[#FCEE57] text-black font-bold"
                  : "text-white hover:bg-[#666666] hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/partner"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full bg-[#FCEE57] hover:bg-black hover:text-[#FCEE57] text-black font-bold px-4 py-2.5 rounded-md shadow text-center"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
