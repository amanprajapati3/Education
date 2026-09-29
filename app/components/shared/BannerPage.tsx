import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

export interface BannerCrumb {
  label: string;
  href?: string;
}

interface BannerPageProps {
  title: string;
  home: string;
  current: string;
  bgImage?: string;
  crumbs?: BannerCrumb[];
  className?: string;
}

const AQUA = "#19C2A1";

export default function BannerPage({
  title,
  home,
  current,
  bgImage,
  crumbs = [],
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
            sizes="100vw"
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

        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-white/90 sm:text-base"
        >
          <Link href="/" className="transition-colors hover:text-[#19C2A1]">
            {home}
          </Link>
          {crumbs.map((crumb, index) => (
            <Fragment key={`${crumb.label}-${index}`}>
              <span className="text-white/50">/</span>
              {crumb.href ? (
                <Link href={crumb.href} className="transition-colors hover:text-[#19C2A1]">
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </Fragment>
          ))}
          <span className="text-white/50">/</span>
          <span className="font-semibold" style={{ color: AQUA }}>
            {current}
          </span>
        </nav>
      </div>
    </section>
  );
}
