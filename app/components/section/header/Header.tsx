"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  FileText,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { site } from "@/data/index";
import type { EducationHeaderNavItem } from "@/data/index";

/*  Brand tokens — sampled directly from the reference design            */
const AQUA = "#19C2A1";
const BLUE = "#0A6CA7";
const NAV_TEXT = "#28394A";

/** WhatsApp isn't in lucide-react, so it's a small inline brand icon. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.876.52 3.63 1.42 5.128L2 22l4.989-1.396A9.95 9.95 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.017a8.01 8.01 0 01-4.083-1.117l-.293-.174-3.005.841.817-2.933-.19-.301A8.005 8.005 0 1120 12c0 4.42-3.58 8.017-7.999 8.017z" />
    </svg>
  );
}

const SOCIAL_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
  whatsapp: WhatsAppIcon,
};


function Topbar() {
  const { address, email, phone, socialLinks } = site.topbar;

  return (
    <div className="w-full   text-sm" style={{ backgroundColor: BLUE }}>
      <div className="flex max-w-[1320px] items-stretch">
        {/* Slanted aqua block — social links */}
        <div
          className="flex items-center gap-3 py-2.5 pl-4 sm:pl-16 pr-8 sm:pr-14 text-white font-medium whitespace-nowrap"
          style={{
            backgroundColor: AQUA,
            clipPath: "polygon(0 0, calc(100% - 28px) 0, 100% 100%, 0 100%)",
          }}
        >
          <span className="hidden sm:inline">Follow Us:</span>
          <div className="flex items-center gap-4">
            {socialLinks.map((s) => {
              const Icon = SOCIAL_ICON_MAP[s.label.toLowerCase()] ?? FaFacebookF;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white hover:bg-white transition-colors"
                >
                  <Icon className="h-5 w-5 text-[#119797]" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Blue block — contact info, hidden on mobile/tablet */}
        <div className="flex flex-1 items-center justify-end gap-8 md:px-6 py-2.5 text-white">
          <span className="lg:flex hidden items-center md:gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            {address}
          </span>
          <span className="h-4 w- bg-white" />
          <span className="sm:flex hidden mr-3 md:mr-0 items-center gap-2">
            <Mail className="h-4 w-4 shrink-0" />
            {email}
          </span>
          <span className="h-4 lg:flex hidden w-px bg-white" />
          <span className="flex lg:flex hidden items-center gap-2">
            <Phone className="h-4 w-4 shrink-0" />
            {phone}
          </span>
        </div>
      </div>
    </div>
  );
}

