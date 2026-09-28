import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BannerPageProps {
  title: string;
  home: string;
  current: string;
  bgImage?: string;
  className?: string;
}

const AQUA = "#19C2A1";

export default function BannerPage({
  title,
  home,
  current,
  bgImage,
  className = "",
}: BannerPageProps) {
  return (
    <section className={`relative w-full h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden flex items-center justify-center ${className}`}>
      {/* Background Image & Dark Overlay */}
      <div className="absolute inset-0 z-0">
        {bgImage && (
          <Image
            src={bgImage}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Centered Content driven entirely by props */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-3">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
          style={{ color: AQUA }}
        >
          {title}
        </h1>
        
        <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-white/90">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            {home}
          </Link>
          <span className="text-white/60">/</span>
          <span className="font-semibold" style={{ color: AQUA }}>
            {current}
          </span>
        </div>
      </div>
    </section>
  );
}