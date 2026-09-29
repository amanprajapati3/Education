"use client";

import React, { useState } from "react";
import Image from "next/image";
import BannerPage from "../../shared/BannerPage";
import { site, EducationApplyFeatureIcon, EducationApplyContactIcon } from "@/data";
import { 
  GraduationCap, 
  ShieldCheck, 
  Clock, 
  Users, 
  FileText,
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Upload, 
  X, 
  Quote 
} from "lucide-react";
import { IoIosSend } from "react-icons/io";


const AQUA = "#19C2A1";
const DARK_BLUE = "#0A2540";

// Icon mapping helpers. Keyed by the education unions so a new icon added to
// them has to be handled here.
const featureIconMap: Record<EducationApplyFeatureIcon, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-8 h-8 md:w-12 md:h-12 text-blue-950"  />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-blue-950" />,
  Clock: <Clock className="w-8 h-8 md:w-12 md:h-12 text-blue-950" />,
  Users: <Users className="w-8 h-8 md:w-12 md:h-12 text-blue-950" />,
};

const contactIconMap: Record<EducationApplyContactIcon, React.ReactNode> = {
  Phone: <Phone className="w-7 h-7 text-white"  />,
  Mail: <Mail className="w-7 h-7 text-white" />,
  MapPin: <MapPin className="w-7 h-7 text-white" />,
};

