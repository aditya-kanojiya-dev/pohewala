"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { CTASection } from "@/components/cta/CTASection";
import { Reveal } from "@/components/shared/Reveal";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Navigation,
  Play,
  Search,
  Locate,
  Loader2,
} from "lucide-react";

const inputClass =
  "w-full bg-white/90 border border-[#BCBCBC] rounded-[16px] px-5 py-3.5 text-base text-black placeholder-[#BCBCBC] focus:outline-none focus:border-[#FCEE57] focus:ring-4 focus:ring-[#BCBCBC]/40 transition";

const STORES = [
  { id: 1, name: "Pohewala Head Office", city: "Nagpur", lat: 21.1458, lng: 79.0882 },
  { id: 2, name: "Pohewala Khamla Road", city: "Nagpur", lat: 21.1374, lng: 79.0768 },
  { id: 3, name: "Pohewala Pune", city: "Pune", lat: 18.5204, lng: 73.8567 },
  { id: 4, name: "Pohewala Mumbai", city: "Mumbai", lat: 19.076, lng: 72.8777 },
  { id: 5, name: "Pohewala Nashik", city: "Nashik", lat: 19.9975, lng: 73.7898 },
  { id: 6, name: "Pohewala Thane", city: "Thane", lat: 19.2183, lng: 72.9781 },
  { id: 7, name: "Pohewala Aurangabad", city: "Aurangabad", lat: 19.8762, lng: 75.3433 },
  { id: 8, name: "Pohewala Regional Office", city: "Bengaluru", lat: 12.9166, lng: 77.6101 },
];

