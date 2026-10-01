import React from "react";
import Image from "next/image";
import { site, SectionProps, EducationChooseData } from "@/data";
import {
  BookOpen,
  BarChart,
  Clock,
  UserCheck,
  ClipboardCheck,
  Globe,
  Users,
  Award,
} from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";

// Helper to map icon string from JSON to Lucide icons
const getFeatureIcon = (iconName: string) => {
  switch (iconName) {
    case "book-open":
      return <BookOpen className="w-8 h-8   " />;
    case "bar-chart":
      return <BarChart className="w-8 h-8" />;
    case "clock":
      return <Clock className="w-8 h-8" />;
    case "user-check":
      return <UserCheck className="w-8 h-8" />;
    case "clipboard-check":
      return <ClipboardCheck className="w-8 h-8" />;
    case "globe":
      return <Globe className="w-8 h-8" />;
    case "users":
      return <Users className="w-8 h-8" />;
    case "award":
      return <Award className="w-8 h-8" />;
    default:
      return <BookOpen className="w-8 h-8" />;
  }
};

export default function Choose({
  data = site.choose,
  className = "",
  contentClassName = "",
}: SectionProps<EducationChooseData>) {
  const badge = data?.badge || "Why Choose Us?";
  const titleNormal = data?.title?.normal || "Your Learning Partner";
  const titleHighlighted =
    data?.title?.highlighted || "for a Brighter Tomorrow";
  const desc =
    data?.desc ||
    "We empower learners with innovative, flexible, and career-focused education. Our goal is to make quality education accessible to everyone and help you achieve your dreams.";
  const features = data?.features || [];

  return (
    <section
      className={`py-8 md:py-12 bg-[#f8fafc] relative overflow-hidden ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${contentClassName}`}
      >
        {/* Main Grid Layout: Left Content & Features, Right Image Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Header & 3x2 Feature Cards Grid */}
          <ScrollReveal
            as="div"
            className="lg:col-span-7  lg:max-w-[540px] xl:max-w-full space-y-0"
            direction="left"
            mobileDirection="up"
            distance={70}
            duration={0.8}
          >
            {/* Header Badge */}
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
              <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
                {badge}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl max-w-[500px] xl:max-w-full lg:text-5xl font-bold text-slate-900 ">
              {titleNormal}{" "}
              <span className="text-emerald-600">{titleHighlighted}</span>
            </h2>

            {/* Description */}
            <p className="text-slate-600 text-base mt-4 max-w-[500px]">
              {desc}
            </p>

            {/* 3x2 Feature Cards Grid */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 pt-2">
              {features.map((feature, index) => {
                // Alternating icon styling accents
                const accentColors = [
                  { bg: "bg-emerald-50", text: "text-emerald-600" },
                  { bg: "bg-sky-50", text: "text-sky-600" },
                  { bg: "bg-amber-50", text: "text-amber-600" },
                  { bg: "bg-rose-50", text: "text-rose-600" },
                  { bg: "bg-purple-50", text: "text-purple-600" },
                  { bg: "bg-teal-50", text: "text-teal-600" },
                ][index % 6];

                return (
                  <ScrollReveal
                    key={feature.id || index}
                    as="div"
                    className="bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col justify-between group"
                    direction="up"
                    distance={28}
                    duration={0.6}
                    delay={0.25}
                    staggerChildren={0.08}
                    index={index}
                  >
                    <div>
                      <div className="flex justifty-between gap-3">
                        <div
                          className={`w-11 h-11 rounded-xl ${accentColors.bg} ${accentColors.text} flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                        >
                          {getFeatureIcon(feature.icon)}
                        </div>
                        <h3 className="text-[14px] font-bold text-slate-900 mb-2">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-slate-500 text-xs sm:text-sm ">
                        {feature.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Right Side: Image Composition & Floating Badges */}
          <ScrollReveal
            as="div"
            className="lg:col-span-5 relative sm:mt-6 lg:mt-0"
            direction="right"
            mobileDirection="up"
            distance={70}
            duration={0.8}
            delay={0.1}
          >
            {/* Handwritten Note Accent */}
            <div className="absolute -top-1  max-w-[80px] -right-4 z-25 text-slate-700 font-handwritten text-2xl md:text-3xl tracking-wide rotate-[-8deg] pointer-events-none hidden sm:block">
              {data?.handwrittenNote || "Learn Grow Succeed"}
              <div className="w-16 h-1 bg-emerald-500/60 rounded-full mt-1 ml-2 rotate-[-2deg]" />
            </div>

            <div className="relative  space-y-6 sm:space-y-0">
              {/* Top Floating Badge (Students Learning) */}
              <div className="absolute top-10 left-10 md:-left-10 bg-white px-5 py-3.5 rounded-2xl shadow-xl z-30 flex items-center gap-3.5 border border-slate-100">
                <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  {getFeatureIcon(data?.highlightCard?.icon || "users")}
                </div>
                <div>
                  <span className="text-lg font-extrabold text-slate-900 block leading-none">
                    {data?.highlightCard?.value || "25K+"}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {data?.highlightCard?.label || "Students Learning"}
                  </span>
                </div>
              </div>

              {/* Main Side Image */}
              <div className="relative h-[320px] sm:h-[420px] rounded-[50px] overflow-hidden shadow-2xl md:right-20 sm:right-[20%] border-4 border-white sm:max-w-[420px] ml-auto">
                <Image
                  src={data?.sideImage?.src || "/education/3.png"}
                  alt={
                    data?.sideImage?.alt ||
                    "Student smiling while sitting with a laptop and books"
                  }
                  fill
                  sizes="(min-width: 640px) 420px, calc(100vw - 32px)"
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Offset Secondary Image / Container with Floating Badge */}
              <div className="absolute right-0 -bottom-20 h-[360px] w-[200px] rounded-3xl overflow-hidden border-4 border-white max-w-[200px] ml-auto [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]">
                {" "}
                <Image
                  src={data?.sideImage2?.src || "/education/3.png"}
                  alt={
                    data?.sideImage2?.alt ||
                    "Student smiling while sitting with a laptop and books"
                  }
                  fill
                  sizes="200px"
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative sm:absolute sm:-bottom-12 sm:right-12 w-fit rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20 mt-6 sm:mt-0 bg-white p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  {getFeatureIcon(data?.floatingBadge?.icon || "award")}
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight block">
                    {data?.floatingBadge?.highlight || "26+"}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium block">
                    {data?.floatingBadge?.title || "Years of Excellence"}
                  </span>
                </div>
              </div>

              {/* Dot Grid Patterns */}
              <div className="absolute top-1/4 md:-left-16 hidden sm:grid grid-cols-4 gap-2 opacity-50 z-0">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-teal-500"
                  />
                ))}
              </div>

              <div className="absolute -bottom-16 right-8 hidden sm:grid grid-cols-4 gap-2 opacity-50 z-0">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
