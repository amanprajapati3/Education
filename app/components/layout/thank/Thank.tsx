"use client";

import React from "react";
import { motion } from "framer-motion";
import { site, SectionProps, EducationThankYouData } from "@/data";

export default function ThankYou({
  data = site.thankYou,
  className = "",
  contentClassName = "",
}: SectionProps<EducationThankYouData>) {
  const badge = data?.badge || "Form Submitted";
  const titleNormal = data?.title?.normal || "Thank You";
  const titleHighlighted = data?.title?.highlighted || "For Reaching Out";
  const messages = data?.messages || [];

  return (
    <section className={`py-16 md:py-24 bg-white relative overflow-hidden ${className}`}>
      {/* Soft decorative glows */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-emerald-50/80 rounded-full filter blur-2xl -z-10" />
      <div className="absolute bottom-0 -right-10 w-72 h-72 bg-sky-50/60 rounded-full filter blur-3xl -z-10" />

      <div className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${contentClassName}`}>
        {/* Animated Tick */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center shadow-xl shadow-emerald-500/20"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 sm:w-14 sm:h-14"
            fill="none"
            stroke="#19C2A1"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <motion.path
              d="M20 6 9 17l-5-5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            />
          </svg>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="inline-flex items-center gap-3 mt-8"
        >
          <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
            {badge}
          </span>
          <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mt-3"
        >
          {titleNormal} <span className="text-emerald-600">{titleHighlighted}</span>
        </motion.h1>

        {/* Messages */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.95 }}
          className="space-y-3 mt-5"
        >
          {messages.map((message, index) => (
            <p key={index} className="text-slate-600 text-base sm:text-lg ">
              {message}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