/*  Main header — logo, nav, CTA buttons, mobile menu                    */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [openNav, setOpenNav] = useState<string | null>(null);
  const [openMobileNav, setOpenMobileNav] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close every dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!openNav && !openMobileNav) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenNav(null);
        setOpenMobileNav(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenNav(null);
        setOpenMobileNav(null);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openNav, openMobileNav]);

  const { site: brand, nav, buttons } = site.header;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const closeDropdowns = () => setOpenNav(null);

  const closeMobileMenu = () => {
    setOpen(false);
    setOpenMobileNav(null);
  };

  return (
    <header ref={headerRef} className="sticky  top-0 z-50 w-full shadow-sm">
      <Topbar />

      <div className="w-full bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 md:px-3 py-0">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src={brand.logo.normal}
              alt={brand.siteName}
              width={160}
              height={48}
              sizes="(min-width: 768px) 320px, (min-width: 640px) 213px, 187px"
              className="h-16 w-auto md:h-24"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-8">
            {nav.map((item: EducationHeaderNavItem) => {
              const active = isActive(item.href);
              const hasChildren = Boolean(item.children?.length);
              const expanded = openNav === item.label;

              return (
                <div
                  key={item.label}
                  className="group relative"
                  onMouseLeave={() => setOpenNav(null)}
                >
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={item.href}
                      onClick={closeDropdowns}
                      className="relative py-2 text-[15px] font-medium transition-colors"
                      style={{ color: active ? AQUA : NAV_TEXT }}
                    >
                      {item.label}
                      <span
                        className="absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-all"
                        style={{
                          backgroundColor: AQUA,
                          width: active ? "100%" : "0%",
                        }}
                      />
                    </Link>

                    {hasChildren && (
                      <button
                        type="button"
                        aria-label={`${item.label} submenu`}
                        aria-expanded={expanded}
                        aria-haspopup="true"
                        onClick={() =>
                          setOpenNav(expanded ? null : item.label)
                        }
                        className="flex items-center py-2 transition-colors"
                        style={{ color: active ? AQUA : NAV_TEXT }}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Dropdown — opens on hover or on click */}
                  {hasChildren && (
                    <div
                      className={`absolute left-0 top-full z-50 w-60 pt-3 transition-all duration-200 ${
                        expanded
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                      }`}
                    >
                      <div className="rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                        {item.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={closeDropdowns}
                            className="block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[rgba(25,194,161,0.08)]"
                            style={{ color: isActive(child.href) ? AQUA : NAV_TEXT }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden xl:flex items-center gap-3">
            {buttons.map((btn, i) => {
              const primary = i === 1; // Apply Now = aqua, Contact Us = blue
              const Icon = i === 0 ? Send : FileText;
              return (
                <Link
                  key={btn.label}
                  href={btn.href}
                  className="flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: primary ? AQUA : BLUE }}
                >
                  <Icon className="h-4 w-4" />
                  {btn.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile / tablet hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex xl:hidden h-10 w-10 items-center justify-center rounded-md"
            style={{ color: BLUE }}
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>

      {/*  Mobile slide-in menu (from left)                                 */}
      <div
        className={`fixed inset-0 z-[60] xl:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute left-0 top-0 h-full w-[82%] max-w-[340px] bg-white shadow-xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          } flex flex-col`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <Image
              src={brand.logo.normal}
              alt={brand.siteName}
              width={140}
              height={40}
              sizes="126px"
              className="h-9 w-auto"
            />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="flex flex-col gap-1">
              {nav.map((item: EducationHeaderNavItem) => {
                const active = isActive(item.href);
                const hasChildren = Boolean(item.children?.length);
                const expanded = openMobileNav === item.label;

                return (
                  <li key={item.label}>
                    <div className="flex items-center gap-1">
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="flex flex-1 items-center rounded-md px-3 py-3 text-[15px] font-medium"
                        style={{
                          color: active ? AQUA : NAV_TEXT,
                          backgroundColor: active
                            ? "rgba(25,194,161,0.08)"
                            : "transparent",
                        }}
                      >
                        {item.label}
                      </Link>

                      {hasChildren && (
                        <button
                          type="button"
                          aria-label={`${item.label} submenu`}
                          aria-expanded={expanded}
                          onClick={() =>
                            setOpenMobileNav(expanded ? null : item.label)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-md"
                          style={{ color: active ? AQUA : NAV_TEXT }}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              expanded ? "rotate-180" : "-rotate-90"
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {hasChildren && (
                      <ul
                        className={`ml-3 overflow-hidden border-l border-gray-200 pl-3 transition-all duration-300 ${
                          expanded ? "max-h-96 pt-1" : "max-h-0"
                        }`}
                      >
                        {item.children?.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={closeMobileMenu}
                              className="block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[rgba(25,194,161,0.08)]"
                              style={{
                                color: isActive(child.href) ? AQUA : NAV_TEXT,
                              }}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 px-5 py-5 border-t border-gray-100">
            {buttons.map((btn, i) => {
              const primary = i === 1;
              const Icon = i === 0 ? Send : FileText;
              return (
                <Link
                  key={btn.label}
                  href={btn.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: primary ? AQUA : BLUE }}
                >
                  <Icon className="h-4 w-4" />
                  {btn.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}