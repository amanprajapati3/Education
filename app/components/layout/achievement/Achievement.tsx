"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BannerPage from "../../shared/BannerPage";
import { site, EducationAchievementAwardIcon, EducationAchievementStatIcon } from "@/data";
import { 
  GraduationCap, 
  Users, 
  Award, 
  Globe, 
  Trophy 
} from "lucide-react";
import ScrollReveal from "../../shared/ScrollReveal";

const AQUA = "#19C2A1";
const GOLD = "#E5A93B"; // Exact yellow/gold color for the laurel wreaths

// added to that union has to be handled here.
const statIconMap: Record<EducationAchievementStatIcon, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-8 h-8 text-blue-950"  />,
  Users: <Users className="w-8 h-8 text-blue-950"  />,
  Award: <Award className="w-8 h-8 text-blue-950"  />,
  Globe: <Globe className="w-8 h-8 text-blue-950"  />,
};

// Icon mapping for awards. Keyed by EducationAchievementAwardIcon.
const awardIconMap: Record<EducationAchievementAwardIcon, React.ReactNode> = {
  Trophy: <Trophy className="w-8 h-8 md:w-12 md:h-12" style={{ color: GOLD }} />,
  GraduationCap: <GraduationCap className="w-8 h-8 md:w-12 md:h-12 text-blue-950"  />,
  Users: <Users className="w-8 h-8 md:w-12 md:h-12 text-blue-950" />,
  Globe: <Globe className="w-8 h-8 md:w-12 md:h-12 text-blue-950" />,
};

