"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export const EnquireModal: React.FC = () => {
  const { isOpen, closeModal } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeModal();
      setFormData({ name: "", email: "", phone: "", city: "", message: "" });
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-neutral-900 border-2 border-[#E6DA34] rounded-2xl shadow-2xl p-6 sm:p-8 text-white overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#E6DA34] animate-bounce" />
            <h3 className="text-2xl font-bold text-white font-serif">Thank You!</h3>
            <p className="text-sm text-neutral-300 max-w-xs">
              Your enquiry has been received. The Pohewala franchise team will get back to you shortly!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-neutral-800 pb-3">
              <span className="text-xs text-[#E6DA34] uppercase font-bold tracking-wider">
                Pohewala Franchise Opportunity
              </span>
              <h3 className="text-2xl font-black text-white font-serif">Enquire Now</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Fill out the form below to own your Pohewala outlet!
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#E6DA34] focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#E6DA34] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#E6DA34] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Target City / Location *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Nagpur, Pune, Bengaluru"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#E6DA34] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Message / Notes (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about your investment budget or timeline..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#E6DA34] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E6DA34] hover:bg-[#d8ca24] text-neutral-950 font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition"
            >
              <Send className="w-4 h-4" /> Submit Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