export default function Apply() {
  const applyData = site.apply;
  const { banner, admissionFormIntro, needHelp, form } = applyData;

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    nationality: "",
    email: "",
    phone: "",
    altPhone: "",
    address: "",
    course: "",
    program: "",
    year: "",
    qualification: "",
    hearAbout: "",
    message: "",
    agree: false
  });

  // File upload state with cross button logic
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }
    alert("Application submitted successfully!");
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

      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
        
        {/* MAIN GRID SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Intro, 4 Feature Cards, Student Transparent Image, Need Help Box */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Header intro & features */}
            <div className="space-y-0">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
                <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
                  {admissionFormIntro.badge}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-6xl max-w-[400px] font-bold text-slate-900 tracking-tight leading-tight">
                {admissionFormIntro.title.normal}{" "}
                <span style={{ color: AQUA }}>{admissionFormIntro.title.highlighted}</span>
              </h2>

              <p className="text-slate-600 text-base max-w-[500px] sm:text-lg leading-relaxed">
                {admissionFormIntro.desc}
              </p>

              {/* 4 Feature Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {admissionFormIntro.features.map((feat) => (
                  <div key={feat.id} className=" space-y-2 md:px-5 flex flex-col justify-center md:border-r-1 border-gray-200 mt-5 last:border-transparent">
                    <div className="flex w-12 h-12 md:w-20 md:h-20 bg-blue-50 rounded-full items-center justify-center">
                      {featureIconMap[feat.icon as EducationApplyFeatureIcon]}
                    </div>
                    <h4 className="font-bold sm:text-lg  min-h-14 text-center text-blue-900 text-base">
                      {feat.title}
                    </h4>
                    <p className="text-slate-800  min-h-14 text-center text-sm">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Transparent Image with Quote Overlay Card */}
            <div className="relative flex justify-center">
              <div className="relative w-full h-[380px]">
                <Image
                  src={admissionFormIntro.studentImage}
                  alt="Student"
                  fill
                  className="object-contain object-bottom"
                />
                
                {/* Floating Quote Card */}
                <div className="absolute bottom-6 left-6 bg-[#0A2540] text-white p-5 rounded-2xl shadow-xl max-w-[200px] space-y-2 border border-slate-700">
                  <Quote className="w-6 h-6 text-[#19C2A1]" />
                  <p className="font-bold text-base sm:text-2xl ">
                    {admissionFormIntro.quote}
                  </p>
                </div>
              </div>
            </div>

            {/* Need Help? Section Card */}
            <div className="bg-blue-50 flex p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
              <div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-blue-900">
                  {needHelp.title}
                </h3>
                <p className="text-slate-600 text-base">
                  {needHelp.desc}
                </p>
              </div>

              <div className="space-y-4 pt-4">
                {needHelp.contacts.map((contact) => (
                  <div key={contact.icon} className="flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-950 shadow-lg flex items-center justify-center shrink-0 mt-0.5">
                      {contactIconMap[contact.icon as EducationApplyContactIcon]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-base sm:text-lg">
                        {contact.info}
                      </p>
                      {contact.sub && (
                        <p className="text-sm text-slate-700">
                          {contact.sub}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              </div>

              <div className=" border-slate-100 hidden sm:flex border-r-2 md:ml-14 item-center mt-[20%] flex-col  ">
               <div className=" rounded-xl  flex items-center justify-center">
                  <IoIosSend  className="w-9 sm:w-14 sm:h-14 h-9 text-blue-950"  />
                </div>
                <span className="font-bold text-base sm:text-xl" style={{ color: DARK_BLUE }}>
                  {needHelp.actionText}
                </span>
                
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Online Admission Form */}
          <div className="lg:col-span-6 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden">
            
            {/* Form Top Dark Banner Header */}
            <div className="p-6 text-white flex items-center justify-between" style={{ backgroundColor: DARK_BLUE }}>
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-4xl font-bold">
                  {form.title}
                </h3>
                <p className="text-slate-100 text-sm sm:text-base">
                  {form.subtitle}
                </p>
              </div>
              <GraduationCap className="w-12 h-12 text-[#eef3f2] hidden sm:block shrink-0" />
            </div>

            <form onSubmit={handleSubmit} className="py-4 px-6 space-y-4">
              
              {/* SECTION 1: Personal Information */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    <Users className="w-8 h-8 text-[#075bd8]" />
                    <span>{form.sections.personal}</span>
                  </h4>
                  <span className="text-sm text-slate-400">Please fill in your personal details.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-base font-bold tracking-wider text-blue-900">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-base font-bold tracking-wider text-blue-900">
                      Date of Birth <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-base font-bold tracking-wider text-blue-900">
                      Gender <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1]"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-base font-bold tracking-wider text-blue-900">
                      Nationality <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1]"
                    >
                      <option value="">Select Nationality</option>
                      <option value="indian">Indian</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-base font-bold tracking-wider text-blue-900">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-base font-bold tracking-wider text-blue-900">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1">
                    <label className="block text-base font-bold tracking-wider text-blue-900">
                      Alternate Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter alternate phone number"
                      value={formData.altPhone}
                      onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-base font-bold tracking-wider text-blue-900">
                      Address <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Academic Information */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    <GraduationCap className="w-8 h-8 text-[#0d7fe9]" />
                    <span>{form.sections.academic}</span>
                  </h4>
                  <span className="text-sm text-slate-400">Tell us about your academic background.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1 ">
                    <label className="block text-base font-bold tracking-wider text-blue-900">
                      Select Course <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1]"
                    >
                      <option value="">Select Course</option>
                      <option value="btech">B.Tech Computer Science</option>
                      <option value="mba">MBA Business Analytics</option>
                      <option value="bca">BCA Information Technology</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-base font-bold tracking-wider text-blue-900">
                      Select Program <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1]"
                    >
                      <option value="">Select Program</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="postgraduate">Postgraduate</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-base font-bold tracking-wider text-blue-900">
                      Year of Admission <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1]"
                    >
                      <option value="">Select Year</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-base font-bold tracking-wider text-blue-900">
                      Last Qualification <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1]"
                    >
                      <option value="">Select Qualification</option>
                      <option value="12th">12th Grade</option>
                      <option value="bachelor">Bachelor&apos;s Degree</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Additional Information (Resume / Document Upload with cross button logic) */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-blue-950 text-lg flex items-center gap-2">
                    <FileText className="w-8 h-8 text-[#0983e7]" />
                    <span>{form.sections.additional}</span>
                  </h4>
                  <span className="text-sm text-slate-400">Upload required documents.</span>
                </div>

                <div className="space-y-1   ">
                  <label className="block text-base font-bold tracking-wider text-blue-900">
                    Upload Documents (Resume / Certificate)
                  </label>
                  
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-slate-500" />
                      <span>Choose Files</span>
                      <input 
                        type="file" 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept=".pdf,.jpg,.png,.doc,.docx"
                      />
                    </label>

                    {uploadedFile ? (
                      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs text-emerald-800 font-medium">
                        <span className="truncate max-w-[180px]">{uploadedFile.name}</span>
                        <button 
                          type="button" 
                          onClick={removeFile}
                          className="p-0.5 hover:bg-emerald-200 rounded-full transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">No file chosen</span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-base font-bold tracking-wider text-blue-900">
                    How did you hear about us?
                  </label>
                  <select
                    value={formData.hearAbout}
                    onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1]"
                  >
                    <option value="">Select Option</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend / Family</option>
                    <option value="google">Google Search</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-base font-bold tracking-wider text-blue-900">
                    Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write any additional information here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#19C2A1]/30 focus:border-[#19C2A1] resize-none"
                  ></textarea>
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="agreeTerm"
                    required
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-[#19C2A1] focus:ring-[#19C2A1]"
                  />
                  <label htmlFor="agreeTerm" className="text-xs text-slate-600 font-medium">
                    I agree to the <a href="/terms" className="text-[#19C2A1] underline cursor-pointer">Terms & Conditions</a> and <a href="/privacy" className="text-[#19C2A1] underline cursor-pointer">Privacy Policy</a>.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl text-white font-bold text-base shadow-lg transition-all hover:opacity-95 flex items-center justify-center gap-2"
                style={{ backgroundColor: DARK_BLUE }}
              >
                <span>{form.buttonText}</span>
                <ArrowRight className="w-5 h-5 text-[#19C2A1]" />
              </button>
            </form>

          </div>

        </div>

      </section>
    </main>
  );
}