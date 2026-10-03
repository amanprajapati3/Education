"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  site,
  SectionProps,
  EducationStatsData,
  EducationStatItem,
} from "@/data";
import { Users, GraduationCap, BookOpen, Trophy } from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";

// Helper to map icon string from JSON to Lucide icons
const getStatIcon = (iconName: string) => {
  switch (iconName) {
    case "users":
      return <Users className="w-8 h-8 text-white" />;
    case "graduation-cap":
      return <GraduationCap className="w-8 h-8 text-white" />;
    case "book-open":
      return <BookOpen className="w-8 h-8 text-white" />;
    case "trophy":
      return <Trophy className="w-8 h-8 text-white" />;
    default:
      return <Users className="w-8 h-8 text-white" />;
  }
};

// Counter component for animated numbers when in view
function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const duration = 2000; // 2 seconds

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentVal = Math.floor(progress * end);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isVisible, end]);

  return (
    <span
      ref={counterRef}
      className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
    >
      {count}
      {suffix}
    </span>
  );
}

export default function Stats({
  data = site.stats,
  className = "",
  contentClassName = "",
}: SectionProps<EducationStatsData>) {
  const badge = data?.badge || "Our Impact In Numbers";
  const titleNormal = data?.title?.normal || "Creating";
  const titleHighlighted = data?.title?.highlighted || "Brighter Futures";
  const desc =
    data?.desc ||
    "Our numbers reflect the trust of students, the dedication of our faculty, and the success we build together.";
  const bgImage =
    data?.bgImage ||
    "/education_img/students-walking-together-on-campus-with-books.jpg";
  const statsList = (data?.stats as EducationStatItem[]) || [];

  return (
    <section
      className={`relative py-8 my-8 md:py-12 overflow-hidden  ${className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Gradient Overlay: Deep blue/navy starting strong from left and fading to transparent towards center/right */}
      <div className="absolute inset-0 lg:to-transparent bg-gradient-to-r from-[#001f3f] via-tr to-transparent -z-10" />

      <ScrollReveal
        as="div"
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${contentClassName}`}
        direction="up"
        distance={50}
        duration={0.8}
      >
        <div className="max-w-3xl space-y-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-3">
            <span className="text-emerald-400 font-bold text-xs sm:text-sm tracking-widest uppercase">
              {badge}
            </span>
            <span className="w-12 h-0.5 bg-emerald-500 inline-block"></span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            {titleNormal}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              {titleHighlighted}
            </span>
          </h2>

          {/* Description */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            {desc}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 sm:gap-8 gap-4 sm:pt-3">
            {statsList.map((stat, index) => (
              <ScrollReveal
                key={stat.id || index}
                as="div"
                className="relative flex flex-col items-start p-6 md:after:absolute md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:w-[1px] md:after:h-[55%] md:after:bg-white/40 md:last:after:hidden group hover:border-emerald-500/50 transition-all duration-300"
                direction="up"
                distance={34}
                duration={0.65}
                delay={0.15}
                staggerChildren={0.09}
                index={index}
              >
                {/* Icon with glowing circular ring */}
                <div className="w-14 md:w-16 md:h-16 h-14 rounded-full border-4 border-b-transparent border-b-white/20 border-r-emerald-700 border-l-emerald-700 border-t-emerald-400 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {getStatIcon(stat.icon)}
                </div>

                {/* Animated Number & Suffix */}
                <div className="mb-0">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-white text-sm font-medium">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
