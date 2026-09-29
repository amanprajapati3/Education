"use client";

import React, { useState } from "react";
import BannerPage from "../../shared/BannerPage";
import { site, EducationEnquiryFeatureIcon, EducationEnquiryContactIcon } from "@/data";
import { 
  GraduationCap, 
  FileText, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight 
} from "lucide-react";

const AQUA = "#19C2A1";

// them has to be handled here.
const featureIconMap: Record<EducationEnquiryFeatureIcon, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-6 sm:w-9 sm:h-9 h-6 text-blue-950" />,
  FileText: <FileText className="w-6 sm:w-9 sm:h-9 h-6 text-blue-950" />,
  Users: <Users className="w-6 sm:w-9 sm:h-9 h-6 text-blue-950" />,
};

const contactIconMap: Record<EducationEnquiryContactIcon, React.ReactNode> = {
  Phone: <Phone className="w-6 sm:w-9 sm:h-9 h-6 text-white"  />,
  Mail: <Mail className="w-6 sm:w-9 sm:h-9 h-6 text-white"  />,
  MapPin: <MapPin className="w-6 sm:w-9 sm:h-9 h-6 text-white"  />,
};

export default function Enquiry() {
  const enquiryData = site.enquiry;
  const { banner, getInTouch, form, bottomContactCards } = enquiryData;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryFor: "",
    course: "",
    location: "",
    message: "",
    agree: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please agree to be contacted by Edusity.");
      return;
    }
    alert("Enquiry submitted successfully!");
  };

  return (
    <main className="min-h-screen bg-slate-50/40  overflow-hidden">
      {/* Banner Section */}
      <BannerPage
        title={banner.title}
        home={banner.home}
        current={banner.current}
        bgImage={banner.bgImage}
      />

      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* TOP SECTION: Get In Touch & Enquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Get In Touch & 3 Feature Rows */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
                <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
                  {getInTouch.badge}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                {getInTouch.title.normal}{" "}
                <span style={{ color: AQUA }}>{getInTouch.title.highlighted}</span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {getInTouch.desc}
              </p>
            </div>

            {/* 3 Feature Rows */}
            <div className="space-y-6 pt-2">
              {getInTouch.features.map((feature) => (
                <div key={feature.id} className="flex items-start gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-50 flex items-center justify-center shrink-0 shadow-sm border border-emerald-100/50">
                    {featureIconMap[feature.icon as EducationEnquiryFeatureIcon]}
                  </div>
                  <div className="space-y-1 pt-1">
                    <h4 className="font-bold text-blue-900 text-lg">
                      {feature.title}
                    </h4>
                    <p className="text-slate-900 text-base">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Enquiry Form Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-4 shadow-sm  relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-2">
              <h3 className="text-2xl font-bold text-slate-900">
                {form.title}
                <div className="w-16 mt-4 h-[2px] rounded-full bg-emerald-400"></div>

              </h3>
              <span className="text-sm text-rose-500 font-medium">
                {form.requiredText}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold tracking-wider text-blue-700">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold tracking-wider text-blue-700">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Phone Number & Enquiry For */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold tracking-wider text-blue-700">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold tracking-wider text-blue-700">
                    Enquiry For <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.enquiryFor}
                    onChange={(e) => setFormData({ ...formData, enquiryFor: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] transition-all"
                  >
                    <option value="">Select Option</option>
                    <option value="admission">Admission</option>
                    <option value="courses">Courses</option>
                    <option value="facilities">Campus Facilities</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Course & Preferred Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold tracking-wider text-blue-700">
                    Course / Program of Interest
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] transition-all"
                  >
                    <option value="">Select Course</option>
                    <option value="ug">Undergraduate Programs</option>
                    <option value="pg">Postgraduate Programs</option>
                    <option value="diploma">Diploma Courses</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold tracking-wider text-blue-700">
                    Preferred Location
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] transition-all"
                  >
                    <option value="">Select Location</option>
                    <option value="delhi">New Delhi Campus</option>
                    <option value="noida">Noida Campus</option>
                    <option value="mumbai">Mumbai Campus</option>
                  </select>
                </div>
              </div>

              {/* Your Message */}
              <div className="space-y-1">
                <label className="block text-sm font-bold tracking-wider text-blue-700">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your query..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] transition-all resize-none"
                ></textarea>
              </div>

              {/* Checkbox agreement */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="agree"
                  required
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-[#19C2A1] focus:ring-[#19C2A1]"
                />
                <label htmlFor="agree" className="text-xs text-slate-600 font-medium">
                  {form.checkboxText}
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl text-white font-bold text-base shadow-lg transition-all hover:opacity-95 flex items-center justify-center gap-2"
                style={{ backgroundColor: AQUA }}
              >
                <span>{form.buttonText}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM SECTION: 3-Column Contact Info Banner Card */}
        <div className="bg-blue-50 rounded-3xl  py-5 px-10 shadow-sm  border-slate-100  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {bottomContactCards.map((card, idx) => (
            <div key={card.id} className={`flex border-r-2 last:border-r-0 border-gray-300 gap-5 ${idx !== 0 ? 'pt-6 md:pt-0' : ''}`}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-sm border border-emerald-100/50">
                {contactIconMap[card.icon as EducationEnquiryContactIcon]}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  {card.title}
                </h4>
                <p className="font-bold text-blue-950 font-semibold text-base sm:text-lg">
                  {card.info}
                </p>
                <p className="text-sm font-semibold text-blue-500">
                  {card.subInfo}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}