type Store = (typeof STORES)[number];

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * (Math.PI / 180);
  const dLng = (b.lng - a.lng) * (Math.PI / 180);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * (Math.PI / 180)) *
      Math.cos(b.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

function findNearest(lat: number, lng: number) {
  let best = STORES[0];
  let bestD = Infinity;
  for (const s of STORES) {
    const d = haversineKm({ lat, lng }, s);
    if (d < bestD) {
      bestD = d;
      best = s;
    }
  }
  return { store: best, distanceKm: bestD };
}

const formatDistance = (km: number) =>
  km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

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
          type: "contact",
          name: formState.fullName,
          email: formState.email,
          phone: formState.phone,
          subject: formState.subject,
          message: formState.message,
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
        setFormState({ fullName: "", email: "", phone: "", subject: "", message: "" });
      }, 3000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const [query, setQuery] = useState("");
  const [mapQuery, setMapQuery] = useState(
    "Pohewala+Head+Office,+Taj+Nagar,+Nagpur,+Maharashtra+440027"
  );
  const [nearest, setNearest] = useState<{
    store: Store;
    distanceKm: number;
    origin: string;
  } | null>(null);
  const [searching, setSearching] = useState<"address" | "geo" | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const centerOn = (store: Store, origin: string | null, distanceKm: number) => {
    setMapQuery(`${store.lat},${store.lng}`);
    setNearest(origin ? { store, distanceKm, origin } : null);
  };

  const handleLocate = async () => {
    const q = query.trim();
    if (!q || searching) return;
    setSearching("address");
    setErrorMsg("");
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      if (!res.ok || !data.length) throw new Error("not found");
      const { lat, lng } = data[0];
      const { store, distanceKm } = findNearest(parseFloat(lat), parseFloat(lng));
      centerOn(store, `"${q}"`, distanceKm);
    } catch {
      setErrorMsg("Couldn't find that location. Try a city or PIN code.");
    } finally {
      setSearching(null);
    }
  };

  const handleMyLocation = () => {
    if (searching) return;
    if (!("geolocation" in navigator)) {
      setErrorMsg("Geolocation isn't supported on this device.");
      return;
    }
    setSearching("geo");
    setErrorMsg("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { store, distanceKm } = findNearest(pos.coords.latitude, pos.coords.longitude);
        centerOn(store, "your location", distanceKm);
        setSearching(null);
      },
      () => {
        setErrorMsg("Location access denied. Enable permissions or search an address instead.");
        setSearching(null);
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="space-y-16 py-8">
      
      {/* 1. HERO HEADER */}
      <section className="text-center space-y-4 max-w-4xl mx-auto px-4">
        <Reveal>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#FCEE57] tracking-tight font-serif">
            Contact Us
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-white text-sm sm:text-base leading-relaxed font-medium">
            In a city like Nagpur, where mornings start with the aroma of tarri poha, two young minds decided to turn this everyday dish into something extraordinary.
          </p>
        </Reveal>
      </section>

      {/* 2. MAIN CONTACT CARD & FORM */}
      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[20px] border-[3px] border-[#000000] bg-[#FCEE57] text-black shadow-2xl">
          {/* Decorative two-tone background layers */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {/* Lavender top-left blob */}
            <div className="absolute top-0 left-0 w-[62%] h-[46%] bg-[#FFFFFF] rounded-br-[140px]" />
            {/* Spotlight blob behind the photo */}
            <div className="absolute -left-[8%] bottom-[-14%] w-[48%] h-[72%] rounded-[140px] bg-[#FCEE57]" />
            {/* Diagonal brush strokes top-right */}
            <div className="absolute top-8 right-[8%] w-44 h-7 rounded-full bg-[#FCEE57] opacity-70 rotate-[28deg]" />
            <div className="absolute top-16 right-[28%] w-56 h-5 rounded-full bg-[#FCEE57] opacity-50 -rotate-[24deg]" />
            <div className="absolute top-28 right-[3%] w-28 h-4 rounded-full bg-[#FCEE57] opacity-60 rotate-[34deg]" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Heading & paragraph on lavender */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-tight">
                Lets Get in <span className="font-black">Touch!</span>
              </h2>
              <p className="mt-4 text-sm text-[#666666] font-medium leading-relaxed max-w-[280px]">
                Whether you have questions, need support, or just want to get in touch, don&apos;t hesitate to reach out. Our team is ready to assist you with any inquiries or concerns you may have.
              </p>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-3">
                  <CheckCircle2 className="w-16 h-16 text-green-600 animate-bounce" />
                  <h3 className="text-2xl font-bold text-black">Message Sent!</h3>
                  <p className="text-sm text-[#666666]">
                    Thank you for reaching out to Pohewala. We will contact you shortly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    ref={honeypotRef}
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-[#666666] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#666666] mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[#666666] mb-1.5"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+91 99230 00480"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[#666666] mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="Catering, Bulk order, Feedback..."
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#666666] mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="How can we help you today?"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-600 font-medium bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                      {submitError}
                    </p>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={sending}
                      className="bg-black hover:bg-black active:scale-[0.98] disabled:opacity-60 cursor-pointer text-white font-bold px-8 py-3 rounded-full flex items-center justify-center gap-2 transition text-sm"
                    >
                      <Send className="w-4 h-4 text-[#FCEE57]" /> Submit
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Left: Photo, full-bleed to left & bottom edges (desktop) */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="absolute inset-x-0 bottom-0 -top-126 overflow-hidden">
                <Image
                  src="/images/contact.png"
                  alt="Pohewala support team member"
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Left: Photo (mobile stacked) */}
            <div className="lg:hidden">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-3xl">
                <Image
                  src="/images/contact.png"
                  alt="Pohewala support team member"
                  fill
                  priority
                  sizes="(min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Right: Office Info on yellow */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10 p-8 sm:p-10 lg:p-12 lg:pt-6">
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Head Office:</h3>
                <p className="flex items-start gap-2.5 text-sm font-medium leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#000000] shrink-0 mt-0.5" />
                  <span>
                    4th Floor, Guruprasad Apartment, Taj Nagar, near Tukdogi Putla Square, Nagpur-440027, Maharashtra.
                  </span>
                </p>
                <p className="flex items-center gap-2.5 text-sm font-medium">
                  <Phone className="w-4 h-4 text-[#000000] shrink-0" /> +91-9923000480
                </p>
                <p className="flex items-center gap-2.5 text-sm font-medium">
                  <Mail className="w-4 h-4 text-[#000000] shrink-0" /> Pohewalacare@gmail.com
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold">Regional office:</h3>
                <p className="flex items-start gap-2.5 text-sm font-medium leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#000000] shrink-0 mt-0.5" />
                  <span>
                    House no. 317, 7th Main Rd, Sector 6, HSR Layout, Bengaluru, Karnataka 560102
                  </span>
                </p>
                <p className="flex items-center gap-2.5 text-sm font-medium">
                  <Phone className="w-4 h-4 text-[#000000] shrink-0" /> +91-8888843354
                </p>
                <p className="flex items-center gap-2.5 text-sm font-medium">
                  <Phone className="w-4 h-4 text-[#000000] shrink-0" /> +91-9552714131
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 3. MEDIA BUZZ */}
      <section className="bg-pohe-gradient py-16 text-white border-y border-[#666666]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Reveal className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-[#FCEE57] font-serif">
              Media Buzz
            </h2>
            <p className="text-sm text-white">
              In a city like Nagpur, where mornings start with the aroma of tarri poha...
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "PW32owq7ZTg",
                title: "Famous POHEWALA #nagpur",
                channel: "YouTube",
              },
              {
                id: "pv7iKC7r28U",
                title: "Nagpur's Famous Multi Variety Poha at Pohewala",
                channel: "YouTube",
              },
              {
                id: "b2_O2KuGh2E",
                title: "Pohewala Nagpur | Street Food Vlog",
                channel: "YouTube",
              },
            ].map((v, i) => (
              <Reveal key={v.id} delay={i * 0.1} className="h-full">
                <a
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col bg-white rounded-2xl overflow-hidden border-[3px] border-black shadow-[6px_6px_0_0_rgba(0,0,0,0.45)] hover:-translate-y-1.5 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.45)] transition"
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`}
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.src.includes("maxresdefault")) {
                          img.src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
                        }
                      }}
                      alt={v.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#FCEE57] border-[3px] border-black flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition">
                        <Play className="w-6 h-6 text-black fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-2.5">
                    <h3 className="text-sm font-black text-black leading-snug line-clamp-2">
                      {v.title}
                    </h3>
                    <p className="flex items-center gap-2 text-xs font-bold text-[#BCBCBC] mt-auto">
                      <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded">
                        YouTube
                      </span>
                      Pohewala
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 4. GOOGLE MAPS UI MOCKUP */}
      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif">
            Find Us On <span className="text-[#FCEE57]">Google Maps</span>
          </h2>
          <p className="text-white text-sm font-medium">
            Search your area or share your live location to find the nearest Pohewala store.
          </p>
        </div>

        {/* Locate Panel */}
        <div className="bg-white rounded-3xl shadow-2xl border border-[#FCEE57] p-4 sm:p-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex items-center gap-2 bg-white border border-[#BCBCBC] rounded-xl px-4 flex-1 focus-within:border-[#FCEE57] focus-within:ring-2 focus-within:ring-[#FCEE57] transition">
              <Search className="w-4 h-4 text-[#BCBCBC] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLocate()}
                placeholder="Enter your area, city or PIN code"
                className="bg-transparent py-3 text-base text-black placeholder-[#BCBCBC] outline-none w-full"
              />
            </div>
            <button
              onClick={handleLocate}
              disabled={searching !== null}
              className="bg-black hover:bg-black active:scale-[0.98] disabled:opacity-60 cursor-pointer text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition text-sm"
            >
              {searching === "address" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MapPin className="w-4 h-4 text-[#FCEE57]" />
              )}
              Locate a Store
            </button>
            <button
              onClick={handleMyLocation}
              disabled={searching !== null}
              className="bg-[#FCEE57] hover:bg-black hover:text-[#FCEE57] active:scale-[0.98] disabled:opacity-60 cursor-pointer text-black font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition text-sm border border-[#FCEE57]"
            >
              {searching === "geo" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Locate className="w-4 h-4" />
              )}
              Use My Location
            </button>
          </div>

          {errorMsg && (
            <p className="text-sm text-red-600 font-medium bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
              {errorMsg}
            </p>
          )}

          {nearest && (
            <div className="flex flex-wrap items-center gap-3 bg-[#FCEE57]/10 border border-[#FCEE57] rounded-xl px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-[#FCEE57] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-black">
                  {nearest.store.name}{" "}
                  <span className="text-[#BCBCBC] font-medium">({nearest.store.city})</span>
                </p>
                <p className="text-xs text-[#666666] font-medium">
                  Nearest store from {nearest.origin} — {formatDistance(nearest.distanceKm)} away
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${nearest.store.lat},${nearest.store.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-lg transition cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FCEE57]" /> Directions
              </a>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#BCBCBC] uppercase tracking-wide mr-1">
              Jump to:
            </span>
            {STORES.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setErrorMsg("");
                  centerOn(s, null, 0);
                }}
                className={`text-xs font-bold px-3 py-1.5 rounded-full border cursor-pointer transition ${
                  mapQuery === `${s.lat},${s.lng}`
                    ? "bg-[#FCEE57] border-[#FCEE57] text-black"
                    : "bg-white border-[#BCBCBC] text-[#666666] hover:bg-[#BCBCBC]"
                }`}
              >
                {s.city}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FCEE57] bg-black">
          <iframe
            title="Pohewala Store Location on Google Maps"
            src={`https://www.google.com/maps?q=${mapQuery}&z=13&output=embed`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full aspect-[16/7] border-0"
          />

          {/* Overlay Location Badge Card */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-black p-4 rounded-2xl shadow-xl max-w-xs border border-[#BCBCBC] hidden sm:block">
            <div className="flex items-center gap-2 font-bold text-sm text-[#FCEE57] bg-black px-2.5 py-1 rounded-md mb-2">
              <MapPin className="w-4 h-4" /> {nearest ? nearest.store.name : "Pohewala Head Office"}
            </div>
            <p className="text-xs text-[#666666] font-medium">
              {nearest
                ? `${nearest.store.city} store — ${formatDistance(nearest.distanceKm)} from ${nearest.origin}`
                : "4th Floor, Guruprasad Apartment, Taj Nagar, Nagpur-440027"}
            </p>
            <a
              href={
                nearest
                  ? `https://www.google.com/maps/dir/?api=1&destination=${nearest.store.lat},${nearest.store.lng}`
                  : "https://www.google.com/maps/search/?api=1&query=Pohewala+Head+Office+Taj+Nagar+Nagpur"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 bg-black hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-lg transition cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-[#FCEE57]" /> Get Directions
            </a>
          </div>
        </div>
      </Reveal>

      {/* CTA SECTION */}
      <CTASection />

    </div>
  );
}
