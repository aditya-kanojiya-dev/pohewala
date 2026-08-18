import React from "react";
import { CTASection } from "@/components/cta/CTASection";
import { Reveal } from "@/components/shared/Reveal";

const Section = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <Reveal className="mt-9">
    <h2 className="text-xl sm:text-2xl font-bold text-[#FCEE57]">
      {number}. {title}
    </h2>
    <div className="mt-3 space-y-3">{children}</div>
  </Reveal>
);

const BulletList = ({ items }: { items: Array<[string, string]> }) => (
  <ul className="list-disc pl-5 marker:text-[#FCEE57]/70 space-y-2.5">
    {items.map(([lead, rest]) => (
      <li key={lead} className="leading-[1.7]">
        <span className="font-bold text-white">{lead}:</span>{" "}
        <span className="text-white">{rest}</span>
      </li>
    ))}
  </ul>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="text-white leading-[1.7]">{children}</p>
);

export default function PrivacyPage() {
  return (
    <div>
      {/* 1. PAGE TITLE BANNER */}
      <section className="bg-[#FCEE57] text-black py-14 sm:py-16 px-4 text-center space-y-4">
        <Reveal>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-serif">
            Privacy Policy
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-[#666666] text-sm sm:text-base font-medium max-w-[700px] mx-auto leading-relaxed">
            In a city like Nagpur, where mornings start with the aroma of tarri poha, two young minds
            decided to turn this everyday dish into something extraordinary.
          </p>
        </Reveal>
      </section>

      {/* 2. POLICY CONTENT BODY */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white leading-[1.7]">
            At Pohewala, your privacy is important to us. This Privacy Policy outlines the types of
            information we collect, how we use it, and the measures we take to protect it.
          </p>

          <Section number="1" title="Information We Collect">
            <Body>
              We collect information to provide and improve our services. The types of information
              we may collect include:
            </Body>
            <BulletList
              items={[
                ["Personal Information", "name, email, phone, delivery address"],
                ["Payment Information", "card number, expiration, billing address"],
                ["Usage Data", "IP address, browser type, pages visited"],
              ]}
            />
          </Section>

          <Section number="2" title="How We Use Your Information">
            <Body>We use the information we collect for the following purposes:</Body>
            <BulletList
              items={[
                ["Provide and manage services", "to process orders and deliver our products"],
                [
                  "Improve website/products/services",
                  "to enhance your experience and our offerings",
                ],
                [
                  "Communicate regarding orders/updates/offers",
                  "to keep you informed about your orders and promotional updates",
                ],
                [
                  "Ensure security and prevent fraud",
                  "to protect your data and our platform",
                ],
              ]}
            />
          </Section>

          <Section number="3" title="Sharing Your Information">
            <Body>
              We do not sell or share your personal information with third parties, except in the
              following cases:
            </Body>
            <BulletList
              items={[
                ["Service Providers", "payment processors, delivery services"],
                ["Legal Requirements", "disclosure if required by law"],
              ]}
            />
          </Section>

          <Section number="4" title="Cookies and Tracking Technologies">
            <Body>
              Pohewala uses cookies and similar tracking technologies to enhance your browsing
              experience, remember your preferences, and understand how our website is used. You can
              manage your cookie preferences through your browser settings, including the ability to
              block or delete cookies at any time.
            </Body>
          </Section>

          <Section number="5" title="Data Security">
            <Body>
              We implement industry-standard security measures to safeguard your personal
              information against unauthorized access, alteration, disclosure, or destruction.
              However, please note that no method of transmission over the internet or method of
              electronic storage is 100% secure, and we cannot guarantee absolute security.
            </Body>
          </Section>

          <Section number="6" title="Your Rights">
            <Body>You have the right to:</Body>
            <BulletList
              items={[
                ["Access personal information", "request a copy of the data we hold about you"],
                ["Request corrections", "ask us to update inaccurate or incomplete information"],
                [
                  "Request deletion",
                  "subject to legal obligations, request removal of your data",
                ],
              ]}
            />
          </Section>

          <Section number="7" title="Changes to This Policy">
            <Body>
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated effective date. We encourage you to review this policy
              periodically to stay informed about how we protect your information.
            </Body>
          </Section>

          <Section number="8" title="Contact Us">
            <Body>
              If you have any questions or concerns about this Privacy Policy or how we handle your
              information, please reach out to us.
            </Body>
            <div className="pt-1 space-y-1.5 text-white leading-[1.7]">
              <p>Contact us at:</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:Pohewalacare@gmail.com"
                  className="text-[#FCEE57] underline font-medium hover:text-white transition"
                >
                  Pohewalacare@gmail.com
                </a>
              </p>
              <p>Phone: +91-9923000480</p>
              <p>Address: 4th Floor, Guruprasad Apartment, Taj Nagar, near Tukdogi Putla Square, Nagpur-440027, Maharashtra.</p>
            </div>
          </Section>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
