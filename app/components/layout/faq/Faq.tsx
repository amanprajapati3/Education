"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BannerPage from "../../shared/BannerPage";
import { site, EducationFaqContactIcon } from "@/data";
import { Plus, Minus, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import ScrollReveal from "../../shared/ScrollReveal";

const AQUA = "#19C2A1";

const contactIconMap: Record<EducationFaqContactIcon, React.ReactNode> = {
  Phone: <Phone className="w-7 h-7 text-white"  />,
  Mail: <Mail className="w-7 h-7 text-white"  />,
  MapPin: <MapPin className="w-7 h-7 text-white"  />,
};

export default function Faq() {
  const faqData = site.faq;
  const { banner, badge, title, desc, faqs, sidebar } = faqData;

  // Set first item open by default matching design
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-slate-50/40 overflow-hidden">
      {/* Reusable Banner Page */}
      <BannerPage
        title={banner.title}
        home={banner.home}
        current={banner.current}
        bgImage={banner.bgImage}
      />

      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <ScrollReveal
          as="div"
          className=" max-w-3xl flex flex-col mb-8 space-y-0"
          direction="up"
          distance={40}
          duration={0.7}
        >
          <div className="inline-flex items-center  gap-3">
            <span className="w-8 h-0.5 bg-blue-500 inline-block"></span>
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">
              {badge}
            </span>
            <span className="w-8 h-0.5 bg-blue-500 inline-block"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold pt-2 pb-3 text-blue-950 tracking-tight">
            {title.normal}{" "}
            <span style={{ color: AQUA }}>{title.highlighted}</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {desc}
          </p>
        </ScrollReveal>

        {/* Main Content Layout: 2 Columns on Desktop, Stacked on Mobile/Tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
          {/* Left Column: FAQ Accordion (Span 2) */}
          <ScrollReveal
            as="div"
            className="lg:col-span-2 space-y-2"
            direction="left"
            mobileDirection="up"
            distance={60}
            duration={0.8}
          >
            {faqs.map((item, itemIndex) => {
              const isOpen = openId === item.id;
              return (
                <ScrollReveal
                  key={item.id}
                  as="div"
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-sky-50/70 border-sky-200/80 shadow-sm"
                      : "bg-white border-slate-100 hover:border-slate-200 shadow-sm"
                  }`}
                  direction="up"
                  distance={28}
                  duration={0.55}
                  delay={0.04}
                  staggerChildren={0.06}
                  index={itemIndex}
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full flex  items-center justify-between p-2 text-left cursor-pointer"
                  >
                    <div className="flex  gap-4">
                      {/* Number Pill */}
                      <span className="w-10 h-10 rounded-full bg-sky-100 text-[#0A2540] font-black text-sm flex items-center justify-center shrink-0 shadow-inner">
                        {item.number}
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="text-base  font-bold text-slate-900">
                          {item.question}
                        </span>
                        {/* Accordion Answer Body */}
                        {isOpen && (
                          <div className="pr-5 text-slate-600 text-sm leading-relaxed">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Toggle Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#0A2540] text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </ScrollReveal>

          {/* Right Column: Sidebar (Promo Card & Contact Box) */}
          <ScrollReveal
            as="div"
            className="lg:col-span-1 space-y-4"
            direction="right"
            mobileDirection="up"
            distance={60}
            duration={0.8}
            delay={0.1}
          >
            {/* Top Promo Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-md h-[440px] sm:h-[580px] flex flex-col justify-end p-6 sm:p-8">
              {/* Background Image */}
              <Image
                src={sidebar.promoCard.image}
                alt={sidebar.promoCard.title}
                fill
                sizes="(min-width: 1280px) 365px, (min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Top Tag */}
              <div className="absolute top-6 left-6 font-bold max-w-[80px] -rotate-12 text-blue-950 font-handwritten text-3xl">
                {sidebar.promoCard.tag}
              </div>

              {/* Bottom White Card Overlay */}
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-5 md:w-[65%] shadow-lg space-y-4">
                <h3 className="text-2xl font-bold text-blue-950 leading-snug">
                  {sidebar.promoCard.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {sidebar.promoCard.desc}
                </p>
                <Link
                  href={sidebar.promoCard.buttonLink}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl text-white font-bold text-sm shadow-md transition-all hover:opacity-90"
                  style={{ backgroundColor: AQUA }}
                >
                  <span>{sidebar.promoCard.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Get in Touch Box */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-xl font-bold text-blue-900 ">
                {sidebar.contactBox.title}
              </h3>
              <div className="w-12 h-[3px] rounded-full bg-emerald-400"></div>

              <div className="space-y-6">
                {sidebar.contactBox.contacts.map((contact, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 md:w-16 md:h-16 h-12 rounded-full bg-gradient-to-r from-blue-700 via-emerald-700 to-emerald-500 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      {contactIconMap[
                        contact.icon as EducationFaqContactIcon
                      ] ?? contactIconMap.Phone}
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                        {contact.label}
                      </span>
                      <div className="text-blue-950 font-extrabold text-base">
                        {contact.value}
                      </div>
                      <div className="text-blue-800 text-xs font-medium">
                        {contact.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
