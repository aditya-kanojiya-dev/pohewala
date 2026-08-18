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

export default function TermsPage() {
  return (
    <div>
      {/* 1. PAGE TITLE BANNER */}
      <section className="bg-[#FCEE57] text-black py-14 sm:py-16 px-4 text-center space-y-4">
        <Reveal>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-serif">
            Terms &amp; Conditions
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-[#666666] text-sm sm:text-base font-medium max-w-[700px] mx-auto leading-relaxed">
            In a city like Nagpur, where mornings start with the aroma of tarri poha, two young minds
            decided to turn this everyday dish into something extraordinary.
          </p>
        </Reveal>
      </section>

      {/* 2. TERMS CONTENT BODY */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white leading-[1.7]">
            Welcome to Pohewala! By accessing or using our website and services, you agree to comply
            with and be bound by the following terms and conditions. Please read them carefully.
          </p>

          <Section number="1" title="Acceptance of Terms">
            <Body>
              By accessing or using our website, placing an order, or interacting with our services,
              you agree to be bound by these Terms and Conditions. If you do not agree with any part
              of these terms, please discontinue the use of our services.
            </Body>
          </Section>

          <Section number="2" title="Use of Services">
            <Body>
              You agree to use our website and services for lawful purposes only. You must not use
              the site in any way that could damage, disable, or impair its functionality, or
              interfere with other users&apos; access to our services.
            </Body>
          </Section>

          <Section number="3" title="Ordering and Payment">
            <BulletList
              items={[
                [
                  "Order Acceptance",
                  "all orders are subject to acceptance. We reserve the right to refuse or cancel any order at our discretion.",
                ],
                [
                  "Pricing",
                  "prices are subject to change at any time. We strive for accuracy, but errors may occur.",
                ],
                [
                  "Payment",
                  "accurate and complete payment information is required. Accepted payment methods are displayed at checkout.",
                ],
              ]}
            />
          </Section>

          <Section number="4" title="Delivery">
            <BulletList
              items={[
                [
                  "Delivery Time",
                  "delivery estimates are provided as a guide and we are not responsible for external delays beyond our control.",
                ],
                [
                  "Delivery Area",
                  "delivery is available only within specific areas. Please check our website or contact us for availability.",
                ],
              ]}
            />
          </Section>

          <Section number="5" title="Cancellations and Refunds">
            <BulletList
              items={[
                [
                  "Cancellations",
                  "orders may be cancelled within a certain time frame. Please refer to our cancellation policy for details.",
                ],
                [
                  "Refunds",
                  "refunds are issued at our discretion. Please contact us to request a refund.",
                ],
              ]}
            />
          </Section>

          <Section number="6" title="Intellectual Property">
            <Body>
              All content on this website, including text, images, logos, and branding, is the
              property of Pohewala. Reproduction or distribution of any content without prior
              written permission is strictly prohibited.
            </Body>
          </Section>

          <Section number="7" title="Limitation of Liability">
            <Body>
              Pohewala shall not be liable for any direct, indirect, incidental, or consequential
              damages arising from the use of our website or services, including but not limited to
              loss of data, revenue, or profits.
            </Body>
          </Section>

          <Section number="8" title="Changes to Terms">
            <Body>
              We may update these Terms and Conditions from time to time. Any changes will be posted
              on this page with a new effective date. It is your responsibility to review these
              terms periodically for updates.
            </Body>
          </Section>

          <Section number="9" title="Governing Law">
            <Body>
              These terms are governed by the laws of India. Any disputes arising from the use of
              our services shall be subject to the exclusive jurisdiction of the courts in Nagpur,
              Maharashtra.
            </Body>
          </Section>

          <Section number="10" title="Contact Us">
            <Body>
              If you have any questions about these Terms and Conditions, please reach out to us.
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
