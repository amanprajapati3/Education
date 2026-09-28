import React from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/data";

const AQUA = "#087ff5";

export default function NotFound() {
  const notFoundData = site.error
  const { badge, errorCode, title, desc, bgImage, buttons, helpText, helpLink } = notFoundData;

  const firstDigit = errorCode[0] || "4";
  const middleDigit = errorCode[1] || "0";
  const lastDigit = errorCode[2] || "4";

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50/50">
      {/* Background Image */}
      {bgImage && (
        <div className="absolute inset-0 top-0 z-0">
          <Image
            src={bgImage}
            alt="Page Not Found Background"
            fill
            priority
            className=" "
          />
        </div>
      )}

      {/* Center Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 text-center flex flex-col items-center">
        
        {/* Badge / OOPS */}
        <span className="text-sm sm:text-base font-bold tracking-[0.3em] uppercase text-slate-800 mb-2">
          {badge}
        </span>

        {/* 404 Error Code with Colored Middle Digit */}
        <h1 className="text-7xl sm:text-8xl md:text-[140px] font-black tracking-wider leading-none select-none drop-shadow-sm">
          <span className="text-[#087ff5]">{firstDigit}</span>
          <span style={{ color: AQUA }}>{middleDigit}</span>
          <span className="text-[#087ff5]">{lastDigit}</span>
        </h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 mt-2 mb-4">
          {title.normal}{" "}
          <span style={{ color: AQUA }}>{title.highlighted}</span>
        </h2>

        {/* Description */}
        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-lg mb-8 leading-relaxed">
          {desc}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          {buttons.map((btn, index) => {
            const isPrimary = btn.variant === "primary";
            return (
              <Link
                key={index}
                href={btn.href}
                className={`px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm cursor-pointer ${
                  isPrimary
                    ? "text-white hover:opacity-90"
                    : "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 hover:border-slate-400"
                }`}
                style={isPrimary ? { backgroundColor: AQUA } : {}}
              >
                {btn.label}
              </Link>
            );
          })}
        </div>

        {/* Need Help Link */}
        <div className="mt-8 text-sm sm:text-base text-slate-600 flex items-center gap-1.5 font-medium">
          <span>{helpText}</span>
          <Link 
            href={helpLink.href} 
            className="font-bold transition-colors hover:underline"
            style={{ color: AQUA }}
          >
            {helpLink.label}
          </Link>
        </div>

      </div>
    </main>
  );
}