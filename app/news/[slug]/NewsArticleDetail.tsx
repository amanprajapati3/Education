"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  Folder,
  GraduationCap,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import BannerPage from "@/app/components/shared/BannerPage";
import SocialLinks from "@/app/components/shared/SocialLinks";
import type {
  EducationNewsArticleDetail,
  EducationNewsBannerData,
  EducationNewsDetailPageData,
  EducationNewsItem,
} from "@/data";

type LatestNewsItem = EducationNewsItem & { image: string };

type NewsArticleDetailProps = {
  news: EducationNewsItem;
  article: EducationNewsArticleDetail;
  banner: EducationNewsBannerData;
  sidebar: EducationNewsDetailPageData["sidebar"];
  latestNews: LatestNewsItem[];
};

const MONTH_NAMES: Record<string, string> = {
  JAN: "January",
  FEB: "February",
  MAR: "March",
  APR: "April",
  MAY: "May",
  JUN: "June",
  JUL: "July",
  AUG: "August",
  SEP: "September",
  OCT: "October",
  NOV: "November",
  DEC: "December",
};

const FEATURE_ICONS: LucideIcon[] = [BookOpen, UsersRound, Building2, GraduationCap];

function formatNewsDate(date: EducationNewsItem["date"]) {
  const [month, year] = date.month.split(" ");
  return `${date.day} ${MONTH_NAMES[month] ?? month} ${year ?? ""}`.trim();
}

export default function NewsArticleDetail({
  news,
  article,
  banner,
  sidebar,
  latestNews,
}: NewsArticleDetailProps) {
  const date = formatNewsDate(news.date);

  return (
    <main className="bg-white">
      <BannerPage
        title={banner.title}
        home={banner.home}
        crumbs={[{ label: "News & Notices", href: "/news" }]}
        current={news.title}
        bgImage={banner.bgImage}
      />

      <section className="mx-auto grid max-w-325 grid-cols-1 items-start gap-6 px-4 py-8 sm:px-6 md:gap-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-7">
        <article className="min-w-0">
          <div className="relative sm:aspect-[2.2/1] min-h-48 overflow-hidden rounded-md bg-[#e8eff4]">
            <Image
              src={article.image}
              alt={news.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover"
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-600">
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#0b5e8e]" />{date}</span>
            <span className="inline-flex items-center gap-2"><Folder className="h-4 w-4 text-[#0b5e8e]" />{news.category}</span>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600 md:text-base">{article.intro}</p>

          <section className="pt-5">
            <SectionHeading>{article.sectionTitle}</SectionHeading>
            <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">{article.sectionText}</p>
            <div className="mt-3 grid grid-cols-2 divide-x divide-y divide-slate-200 border-y border-slate-200 sm:grid-cols-4 sm:divide-y-0">
              {article.features.map((feature, index) => {
                const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
                return (
                  <div key={feature} className="flex min-h-28 flex-col items-center justify-center gap-2 px-2 py-3 text-center">
                    <span className="flex h-12 md:h-16 md:w-16 w-12 items-center justify-center rounded-full bg-[#edf5fb] text-[#0b5e8e]">
                      <Icon className="h-6 md:w-9 md:h-9 w-6" />
                    </span>
                    <span className="text-base font-semibold min-h-10  leading-5 text-[#17395d]">{feature}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="pt-5">
            <SectionHeading>{article.actionTitle}</SectionHeading>
            <ol className="mt-2 space-y-2">
              {article.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-2 text-sm leading-5 text-slate-600 md:text-base">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#119f9e] text-sm font-bold text-white">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="pt-5">
            <SectionHeading>Important Dates</SectionHeading>
            <dl className="mt-2 overflow-hidden rounded-md border border-[#dce8f1] text-sm">
              {article.importantDates.map((item, index) => (
                <div key={item.label} className={`grid grid-cols-1 sm:grid-cols-2 ${index % 2 === 0 ? "bg-[#f0f6fb]" : "bg-white"}`}>
                  <dt className="border-b border-[#dce8f1] px-3 py-2 font-semibold text-[#17395d] sm:border-r">{item.label}</dt>
                  <dd className="border-b border-[#dce8f1] px-3 py-2 text-slate-600">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="mt-5 text-sm leading-6 text-slate-600">For more information, contact the relevant Edusity team or check the latest campus announcements.</p>
        </article>

        <aside className="min-w-0 space-y-3 lg:sticky lg:top-6">
          <section className="rounded-md border border-[#e0eaf2] bg-[#f0f6fb] p-4">
            <h2 className="text-lg md:text-xl font-bold text-[#036bd3]">{sidebar.quickInfoTitle}</h2>
            <dl className="mt-3 space-y-3">
              <InfoRow Icon={CalendarDays} label="Date" value={date} />
              <InfoRow Icon={Folder} label="Category" value={news.category} />
            </dl>
            <div className="mt-4 border-t border-[#dce8f1] pt-3">
              <p className="text-base font-semibold text-[#17395d]">{sidebar.shareTitle}</p>
              <SocialLinks
                className="mt-2"
                shareText={news.title}
                fallbackUrl={`/news/${news.slug}`}
                ariaPrefix="Share this news"
              />
            </div>
          </section>

          <section className="rounded-md bg-linear-to-br from-[#07518e] to-[#078c88] p-4 text-white">
            <h2 className="text-lg md:text-xl font-bold">{sidebar.contactTitle}</h2>
            <p className="mt-2 text-base leading-5 text-white">{sidebar.contactText}</p>
            <Link href={sidebar.contactHref} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-bold text-[#07518e] transition-colors hover:bg-[#e7f5f6]">
              {sidebar.contactButton}<ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <section className="overflow-hidden rounded-md border border-[#e0eaf2] bg-white">
            <h2 className="border-b border-[#e6edf3] px-4 py-3 text-lg md:text-xl font-bold text-[#0559ad]">{sidebar.latestTitle}</h2>
            <div className="divide-y divide-[#e6edf3] px-3">
              {latestNews.map((item) => (
                <Link key={item.slug} href={`/news/${item.slug}`} className="flex min-w-0 gap-3 py-3 transition-colors hover:text-[#087c87]">
                  <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded bg-[#e8eff4]">
                    <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm md:text-base font-bold leading-5 text-[#0059b8]">{item.title}</span>
                    <span className="mt-1 flex items-center gap-1 text-sm text-slate-500"><CalendarDays className="h-3.5 w-3.5" />{formatNewsDate(item.date)}</span>
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/news" className="mx-3 mb-3 flex min-h-10 items-center justify-center gap-2 rounded bg-[#edf5fb] px-3 text-sm font-bold text-[#17395d] transition-colors hover:bg-[#dceefa]">
              {sidebar.viewAllLabel}<ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </aside>
      </section>
    </main>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-bold text-[#0b3158] md:text-xl">
      <span className="h-0.5 w-7 shrink-0 bg-[#19c2a1]" />
      {children}
    </h2>
  );
}

function InfoRow({ Icon, label, value }: { Icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-[#0b5e8e]" />
      <div>
        <dt className="text-sm font-semibold text-[#0955a7]">{label}</dt>
        <dd className="text-sm leading-5 text-slate-800">{value}</dd>
      </div>
    </div>
  );
}