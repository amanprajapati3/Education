"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, X } from "lucide-react";
import { site } from "@/data/index";
import ScrollReveal from "../shared/ScrollReveal";

const AQUA = "#19C2A1";

function AnimatedNumber({ value }: { value: string | number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const target = Number(String(value).replace(/,/g, "").replace(/[^\d.]/g, ""));

  useEffect(() => {
    const element = document.getElementById(`stat-${String(value)}`);

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value, started]);

  useEffect(() => {
    if (!started) return;

    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target]);

  return <span id={`stat-${String(value)}`}>{count}</span>;
}

export default function Banner() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { badge, title, desc, buttons, stats, image, videoUrl } = site.banner;
  const targetVideoUrl = videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ";

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
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[640px] w-full sm:h-[600px] md:h-[560px] lg:h-[620px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#001f3f] via-sky- to-transparent sm:block" />

        <div
          className="absolute inset-0 block sm:hidden"
          style={{ backgroundColor: "rgba(4,22,42,0.72)" }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-[1320px] items-center px-4 sm:px-6 md:px-20">
          <div className="flex w-full flex-col items-center text-center sm:w-[560px] sm:items-start sm:text-left">
            <ScrollReveal
              as="div"
              className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-white/90 sm:text-sm"
              direction="up"
              distance={28}
              duration={0.6}
            >
              {badge}
              <span className="hidden h-px w-10 bg-white/50 sm:inline-block" />
            </ScrollReveal>

            <ScrollReveal
              as="h1"
              className="mt-4 text-4xl font-bold leading-[1.1] text-white sm:text-[44px] md:text-5xl lg:text-[54px]"
              direction="up"
              distance={36}
              duration={0.7}
              delay={0.1}
            >
              {title.normal}
              <br />
              <span style={{ color: AQUA }}>{title.highlighted}</span>
              <br />
              {title.postTitle}
            </ScrollReveal>

            <ScrollReveal
              as="p"
              className="mt-5 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-base"
              direction="up"
              distance={30}
              duration={0.7}
              delay={0.2}
            >
              {desc.parts.map((part, i) =>
                part.highlight ? (
                  <span key={i} style={{ color: AQUA }}>
                    {part.text}
                  </span>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </ScrollReveal>

            <ScrollReveal
              as="div"
              className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:justify-start"
              direction="up"
              distance={30}
              duration={0.7}
              delay={0.3}
            >
              {buttons.map((btn) => {
                const isVideoBtn = btn.variant === "outline" || btn.icon === "play" || btn.label.toLowerCase().includes("video");

                if (isVideoBtn) {
                  return (
                    <button
                      key={btn.label}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsVideoOpen(true);
                      }}
                      className="swp-out swp-out-clear flex items-center gap-3 rounded-full border border-white/60 px-5 py-3 text-sm font-semibold text-white cursor-pointer"
                      style={{ "--swp-color": AQUA } as React.CSSProperties}
                    >
                      {btn.label}
                      <span
                        className="swp-fixed flex h-7 w-7 items-center justify-center rounded-full"
                        style={{ backgroundColor: "#fff", "--swp-fixed": "#0A6CA7" } as React.CSSProperties}
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                      </span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={btn.label}
                    href={btn.href}
                    className="swp flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                    style={{ "--swp-color": AQUA } as React.CSSProperties}
                  >
                    {btn.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                );
              })}
            </ScrollReveal>

            <ScrollReveal
              as="div"
              className="mt-9 flex items-start justify-center gap-0 sm:justify-start sm:gap-8"
              direction="up"
              distance={30}
              duration={0.7}
              delay={0.4}
            >
              {stats.map((stat, i) => (
                <div key={stat.id} className="flex items-start gap-6 sm:gap-8">
                  {i > 0 && <span className="h-10 w-px bg-white/25" />}

                  <div>
                    <p className="text-2xl font-bold text-white sm:text-[28px]">
                      <AnimatedNumber value={stat.number} />
                      {stat.suffix}
                    </p>

                    <p className="mt-1 whitespace-nowrap text-xs text-white/75 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollReveal>
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
              className="swp-out swp-glass swp-abs top-4 right-4 z-50 w-10 h-10 rounded-full text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            {renderVideoPlayer(targetVideoUrl)}
          </div>
        </div>
      )}
    </section>
  );
}