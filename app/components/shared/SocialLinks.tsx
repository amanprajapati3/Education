"use client";

import { useSyncExternalStore } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaShareNodes,
  FaTelegram,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export type SocialLinkItem = { label: string; href: string };

type SocialLinksProps = {
  /** Optional label rendered above the icons, e.g. "Follow Me". */
  heading?: string;
  /**
   * Fixed profile links. When omitted the icons fall back to share intents
   * that open each platform with the page the visitor is currently on.
   */
  links?: SocialLinkItem[];
  /** Text pre-filled into the share intents (page title works best). */
  shareText?: string;
  /** Static URL used until the live location is available (SSR / pre-hydration). */
  fallbackUrl?: string;
  /** Prefix for the accessible name, e.g. "Angela T. Vigil" or "Share this news". */
  ariaPrefix?: string;
  className?: string;
};

/* Official brand colours, keyed by lowercase network name. */
const BRAND_COLORS: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E1306C",
  linkedin: "#0A66C2",
  youtube: "#FF0000",
  x: "#000000",
  whatsapp: "#25D366",
  telegram: "#229ED9",
  share: "#19C2A1",
};

const SOCIAL_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  whatsapp: FaWhatsapp,
};

/* Used when no explicit links are supplied — each builds a platform share URL. */
const SHARE_NETWORKS: {
  label: string;
  build: (url: string, text: string) => string;
}[] = [
  {
    label: "Facebook",
    build: (url) =>
      `https://www.facebook.com`,
  },
  {
    label: "X",
    build: (url, text) =>
      `https://twitter.com`,
  },
  {
    label: "LinkedIn",
    build: (url) =>
      `https://www.linkedin.com`,
  },
  {
    label: "WhatsApp",
    build: (url, text) =>
      `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`.trim())}`,
  },
];

const subscribe = () => () => {};
const getSnapshot = () => window.location.href;
const getServerSnapshot = () => "";

/**
 * Reduces any social URL to its bare site root, so a link never carries a user
 * or page name — `https://www.facebook.com/angela.vigil?ref=1#bio` becomes
 * `https://www.facebook.com`. Relative paths are returned untouched.
 */
function toSiteRoot(url: string) {
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith("/") || trimmed.startsWith("#")) return trimmed;

  try {
    const { protocol, hostname } = new URL(
      /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`,
    );
    return `${protocol}//${hostname}`;
  } catch {
    return "";
  }
}

export default function SocialLinks({
  heading,
  links,
  shareText = "",
  fallbackUrl = "",
  ariaPrefix = "Share",
  className = "",
}: SocialLinksProps) {
  const currentUrl = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pageUrl = currentUrl || fallbackUrl;

  const items = (
    links
      ? links.map((social) => {
          const key = social.label.toLowerCase();
          const Icon = SOCIAL_ICONS[key];
          if (!Icon) return null;
          // A "share" entry always points at the page the visitor is on.
          const href =
            key === "share" ? currentUrl || social.href : toSiteRoot(social.href);
          if (!href) return null;
          return {
            key,
            label: social.label,
            Icon,
            color: BRAND_COLORS[key],
            href,
            opensNewTab: key !== "share",
          };
        })
      : SHARE_NETWORKS.map((network) => {
          const key = network.label.toLowerCase();
          const href = toSiteRoot(network.build(pageUrl, shareText));
          return {
            key,
            label: network.label,
            Icon: SOCIAL_ICONS[key],
            color: BRAND_COLORS[key],
            href,
            opensNewTab: true,
          };
        })
  ).filter((item): item is NonNullable<typeof item> => item !== null);

  if (!items.length) return null;

  return (
    <div className={className}>
      {heading && (
        <p className="text-sm pl-4 font-bold uppercase tracking-wide text-[#0b3158]">
          {heading}
        </p>
      )}
      <ul className={`flex pl-4 pb-4 flex-wrap items-center gap-2 ${heading ? "mt-3" : ""}`}>
        {items.map(({ key, label, Icon, color, href, opensNewTab }) => (
          <li key={key}>
            <a
              href={href}
              target={opensNewTab ? "_blank" : undefined}
              rel="noreferrer noopener"
              aria-label={`${ariaPrefix} on ${label}`}
              title={label}
              className="swp flex h-9 w-9 items-center justify-center rounded-full text-white"
              style={{ "--swp-color": color } as React.CSSProperties}
            >
              <Icon className="h-4 w-4" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}