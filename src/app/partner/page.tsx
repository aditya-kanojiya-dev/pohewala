"use client";

import React, { useRef, useState } from "react";
import { CTASection } from "@/components/cta/CTASection";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { Reveal } from "@/components/shared/Reveal";
import { Play, Send, CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full bg-white border border-[#BCBCBC] rounded-full px-5 py-3 text-base text-black placeholder-[#BCBCBC] focus:outline-none focus:border-[#FCEE57] focus:ring-4 focus:ring-[#BCBCBC]/40 transition";

const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-[#666666] mb-1.5">
    {children}
  </label>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="list-disc pl-5 marker:text-[#FCEE57]/70 text-white space-y-1.5 leading-[1.6]">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const Tagline = () => (
  <p className="tagline text-white text-[18px] sm:text-[20px]">
    Enjoy the taste of tradition with Pohewala &ndash; &lsquo;The Poha You Know&rsquo;!
  </p>
);

export default function PartnerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    datetime: "",
    city: "",
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
          type: "franchise",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          extra: formData.datetime,
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
        setFormData({ name: "", phone: "", email: "", datetime: "", city: "" });
      }, 3000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-16 py-8">
      {/* 1. PAGE TITLE */}
      <section className="text-center px-4 space-y-3">
        <Reveal>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-serif">
            Inviting Franchise Partners
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-[#FCEE57] text-base sm:text-lg font-semibold">
            Pocket Friendly Food Business Franchise Opportunity
          </p>
        </Reveal>
      </section>

      {/* 2. VIDEO + ENQUIRY FORM */}
      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Decorative yellow swooshes behind the card */}
          <div
            aria-hidden
            className="absolute -top-8 -left-10 w-64 h-10 bg-[#FCEE57]/40 rounded-full rotate-[30deg] pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-10 -right-8 w-80 h-8 bg-[#FCEE57]/30 rounded-full -rotate-[25deg] pointer-events-none"
          />

          <div className="relative bg-[#FFFFFF] rounded-[30px] p-4 sm:p-6 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[24px]">
              {/* Left: Video thumbnail */}
              <a
                href="https://www.youtube.com/watch?v=PW32owq7ZTg"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block"
              >
                <div className="relative aspect-video lg:aspect-auto lg:h-full w-full overflow-hidden bg-black">
                  <ImagePlaceholder
                    label="Pohewala storefront at night"
                    aspectRatio="aspect-video lg:aspect-auto"
                    imageSrc="/images/store.jpg"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 text-black ml-1" />
                    </div>
                  </div>
                </div>
              </a>

              {/* Right: Yellow enquiry form box */}
              <div className="bg-[#FCEE57] p-6 sm:p-10">
                {submitted ? (
                  <div className="py-12 flex flex-col items-center text-center space-y-3">
                    <CheckCircle2 className="w-16 h-16 text-green-600 animate-bounce" />
                    <h3 className="text-2xl font-bold text-black font-serif">Thank You!</h3>
                    <p className="text-sm text-[#666666] font-medium max-w-xs">
                      Your enquiry has been received. The Pohewala franchise team will get back to
                      you shortly!
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
                      <Label htmlFor="p-name">Name</Label>
                      <input
                        id="p-name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <Label htmlFor="p-phone">Phone</Label>
                      <input
                        id="p-phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <Label htmlFor="p-email">Email</Label>
                      <input
                        id="p-email"
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <Label htmlFor="p-datetime">Date/Time</Label>
                      <input
                        id="p-datetime"
                        type="datetime-local"
                        required
                        value={formData.datetime}
                        onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
                        className={`${inputClass} text-black`}
                      />
                    </div>

                    <div>
                      <Label htmlFor="p-city">City</Label>
                      <input
                        id="p-city"
                        type="text"
                        required
                        placeholder="e.g. Nagpur, Pune, Bengaluru"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={inputClass}
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
            </div>
          </div>
        </div>
      </Reveal>

      {/* 3. FRANCHISE MODELS HEADING */}
      <Reveal className="text-center px-4 space-y-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif">
          Franchise Models
        </h2>
        <div className="w-16 h-1.5 bg-[#FCEE57] rounded-full mx-auto" />
      </Reveal>

      {/* 4. MODEL BLOCKS */}
      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Block 1 — QSR Model (image left) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="rounded-[24px] border-[3px] border-[#FCEE57] overflow-hidden shadow-2xl">
            <ImagePlaceholder
              label="QSR cafe interior with seating"
              aspectRatio="aspect-[4/3]"
              imageSrc="/images/gallery2.jpg"
              className="w-full"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-[#FCEE57] font-serif">
              QSR Model (Quick Service Restaurant)
            </h3>
            <p className="text-white leading-[1.6] font-medium">
              Perfect for high-footfall areas like college zones, IT parks, shopping complexes, and
              busy streets.
            </p>
            <p className="text-white font-bold">Space Required: 300 &ndash; 400 sq. ft.</p>
            <p className="text-white font-bold">Menu Includes:</p>
            <BulletList
              items={[
                "Poha varieties",
                "Snacks",
                "Maggie",
                "Paratha",
                "Fries",
                "Tea, Coffee & Shakes",
                "& many more...",
              ]}
            />
            <Tagline />
          </div>
        </div>

        {/* Block 2 — Sports Cafe (image right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 lg:order-1">
            <h3 className="text-2xl sm:text-3xl font-black text-[#FCEE57] font-serif">
              Pohewala Sports Cafe
            </h3>
            <p className="text-white leading-[1.6] font-medium">
              Ideal for youth-centric areas, malls, and premium localities where customers enjoy
              both food and entertainment.
            </p>
            <p className="text-white font-bold">Space Required: 1500 &ndash; 2000 sq. ft.</p>
            <p className="text-white font-bold">
              Concept: <span className="text-white font-medium">A unique combination of food and fun!</span>
            </p>
            <p className="text-white font-bold">
              Menu Includes:{" "}
              <span className="text-white font-medium">Same as QSR Menu + Entertainment Zone</span>
            </p>
            <p className="text-white font-bold">Entertainment Zone:</p>
            <BulletList items={["Snooker", "8 Ball Pool", "PlayStation 5 Gaming Zone", "& many more..."]} />
            <Tagline />
          </div>
          <div className="rounded-[24px] overflow-hidden shadow-xl lg:order-2">
            <ImagePlaceholder
              label="Sports cafe gaming and pool lounge"
              aspectRatio="aspect-[4/3]"
              imageSrc="/images/Blogs/blog.jpg"
              className="w-full"
            />
          </div>
        </div>

        {/* Block 3 — Signature Store (image left) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="rounded-[24px] border-[3px] border-[#FCEE57] overflow-hidden shadow-2xl">
            <ImagePlaceholder
              label="Signature store dine-in seating area"
              aspectRatio="aspect-[4/3]"
              imageSrc="/images/store.jpg"
              className="w-full"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-[#FCEE57] font-serif">
              Signature Store
            </h3>
            <p className="text-white leading-[1.6] font-medium">
              Best suited for family-friendly areas and city centers where customers prefer a
              complete dining experience.
            </p>
            <p className="text-white font-bold">Space Required: 1000 sq. ft.</p>
            <p className="text-white font-bold">Menu Includes:</p>
            <BulletList
              items={["Complete QSR Menu", "Exclusive Main Course Thalis &ndash; Maharashtrian"]}
            />
            <Tagline />
          </div>
        </div>
      </Reveal>

      {/* 5. WHY PARTNER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#000000] to-[#000000] py-20">
        {/* Diagonal yellow swoosh from bottom-right */}
        <div
          aria-hidden
          className="absolute -bottom-6 -right-2 w-[520px] h-19 bg-[#FCEE57]/25 rounded-full rotate-[-30deg] pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute -bottom-20 -right-12 w-[220px] h-32 bg-[#FCEE57]/25 rounded-full rotate-[-30deg] pointer-events-none"
        />

        <Reveal className="relative max-w-[900px] mx-auto px-4 sm:px-10 lg:px-8 space-y-5">
          <h2 className="text-[#FCEE57] font-black uppercase tracking-widest text-sm sm:text-base">
            Pohewala : The Renowned QS Restaurant
          </h2>
          <p className="text-white/90 leading-[1.6] font-medium">
            Poha has always won the hearts of people in India. Each region has its own type,
            preference and toppings to go with it. The thinking behind Pohewala was to introduce
            this humble dish that is full of nutrition and easily fills up. The restaurant offers
            low calorie, pocket-friendly &amp; and an enviable array of mouth-watering Poha
            delicacies.
          </p>

          <h3 className="pt-4 text-2xl sm:text-3xl font-black text-[#FCEE57] font-serif">
            Why Partner with Pohewala?
          </h3>
          <ul className="list-disc pl-5 marker:text-[#FCEE57]/70 space-y-2.5 leading-[1.6]">
            {[
              ["Trusted Brand", "Known for authentic taste & quality."],
              ["Proven Business Model", "High returns with affordable investment."],
              ["Training & Support", "End-to-end assistance in setup, staff training, and marketing."],
              ["Diverse Menu", "Street food, cafe items, and thalis under one roof."],
              ["Scalable Opportunity", "Models for every budget and market size."],
            ].map(([lead, rest]) => (
              <li key={lead} className="text-white font-medium">
                <span className="font-bold">{lead}:</span> {rest}
              </li>
            ))}
          </ul>

          <h3 className="pt-4 text-2xl sm:text-3xl font-black text-[#FCEE57] font-serif">
            Investment &amp; Returns
          </h3>
          <BulletList
            items={["Low investment, high ROI", "24/7 franchise support", "Attractive payback period"]}
          />

          <p className="pt-3 text-white font-bold text-lg">
            Grab the lucrative franchise opportunity to start a business in the fast-growing F&amp;B
            sector.
          </p>
        </Reveal>
      </section>

      {/* 6. CTA */}
      <CTASection />
    </div>
  );
}
