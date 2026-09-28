import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { site } from "@/data/index";
import type { EducationFooterColumn } from "@/data/index";

/* -------------------------------------------------------------------- */
/*  Brand tokens — sampled directly from the reference design            */
/* -------------------------------------------------------------------- */
const AQUA = "#19C2A1";
const NAVY = "#01213A";
const ICON_CIRCLE = "#1B3C5B";

const SOCIAL_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
};

export default function Footer() {
  const f = site.footer;

  return (
    <footer className="relative w-full overflow-hidden" style={{ backgroundColor: NAVY }}>
      {/* Decorative circles — top-right ring, bottom-left overlapping blobs */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full border-[16px] opacity-40"
        style={{ borderColor: "#0A6CA7" }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full"
        style={{
          background: `conic-gradient(from 200deg, ${AQUA}, #0A6CA7 55%, transparent 56%)`,
          opacity: 0.9,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-10 h-40 w-40 rounded-full"
        style={{ backgroundColor: "#0A6CA7", opacity: 0.85 }}
      />

      <div className="relative mx-auto max-w-[1340px] px-4 sm:px-6 pt-14 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr]">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className=" items-center">
              <Image
                src={f.logoImage}
                alt={f.siteName}
                width={170}
                height={50}
                className="h-14 sm:h-24 -ml-5 sm:-ml-10 md:h-24 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-[280px] text-[15px] leading-relaxed text-white/70">
              {f.desc}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {f.socialLinks.map((s) => {
                const Icon = SOCIAL_ICON_MAP[s.label.toLowerCase()] ?? FaFacebookF;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-[#19C2A1]"
                    style={{ backgroundColor: ICON_CIRCLE }}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {f.columns.map((col: EducationFooterColumn) => (
            <div key={col.title}>
              <h4 className="text-[17px] font-semibold text-white">{col.title}</h4>
              <span className="mt-2 block h-[3px] w-9 rounded-full" style={{ backgroundColor: AQUA }} />
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1.5 text-[15px] text-white/75 transition-colors hover:text-white"
                    >
                      <ChevronRight className="h-3.5 w-3.5 shrink-0" style={{ color: AQUA }} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 className="text-[17px] font-semibold text-white">
              {f.footerContact.title}
            </h4>
            <span className="mt-2 block h-[3px] w-9 rounded-full" style={{ backgroundColor: AQUA }} />

            <ul className="mt-4 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: ICON_CIRCLE }}
                >
                  <MapPin className="h-4 w-4 text-white" />
                </span>
                <span className="text-[15px] leading-snug text-white/80 whitespace-pre-line">
                  {f.footerContact.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: ICON_CIRCLE }}
                >
                  <Phone className="h-4 w-4 text-white" />
                </span>
                <a href={f.footerContact.phoneHref} className="text-[15px] text-white/80 hover:text-white">
                  {f.footerContact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: ICON_CIRCLE }}
                >
                  <Mail className="h-4 w-4 text-white" />
                </span>
                <a href={f.footerContact.emailHref} className="text-[15px] text-white/80 hover:text-white">
                  {f.footerContact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: ICON_CIRCLE }}
                >
                  <Clock className="h-4 w-4 text-white" />
                </span>
                <span className="text-[15px] leading-snug text-white/80">
                  {f.footerContact.hours.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col-reverse items-center gap-4 pt-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/60">{f.copyright}</p>

          <ul className="flex flex-wrap items-center justify-center gap-x-3 text-sm text-white/60">
            {f.legalLinks.map((link, i) => (
              <li key={link.label} className="flex items-center gap-3">
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
                {i < f.legalLinks.length - 1 && <span className="text-white/25">|</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      
    </footer>
  );
}