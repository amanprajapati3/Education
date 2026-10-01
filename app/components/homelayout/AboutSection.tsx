import React from "react";
import Image from "next/image";
import { site, SectionProps, EducationAboutData } from "@/data";
import { Target, Users, Briefcase, GraduationCap, Phone, ArrowRight } from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";

// Helper to map icon string from JSON to Lucide icons
const getFeatureIcon = (iconName: string) => {
  switch (iconName) {
    case "target":
      return <Target className="w-8 h-8" />;
    case "users":
      return <Users className="w-8 h-8" />;
    case "briefcase":
      return <Briefcase className="w-8 h-8" />;
    default:
      return <GraduationCap className="w-8 h-8" />;
  }
};

const DEFAULT_PARAGRAPH =
  "We are committed to providing high-quality education, industry-relevant programs, and a supportive learning environment that helps students grow, gain confidence, and achieve their goals.";

type AboutSectionProps = SectionProps<EducationAboutData> & {
  showAllParagraphs?: boolean;
  showFeatures?: boolean;
  showButton?: boolean;
  showPhoneBlock?: boolean;
};

export default function AboutSection({
  data = site.about,
  className = "",
  contentClassName = "",
  isEditable = false,
  onUpdate,
  showAllParagraphs = false,
  showFeatures = true,
  showButton = true,
  showPhoneBlock = true,
}: AboutSectionProps) {
  const allParagraphs = data?.paragraphs?.length
    ? data.paragraphs
    : [DEFAULT_PARAGRAPH];
  const visibleParagraphs = showAllParagraphs
    ? allParagraphs
    : allParagraphs.slice(0, 1);

  return (
    <section className={`py-8 md:py-12 bg-white relative overflow-hidden ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${contentClassName}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 ">
          
          {/* Left Side: Images & Floating Badge */}
          <ScrollReveal
            as="div"
            className="lg:col-span-6 relative"
            direction="left"
            mobileDirection="up"
            distance={70}
            duration={0.8}
          >
            {/* Background decorative soft glow */}
            <div className="absolute -top-6 -left-6 w-72 h-72 bg-emerald-50/80 rounded-full filter blur-2xl -z-10" />
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-sky-50/60 rounded-full filter blur-3xl -z-10" />

            <div className="relative  space-y-6 sm:space-y-0">
              {/* Top Main Image */}
              <div className="relative w-[75%] h-[280px] sm:h-[340px] md:h-[370px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={data?.image?.src || "/education/1.png"}
                  alt={data?.image?.alt || "Group of students walking together on campus"}
                  fill
                  sizes="(min-width: 1280px) 438px, (min-width: 1024px) 33.5vw, (min-width: 640px) calc(75vw - 36px), calc(75vw - 24px)"
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Offset Image */}
              <div className="absolute -bottom-24 right-0 w-[65%] h-[240px] sm:h-[280px] md:h-[300px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10 mt-6 sm:mt-0">
                <Image
                  src={data?.secondaryImage?.src || "/education/2.png"}
                  alt={data?.secondaryImage?.alt || "Student sitting outdoors working on a laptop"}
                  fill
                  sizes="(min-width: 1280px) 380px, (min-width: 1024px) 29vw, (min-width: 640px) calc(65vw - 31px), calc(65vw - 21px)"
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-8 left-4 sm:-bottom-10 sm:left-6 bg-gradient-to-br from-teal-700 to-teal-900 text-white p-4 rounded-2xl shadow-xl z-20 flex flex-col items-center justify-center max-w-[160px] border border-teal-600/30">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {data?.caption ? data.caption.split(" ")[0] : "25+"}
                </span>
                <span className="text-xs sm:text-sm text-teal-100 font-medium text-center mt-1">
                  {data?.caption ? data.caption.replace(/^\S+\s*/, "") : "Years of Academic Excellence"}
                </span>
              </div>

              {/* Dot Grid Pattern */}
              <div className="absolute -bottom-16 left-0 hidden sm:grid grid-cols-5 gap-2 opacity-60 z-0">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Side: Content & Features */}
          <ScrollReveal
            as="div"
            className="lg:col-span-6 sm:mt-24 mt-0 lg:mt-0 space-y-0"
            direction="right"
            mobileDirection="up"
            distance={70}
            duration={0.8}
            delay={0.1}
          >
            {/* Subtitle Badge */}
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
              <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
                {data?.badge || "About Us"}
              </span>
            </div>

            {/* Title with Highlighted Span */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
              {data?.title?.normal}{" "}
              <span className="text-emerald-600">{data?.title?.highlighted}</span>
            </h2>

            {/* Description */}
            <div className="space-y-4">
              {visibleParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-slate-600 text-base sm:text-base leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Feature List */}
            {showFeatures && (
              <div className="space-y-4 pt-2">
                {data?.features?.map((feature, index) => {
                  const colorTheme = [
                    { bg: "bg-teal-50", text: "text-teal-600", hoverBg: "group-hover:bg-teal-600" },
                    { bg: "bg-sky-50", text: "text-sky-600", hoverBg: "group-hover:bg-sky-600" },
                    { bg: "bg-emerald-50", text: "text-emerald-600", hoverBg: "group-hover:bg-emerald-600" },
                  ][index % 3];

                  return (
                    <ScrollReveal
                      key={feature.id || index}
                      as="div"
                      className="flex items-start gap-4 group"
                      direction="up"
                      mobileDirection="up"
                      distance={26}
                      duration={0.6}
                      delay={0.25}
                      staggerChildren={0.1}
                      index={index}
                    >
                      <div className={`w-12 h-12 rounded-full ${colorTheme.bg} ${colorTheme.text} flex items-center justify-center flex-shrink-0 ${colorTheme.hoverBg} group-hover:text-white transition-colors duration-300 shadow-sm`}>
                        {getFeatureIcon(feature.icon)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-blue-800">{feature.title}</h3>
                        <p className="text-slate-500 text-sm mt-1">{feature.description}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}

            {/* Call to Action Button & Phone Contact Block */}
            {(showButton || showPhoneBlock) && (
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {showButton && (
                  <a
                    href={data?.button?.href || "/about"}
                    className="swp swp-emerald-500 inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-full shadow-lg shadow-emerald-500/25"
                  >
                    <span>{data?.button?.label || "Learn More"}</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                )}

                {showPhoneBlock && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block font-medium">
                        {data?.phoneBlock?.label || "Have Questions?"}
                      </span>
                      <a
                        href={data?.phoneBlock?.phoneHref || "tel:+14065550120"}
                        className="text-base sm:text-lg font-extrabold text-slate-900 hover:text-emerald-600 transition-colors"
                      >
                        {data?.phoneBlock?.phone || "+1 (406) 555-0120"}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}