"use client";

import React, { useRef, useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export const EnquireModal: React.FC = () => {
  const { isOpen, closeModal } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "enquiry",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          message: formData.message,
          honeypot: honeypotRef.current?.value ?? "",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        closeModal();
        setFormData({ name: "", email: "", phone: "", city: "", message: "" });
      }, 2500);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-black border-2 border-[#FCEE57] rounded-2xl shadow-2xl p-6 sm:p-8 text-white overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-[#BCBCBC] hover:text-white p-1 rounded-full bg-black hover:bg-[#666666] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#FCEE57] animate-bounce" />
            <h3 className="text-2xl font-bold text-white font-serif">Thank You!</h3>
            <p className="text-sm text-white max-w-xs">
              Your enquiry has been received. The Pohewala franchise team will get back to you shortly!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              ref={honeypotRef}
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <div className="border-b border-[#666666] pb-3">
              <span className="text-xs text-[#FCEE57] uppercase font-bold tracking-wider">
                Pohewala Franchise Opportunity
              </span>
              <h3 className="text-2xl font-black text-white font-serif">Enquire Now</h3>
              <p className="text-xs text-[#BCBCBC] mt-1">
                Fill out the form below to own your Pohewala outlet!
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black border border-[#666666] rounded-lg px-3.5 py-2 text-sm text-white placeholder-[#BCBCBC] focus:outline-none focus:ring-2 focus:ring-[#FCEE57] focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black border border-[#666666] rounded-lg px-3.5 py-2 text-sm text-white placeholder-[#BCBCBC] focus:outline-none focus:ring-2 focus:ring-[#FCEE57] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black border border-[#666666] rounded-lg px-3.5 py-2 text-sm text-white placeholder-[#BCBCBC] focus:outline-none focus:ring-2 focus:ring-[#FCEE57] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white mb-1">
                Target City / Location *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Nagpur, Pune, Bengaluru"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-black border border-[#666666] rounded-lg px-3.5 py-2 text-sm text-white placeholder-[#BCBCBC] focus:outline-none focus:ring-2 focus:ring-[#FCEE57] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white mb-1">
                Message / Notes (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about your investment budget or timeline..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black border border-[#666666] rounded-lg px-3.5 py-2 text-sm text-white placeholder-[#BCBCBC] focus:outline-none focus:ring-2 focus:ring-[#FCEE57] focus:border-transparent"
              />
            </div>

            {submitError && (
              <p className="text-sm text-red-400 font-medium bg-red-950/50 border border-red-500/40 rounded-lg px-4 py-2.5">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#FCEE57] hover:bg-black hover:text-[#FCEE57] text-black font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-60"
            >
              <Send className="w-4 h-4" /> Submit Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
