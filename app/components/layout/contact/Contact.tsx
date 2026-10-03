"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BannerPage from "../../shared/BannerPage";
import { site, EducationContactIcon } from "@/data";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Star,
  Navigation,
} from "lucide-react";
import ScrollReveal from "../../shared/ScrollReveal";

const AQUA = "#19C2A1";

// that union has to be handled here.
const iconMap: Record<EducationContactIcon, React.ReactNode> = {
  Phone: <Phone className="w-6 md:w-8 md:h-8 h-6 text-blue-900" />,
  Mail: <Mail className="w-6 h-6 md:w-8 md:h-8 text-blue-900" />,
  MapPin: <MapPin className="w-6 h-6 md:w-8 md:h-8 text-blue-900" />,
  Clock: <Clock className="w-6 h-6 md:w-8 md:h-8 text-blue-900" />,
};

export default function Contact() {
  const contactData = site.contact;
  const { banner, getInTouch, form, location } = contactData;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <main className="min-h-screen bg-slate-50/40 pb-24 overflow-hidden">
      {/* Banner Section */}
      <BannerPage
        title={banner.title}
        home={banner.home}
        current={banner.current}
        bgImage={banner.bgImage}
      />

      <section className="pt-8 md:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
        {/* TOP SECTION: Contact Info & Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Get In Touch & 2x2 Info Cards */}
          <ScrollReveal
            as="div"
            className="lg:col-span-6 "
            direction="left"
            mobileDirection="up"
            distance={70}
            duration={0.8}
          >
            <div className="space-y-0">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-0.5 bg-emerald-400 inline-block"></span>
                <span className="text-emerald-400 font-bold text-sm tracking-widest uppercase">
                  {getInTouch.badge}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl pt-2 pb-3 font-bold text-slate-900 tracking-tight">
                {getInTouch.title.normal}{" "}
                <span style={{ color: AQUA }}>
                  {getInTouch.title.highlighted}
                </span>
              </h2>

              <p className="text-slate-600 text-base  leading-relaxed">
                {getInTouch.desc}
              </p>
            </div>

            {/* 2x2 Info Cards Grid */}
            <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 gap-4">
              {getInTouch.cards.map((card, cardIndex) => (
                <ScrollReveal
                  key={card.id}
                  as="div"
                  className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100 flex sm:justify-between gap-5 space-y-1 hover:shadow-md transition-all"
                  direction="up"
                  distance={34}
                  duration={0.6}
                  delay={0.05}
                  staggerChildren={0.08}
                  index={cardIndex}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-50 flex items-center justify-center shrink-0 shadow-sm">
                    {iconMap[card.icon as EducationContactIcon]}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold  text-blue-800 mb-0">
                      {card.title}
                    </h4>
                    <p className="font-bold text-blue-900 text-base ">
                      {card.info}
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {card.subInfo}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Column: Send Us a Message Form Card */}
          <ScrollReveal
            as="div"
            className="lg:col-span-6 bg-white rounded-3xl p-4 shadow-sm  relative"
            direction="right"
            mobileDirection="up"
            distance={70}
            duration={0.8}
            delay={0.1}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6  gap-2">
              <h3 className="text-2xl font-bold text-slate-900">
                {form.title}
                <div className="w-16 mt-2 h-[2px] rounded-full bg-emerald-400"></div>
              </h3>
              <span className="text-sm text-rose-500 font-medium">
                {form.requiredText}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold tracking-wider text-blue-700">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold tracking-wider text-blue-700">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold tracking-wider text-blue-700">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] transition-all"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold tracking-wider text-blue-700">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] transition-all"
                  >
                    <option value="">{form.subjectSelect.placeholder}</option>
                    {form.subjectSelect.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Your Message */}
              <div className="space-y-2">
                <label className="block text-sm font-bold tracking-wider text-blue-700">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your query..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="swp swp-grad w-full md:w-[60%] cursor-pointer  py-4 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2"
              >
                <span>{form.buttonText}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </ScrollReveal>
        </div>

        {/* BOTTOM SECTION: Find Us Here & Interactive Real Map */}
        <div className="grid grid-cols-1 mt-10 lg:grid-cols-12 gap-10 items-start pt-8 border-t border-slate-200">
          {/* Left Column: Location Info & Campus Photo Card */}
          <ScrollReveal
            as="div"
            className="lg:col-span-6 space-y-2"
            direction="left"
            mobileDirection="up"
            distance={70}
            duration={0.8}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-0.5 bg-blue-500 inline-block"></span>
                <span className="text-blue-500 font-bold text-sm tracking-widest uppercase">
                  {location.badge}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950 tracking-tight">
                {location.title.normal}{" "}
                <span style={{ color: AQUA }}>
                  {location.title.highlighted}
                </span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {location.desc}
              </p>
            </div>

            {/* Campus Image Card */}
            <ScrollReveal
              as="div"
              className="relative h-[280px] sm:h-[340px] rounded-3xl overflow-hidden shadow-md border border-slate-100 bg-white"
              direction="up"
              distance={40}
              duration={0.7}
            >
              <Image
                src={location.image}
                alt="Campus Location"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </ScrollReveal>
          </ScrollReveal>

          {/* Right Column: Interactive Real Google Map Preview Card */}
          <ScrollReveal
            as="div"
            className="lg:col-span-6 bg-white rounded-3xl shadow-sm  space-y-4"
            direction="right"
            mobileDirection="up"
            distance={70}
            duration={0.8}
            delay={0.1}
          >
            

            {/* Real Google Map Embed View */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden ">
              <iframe
                title="Google Maps Location"
                src={location.mapInfo.iframeUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
