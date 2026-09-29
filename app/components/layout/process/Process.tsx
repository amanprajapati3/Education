"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import BannerPage from "../../shared/BannerPage";
import { site, EducationProcessIcon } from "@/data";
import {
  BookOpen,
  FileEdit,
  FileText,
  Users,
  Mail,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const AQUA = "#19C2A1";
const DARK_BLUE = "#0A2540";
const LINK_BLUE = "#0B5FB0";

// Keyed by EducationProcessIcon so a new icon added to that union must be handled here.
const iconMap: Record<
  EducationProcessIcon,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  BookOpen,
  FileEdit,
  FileText,
  Users,
  Mail,
  CreditCard,
};

type Step = (typeof site.process.steps)[number];

/*  Card (number badge + icon circle + text + optional link)  */
function StepCard({ step, accent }: { step: Step; accent: string }) {
  const Icon = iconMap[step.icon as EducationProcessIcon] || BookOpen;

  return (
    <div className="relative bg-white/80 rounded-[38px] border border-teal-100 shadow-sm hover:shadow-md transition-shadow p-4">
      {/* Number badge, top-left corner. Navy on left-side cards, aqua on right-side cards */}
      <div
        className="absolute -top-5 -left-3 sm:-left-5 w-16 h-16 rounded-full text-white font-extrabold text-2xl flex items-center justify-center shadow-md ring-4 ring-white"
        style={{ backgroundColor: accent }}
      >
        {step.number}
      </div>

      <div className="flex items-center gap-5 sm:gap-7 pt-3">
        {/* Big soft icon circle */}
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <Icon
            className="w-8 h-8 sm:w-11 sm:h-11"
            style={{ color: accent }}
          />
        </div>

        <div className="space-y-2 min-w-0">
          <h3
            className="text-xl sm:text-3xl font-bold leading-snug"
            style={{ color: DARK_BLUE }}
          >
            {step.title}
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {step.desc}
          </p>
          {step.linkText && (
            <Link
              href={step.linkUrl}
              className="inline-flex items-center gap-2 font-bold text-sm sm:text-base pt-1 hover:opacity-80 transition-opacity"
              style={{ color: LINK_BLUE }}
            >
              <span>{step.linkText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/*  Image  */
function StepImage({ step }: { step: Step }) {
  return (
    <div className="relative h-[220px]  rounded-[18px] overflow-hidden shadow-md bg-white">
      <Image
        src={step.image}
        alt={step.title}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function WaveSegment() {
  return (
    <svg
      aria-hidden="true"
      className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 w-12 pointer-events-none z-0"
      style={{ height: "calc(100% + 4rem)" }}
      viewBox="0 0 40 100"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M20 0 C 48 22, -8 30, 20 50 C 48 70, -8 78, 20 100"
        stroke={AQUA}
        strokeWidth="2"
        strokeDasharray="4 5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/*  Bullet on the line  */
function Bullet() {
  return (
    <span
      aria-hidden="true"
      className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-white items-center justify-center shadow"
      style={{ border: `2px solid ${AQUA}` }}
    >
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: AQUA }}
      />
    </span>
  );
}

export default function Process() {
  const { banner, badge, title, desc, steps } = site.process;

  return (
    <main className="min-h-screen bg-slate-50/40 overflow-hidden">
      <BannerPage
        title={banner.title}
        home={banner.home}
        current={banner.current}
        bgImage={banner.bgImage}
      />

      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-0">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-10 h-0.5 bg-emerald-500 inline-block" />
            <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
              {badge}
            </span>
            <span className="w-10 h-0.5 bg-emerald-500 inline-block" />
          </div>

          <h2
            className="text-3xl sm:text-4xl pt-2 pb-3 lg:text-5xl font-bold tracking-tight"
            style={{ color: DARK_BLUE }}
          >
            {title.normal} <span style={{ color: AQUA }}>{title.highlighted}</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Rows: odd = card left / image right, even = image left / card right */}
        <div className="flex flex-col gap-y-12">
          {steps.map((step, idx) => {
            const cardOnRight = idx % 2 === 1;
            const isLast = idx === steps.length - 1;
            // 01, 03, 05 navy (left cards) — 02, 04, 06 aqua (right cards)
            const accent = cardOnRight ? AQUA : DARK_BLUE;

            return (
              <div
                key={step.id}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-x-16 items-center"
              >
                {!isLast && <WaveSegment />}
                <Bullet />

                {/* On mobile: card first, then image. On desktop the order flips per row. */}
                <div className={cardOnRight ? "lg:order-2" : "lg:order-1"}>
                  <StepCard step={step} accent={accent} />
                </div>
                <div className={cardOnRight ? "lg:order-1" : "lg:order-2"}>
                  <StepImage step={step} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}