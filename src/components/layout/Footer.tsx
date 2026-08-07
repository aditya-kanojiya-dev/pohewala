"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="text-white pt-12 border-t-2 border-[#000000] bg-gradient-to-b from-[#000000] to-[#000000] [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(115deg,transparent_42%,rgba(255,255,255,0.07)_50%,transparent_58%)] [background-size:18px_18px,100%_100%]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Image
              src="/images/logo.png"
              alt="Pohewala Logo"
              width={370}
              height={103}
              className="w-[200px] h-[55px] object-contain"
            />

            <p className="text-sm text-white leading-relaxed">
              Pohewala delivers the heart of Maharashtra with every bite! Enjoy our freshly made Poha, rich in flavor and tradition. Crafted with love and local ingredients, we bring the taste of home right to your door. Satisfy your cravings anytime with Pohewala – &ldquo;The Poha You Know!&rdquo;
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook SVG */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#3b5998] hover:opacity-90 flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram SVG */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 hover:opacity-90 flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn SVG */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#0077b5] hover:opacity-90 flex items-center justify-center transition-transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b-2 border-[#FCEE57] pb-1 inline-block font-serif">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-white">
              <li>
                <Link href="/" className="hover:text-[#FCEE57] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FCEE57] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#FCEE57] transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#FCEE57] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FCEE57] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FCEE57] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacts */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b-2 border-[#FCEE57] pb-1 inline-block font-serif">
              Contacts
            </h3>
            <ul className="space-y-3 text-sm text-white">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FCEE57] shrink-0" />
                <a href="mailto:Pohewalacare@gmail.com" className="hover:underline">
                  Pohewalacare@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FCEE57] shrink-0" />
                <a href="tel:+919923000480" className="hover:underline">
                  +91-9923000480
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FCEE57] shrink-0" />
                <a href="tel:+918888843354" className="hover:underline">
                  +91-8888843354
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FCEE57] shrink-0" />
                <a href="tel:+919552714131" className="hover:underline">
                  +91-9552714131
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Address */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b-2 border-[#FCEE57] pb-1 inline-block font-serif">
              Address
            </h3>
            <div className="space-y-4 text-sm text-white">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-[#FCEE57]">
                  <MapPin className="w-4 h-4" /> Head office
                </div>
                <p className="mt-1 leading-snug">
                  4th Floor, Guruprasad Apartment, Taj Nagar, near Tukdogi Putla Square, Nagpur-440027, Maharashtra.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 font-bold text-[#FCEE57]">
                  <MapPin className="w-4 h-4" /> Regional office
                </div>
                <p className="mt-1 leading-snug">
                  House no. 317, 7th Main Rd, Sector 6, HSR Layout, Bengaluru, Karnataka-560102
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Yellow Copyright Bar */}
      <div className="bg-[#FCEE57] text-black py-3 text-xs md:text-sm font-semibold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Copyright@2026 Pohewala. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:underline">Terms & Condition</Link>
            <span>|</span>
            <Link href="/faq" className="hover:underline">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
