"use client"

import React, { useState } from "react";
import { site, SectionProps, EducationCtaBannerData } from "@/data";
import { Play, ArrowRight, GraduationCap, X } from "lucide-react";

export default function JourneySection({
  data = site.ctaBanner,
  className = "",
  contentClassName = "",
}: SectionProps<EducationCtaBannerData>) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const badge = data?.badge || "Start Your Journey Today";
  const titleNormal = data?.title?.normal || "Build New Skills";
  const titleHighlighted =
    data?.title?.highlighted || "For a Brighter Tomorrow";
  const desc =
    data?.desc ||
    "Join thousands of learners who are gaining in-demand skills, learning from expert educators, and achieving their career goals with our flexible and affordable courses.";
  const buttons = data?.buttons || [
    { label: "Get Started Now", href: "/apply", variant: "primary" },
    { label: "Watch Our Video", href: "#", icon: "play", variant: "outline" },
  ];
  const imageSrc = data?.image?.src || "/education/9.jpg";
  const imageAlt =
    data?.image?.alt ||
    "Group of students smiling together while working on a laptop";
  const handwrittenNote = data?.handwrittenNote || "Learn Grow Succeed";
  const floatingBadge = data?.floatingBadge || {
    icon: "rocket",
    label: "Your Future Starts Here",
  };
  const videoUrl = data?.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ";

  // Helper function to render any video type (YouTube, Vimeo, or direct MP4 files)
  const renderVideoPlayer = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com") || url.includes("embed")) {
      return (
        <iframe
          src={url}
          title="Video Player"
          className="w-full h-full rounded-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    } else {
      return (
        <video src={url} controls autoPlay className="w-full h-full rounded-2xl object-cover">
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <section
      className={`py-8 md:py-12 bg-[#f8fafc] relative overflow-hidden ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${contentClassName}`}
      >
        {/* Main Card Wrapper */}
        <div className="bg-white rounded-[1rem] shadow-xl border border-slate-100 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 ">
            {/* Left Side Content */}
            <div className="lg:col-span-6 sm:p-6 p-3">
              {/* Badge */}
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-0.5 hidden sm:inline-block bg-emerald-500 "></span>
                <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
                  {badge}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-[2.7rem] font-bold text-slate-900 mb-3 tracking-tight">
                {titleNormal}{" "}
                <span className="text-emerald-600 block sm:inline">
                  {titleHighlighted}
                </span>
              </h2>

              {/* Description */}
              <p className="text-slate-600 text-base  leading-relaxed">
                {desc}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {buttons.map((btn, idx) => {
                  if (btn.variant === "primary") {
                    return (
                      <a
                        key={idx}
                        href={btn.href}
                        className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-4 rounded-xl font-semibold shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
                      >
                        <span>{btn.label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    );
                  } else {
                    return (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsVideoOpen(true);
                        }}
                        className="inline-flex items-center gap-3 bg-slate-50 hover:bg-slate-100 text-slate-900 px-6 py-4 rounded-xl font-semibold transition-all border border-slate-200 group cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                        <span>{btn.label}</span>
                      </button>
                    );
                  }
                })}
              </div>

              {/* Dot Grid Decoration */}
              <div className="pt-6 hidden sm:grid grid-cols-6 gap-2 w-fit opacity-40">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                  />
                ))}
              </div>
            </div>

            {/* Right Side Image with Custom Curved Border & Overlays */}
            <div className="lg:col-span-6 relative h-full min-h-[350px] flex items-center justify-end overflow-hidden bg-slate-900">
              {/* Curved Teal Border Divider using SVG */}
              <div className="absolute inset-y-0 left-0 w-28 lg:w-36 z-20 pointer-events-none hidden lg:block overflow-hidden">
                <svg
                  className="h-full w-full"
                  viewBox="0 0 100 500"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M100,0 C35,160 35,340 100,500 L0,500 L0,0 Z"
                    fill="#ffffff"
                  />
                  <path
                    d="M95,0 C30,160 30,340 95,500"
                    stroke="#0d9488"
                    strokeWidth="10"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Main Image */}
              <div className="absolute inset-0 lg:left-12 overflow-hidden">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
              </div>

              {/* Top Right Handwritten Note */}
              <div className="absolute max-w-[80px] top-6 right-6 z-30 text-white font-handwritten text-2xl sm:text-3xl tracking-wide rotate-[-6deg] drop-shadow-lg">
                {handwrittenNote}
                <div className="w-24 h-1 bg-emerald-400 rounded-full mt-1 rotate-[-2deg]" />
              </div>

              {/* Bottom White Circle Behind Badge */}
              <div className="absolute -bottom-[45%] -right-28 z-20 w-72 h-72 rounded-full bg-green-50 shadow-2xl" />

              {/* Bottom Right Floating Badge */}
              <div className="absolute max-w-[180px] bottom-6 right-6 z-30 bg-white/95 backdrop-blur-md px-2 py-4 rounded-2xl shadow-2xl flex items-center gap-3.5 border border-white/20">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-base font-bold text-slate-900 block leading-tight">
                    {floatingBadge.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Dialog Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border border-white/10">
            <button
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video modal"
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            {renderVideoPlayer(videoUrl)}
          </div>
        </div>
      )}
    </section>
  );
}