import React from "react";
import { Mail, Phone } from "lucide-react";
import { EducationLegalData } from "@/data";
import BannerPage from "../../shared/BannerPage";
import ScrollReveal from "../../shared/ScrollReveal";

interface LegalPageProps {
  data: EducationLegalData;
  className?: string;
  contentClassName?: string;
}

export default function LegalPage({
  data,
  className = "",
  contentClassName = "",
}: LegalPageProps) {
  const banner = data?.banner;
  const points = data?.points || [];
  const contact = data?.contact;

  return (
    <>
      <BannerPage
        title={banner?.title || ""}
        home={banner?.home || "Home"}
        current={banner?.current || ""}
        bgImage={banner?.bgImage}
      />

      <section className={`py-10 md:py-12 border bg-white relative overflow-hidden ${className}`}>
        {/* Decorative glows */}
        <div className="absolute -top-8 -left-8 w-72 h-72 bg-emerald-50/80 rounded-full filter blur-2xl -z-10" />
        <div className="absolute bottom-0 -right-10 w-72 h-72 bg-sky-50/60 rounded-full filter blur-3xl -z-10" />

        <div className={`max-w-7xl mx-auto px-2 sm:px-6  ${contentClassName}`}>
          <ScrollReveal
            as="div"
            className=""
            direction="up"
            distance={40}
            duration={0.7}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-0.5 bg-emerald-500 inline-block"></span>
              <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
                {data?.badge || "Legal"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mt-3">
              {data?.title?.normal} <span className="text-emerald-600">{data?.title?.highlighted}</span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4 max-w-3xl">
              {data?.desc}
            </p>
          </ScrollReveal>

          {/* Numbered Points */}
          <ol className="space-y-5 mt-10">
            {points.map((point, index) => (
              <ScrollReveal
                key={point.id || index}
                as="li"
                className="flex items-start gap-4 sm:gap-5 bg-slate-50/70 border border-slate-100 rounded-2xl p-5 sm:p-6 transition-colors hover:border-emerald-200 hover:bg-emerald-50/40"
                direction="up"
                distance={32}
                duration={0.6}
                delay={0.04}
                staggerChildren={0.06}
                index={index}
              >
                <span className="shrink-0 w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center font-extrabold text-base shadow-md shadow-emerald-500/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{point.title}</h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2">
                    {point.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}

            {/* Contact Us Point */}
            {contact && (
              <ScrollReveal
                as="li"
                className="flex items-start gap-4 sm:gap-5 bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 sm:p-6"
                direction="up"
                distance={32}
                duration={0.6}
                delay={0.04}
              >
                <span className="shrink-0 w-11 h-11 rounded-full bg-teal-700 text-white flex items-center justify-center font-extrabold text-base shadow-md shadow-teal-700/25">
                  {String(points.length + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{contact.title}</h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2">
                    {contact.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold text-sm"
                    >
                      <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Mail className="w-4 h-4" />
                      </span>
                      {contact.email}
                    </a>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 text-sky-700 hover:text-sky-800 font-semibold text-sm"
                    >
                      <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Phone className="w-4 h-4" />
                      </span>
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </ol>
        </div>
      </section>
    </>
  );
}