/** Splits a stat value like "12,500+" into the number to count and its suffix. */
function parseStatValue(value: string): { target: number; suffix: string } {
  const match = value.trim().match(/^([\d,.]+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return {
    target: Number(match[1].replace(/,/g, "")),
    suffix: match[2],
  };
}

// Counts from 0 up to the stat's value the first time it scrolls into view.
function AnimatedStatNumber({ value }: { value: string }) {
  const { target, suffix } = parseStatValue(value);
  const [count, setCount] = useState(0);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = numberRef.current;
    if (!node) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 2000;
        const startTime = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          setCount(Math.round(target * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return <span ref={numberRef}>{count.toLocaleString("en-US")}{suffix}</span>;
}

// Accurate Yellow Laurel Wreath SVG Component framing left and right of the award icon

const LaurelWreathIcon = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div className="relative inline-flex items-center justify-center w-24 h-24 mx-auto">
      {/* LEFT LAUREL */}
      <Image src="/leftleaf.png" alt="" width={320} height={795} sizes="32px" className="h-auto w-8" />
      {/* CENTER ICON */}
      <div className="relative z-10 flex items-center justify-center">
        {icon}
      </div>
      {/* RIGHT LAUREL */}
      <Image src="/rightleaf.png" alt="" width={320} height={760} sizes="32px" className="h-auto w-8" />
    </div>
  );
};

export default function Achievement() {
  const achievementData = site.achievement;
  const { banner, stats, awardsSection, journeySection, differenceSection } = achievementData;

  return (
    <main className="min-h-screen bg-slate-50/40 overflow-hidden">
      {/* Reusable Banner Page */}
      <BannerPage
        title={banner.title}
        home={banner.home}
        current={banner.current}
        bgImage={banner.bgImage}
      />

      {/* Stats Bar Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-20 ">
        <div className="bg-blue-50/30 rounded-3xl  p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
          {stats.map((stat, idx) => (
            <ScrollReveal
              key={stat.id}
              as="div"
              className={`flex flex-col justify-center items-center gap-5 ${idx !== 0 ? 'sm:pl-6' : ''}`}
              direction="up"
              distance={32}
              duration={0.6}
              delay={0.05}
              staggerChildren={0.09}
              index={idx}
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center shrink-0 shadow-sm">
                {statIconMap[stat.icon as EducationAchievementStatIcon] || <GraduationCap className="w-8 h-8 text-blue-950"  />}
              </div>
              <div className=" flex flex-col justify-center-safe">
                <h2 className="text-2xl text-center sm:text-3xl md:text-4xl font-bold text-blue-950 ">
                  <AnimatedStatNumber value={stat.number} />
                </h2>
                <div className="text-slate-700 text-sm sm:text-base font-bold">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Awards & Recognitions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <ScrollReveal
          as="div"
          className="text-center max-w-3xl mx-auto mb-8 space-y-0"
          direction="up"
          distance={40}
          duration={0.7}
        >
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-0.5 bg-blue-950 inline-block"></span>
            <span className="text-blue-950 font-bold text-sm tracking-widest uppercase">
              {awardsSection.badge}
            </span>
            <span className="w-8 h-0.5 bg-blue-950 inline-block"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl pt-2 pb-3 font-bold text-blue-950 tracking-tight">
            {awardsSection.title.normal}{" "}
            <span style={{ color: AQUA }}>{awardsSection.title.highlighted}</span>
          </h2>

          <p className="text-slate-600 text-base leading-relaxed">
            {awardsSection.desc}
          </p>
        </ScrollReveal>

        {/* 4 Award Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {awardsSection.awards.map((award, awardIndex) => (
            <ScrollReveal
              key={award.id}
              as="article"
              className="bg-white rounded-3xl p-3 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col items-center text-center space-y-5"
              direction="up"
              distance={40}
              duration={0.65}
              delay={0.05}
              staggerChildren={0.09}
              index={awardIndex}
            >
              {/* Laurel Wreath Icon */}
              <LaurelWreathIcon icon={awardIconMap[award.icon as EducationAchievementAwardIcon] || <Trophy className="w-8 h-8" style={{ color: GOLD }} />} />

              <div className="space-y-2 px-3">
                <h3 className="text-xl font-bold text-blue-950 leading-snug">
                  {award.title}
                </h3>
                <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-600 font-bold text-sm">
                  {award.year}
                </span>
              </div>

              <p className="text-slate-800 text-sm sm:text-base  leading-relaxed">
                {award.desc}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Our Journey (Key Milestones) Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <ScrollReveal
          as="div"
          className="text-center max-w-3xl mx-auto mb-5 space-y-0"
          direction="up"
          distance={40}
          duration={0.7}
        >
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
            <span className="text-blue-950 font-bold text-sm tracking-widest uppercase">
              {journeySection.badge}
            </span>
            <span className="w-8 h-0.5 bg-blue-950 inline-block"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl pt-2 pb-3 font-bold text-blue-950 tracking-tight">
            {journeySection.title.normal}{" "}
            <span style={{ color: AQUA }}>{journeySection.title.highlighted}</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {journeySection.desc}
          </p>
        </ScrollReveal>

        {/* Horizontal Timeline Component (Responsive: scrolls or wraps nicely on mobile/tablet) */}
        <div className="relative pt-8 pb-4">
          {/* Connecting Line (hidden on mobile, visible on desktop/tablet) */}
          <div className="hidden md:block absolute top-[28px] left-[8%] right-[10%] h-[1px] bg-gray-300 z-0"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10">
            {journeySection.milestones.map((milestone, milestoneIndex) => (
              <ScrollReveal
                key={milestone.year}
                as="div"
                className="flex -mt-4 flex-col items-center text-center space-y-2"
                direction="up"
                distance={30}
                duration={0.6}
                delay={0.05}
                staggerChildren={0.08}
                index={milestoneIndex}
              >
                {/* Milestone Node Dot */}
                <div className="w-7 h-7 rounded-full bg-[#0A2540]  shadow-md flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-sky-500"></div>
                </div>

                {/* Year */}
                <div className="text-lg font-bold md:text-xl text-slate-900">
                  {milestone.year}
                </div>

                {/* Description */}
                <p className="text-slate-900 text-base max-w-[140px]  leading-relaxed ">
                  {milestone.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Making a Difference Section */}
      <section className=" mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  bg-white rounded-3xl pb-16 ">
          
          {/* Left Image & Quote Box */}
          <ScrollReveal
            as="div"
            className="relative h-[320px] m:h-[400px] rounded-2xl overflow-hidden shadow-md"
            direction="left"
            mobileDirection="up"
            distance={60}
            duration={0.8}
          >
            <Image
              src={differenceSection.image}
              alt={`${differenceSection.title.normal} ${differenceSection.title.highlighted}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent"></div>
            
            {/* Quote Overlay Card */}
            <div className="absolute bottom-6 pl-10 left-6 max-w-[200px] bg-[#0A2540]/75 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/10">
              <p className="text-white font-bold text-base sm:text-lg leading-snug">
                &ldquo;{differenceSection.quote}&rdquo;
              </p>
            </div>
          </ScrollReveal>

          {/* Right Content */}
          <ScrollReveal
            as="div"
            className="space-y-2 md:max-w-[400px]"
            direction="right"
            mobileDirection="up"
            distance={60}
            duration={0.8}
            delay={0.1}
          >
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-0.5 bg-blue-950 inline-block"></span>
              <span className="text-blue-950 font-bold text-sm tracking-widest uppercase">
                {differenceSection.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              {differenceSection.title.normal}{" "}
              <span style={{ color: AQUA }}>{differenceSection.title.highlighted}</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {differenceSection.desc}
            </p>
          </ScrollReveal>

        </div>
      </section>
    </main>
  );
}