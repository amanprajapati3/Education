"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  ChevronRight,
  Search,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import BannerPage from "@/app/components/shared/BannerPage";
import SocialLinks from "@/app/components/shared/SocialLinks";
import type {
  EducationBlogArticle,
  EducationBlogDetailPageData,
  EducationBlogPost,
} from "@/data";

type BlogArticleDetailProps = {
  post: EducationBlogPost;
  article: EducationBlogArticle;
  banner: EducationBlogDetailPageData["banner"];
  sidebar: EducationBlogDetailPageData["sidebar"];
  posts: EducationBlogPost[];
  previousPost: EducationBlogPost | null;
  nextPost: EducationBlogPost | null;
};

const HIGHLIGHT_ICONS: LucideIcon[] = [BookOpen, Target, ChartNoAxesColumnIncreasing, Trophy];

export default function BlogArticleDetail({
  post,
  article,
  banner,
  sidebar,
  posts,
  previousPost,
  nextPost,
}: BlogArticleDetailProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = [...new Set(posts.map((item) => item.category))];
  const recentPosts = posts
    .filter((item) => item.slug !== post.slug)
    .filter((item) => !activeCategory || item.category === activeCategory)
    .filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 4);

  return (
    <main className="bg-white">
      <BannerPage
        title={banner.title}
        home={banner.home}
        crumbs={[{ label: "Blog", href: "/blog" }]}
        current={post.title}
        bgImage={banner.bgImage}
      />

      <section className="mx-auto grid max-w-325 grid-cols-1 items-start gap-6 px-4 py-8 sm:px-6 md:gap-8 md:py-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-7">
        <article className="min-w-0">
          <header>
            <h1 className="text-2xl font-bold leading-tight text-[#0b3158] sm:text-3xl md:text-4xl max-w-xl">{post.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-[#17395d]">
              <span className="flex items-center gap-2">
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#e8eff4]">
                  <Image src={article.authorImage} alt={article.author} fill sizes="36px" className="object-cover" />
                </span>
                <span><span className="block font-semibold">By {article.author}</span><span className="block text-sm text-slate-500">{article.authorRole}</span></span>
              </span>
              <span className="inline-flex items-center gap-2 border-l border-slate-200 pl-4"><CalendarDays className="h-4 w-4 text-[#0b5e8e]" />{post.date}</span>
              <span className="inline-flex items-center gap-2 border-l border-slate-200 pl-4"><BookOpen className="h-4 w-4 text-[#0b5e8e]" />{article.readTime}</span>
            </div>
          </header>

          <div className="relative mt-3 sm:aspect-[2.2/1] min-h-48 overflow-hidden rounded-md bg-[#e8eff4]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover"
            />
          </div>

          <blockquote className="mt-3 flex items-center gap-3 rounded-md border-l-[3px] border-[#19c2a1] bg-[#edf6fb] px-4 py-3 text-sm italic leading-6 text-[#0452a0] md:text-base">
            <span className="shrink-0 text-3xl font-extrabold leading-none text-[#19c2a1]">“</span>
            {article.quote}
          </blockquote>

          <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">{article.intro}</p>

          <div className="mt-4 space-y-3">
            {article.sections.map((section, index) => (
              <section key={section.title}>
                <h2 className="text-lg md:text-2xl font-bold leading-6 text-[#0b3158]">
                  <span>{index + 1}. </span><span className="text-[#13a995]">{section.title}</span>
                </h2>
                <p className="mt-1 sm:text-base text-sm leading-5 text-slate-700 md:text-base md:leading-6">{section.text}</p>
                {index === 1 && <Highlights labels={article.highlights} />}
              </section>
            ))}
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600 md:text-base">{article.closing}</p>

          <footer className="mt-5 flex flex-wrap items-center justify-between  gap-3 border-t border-slate-200 pt-4">
            <div className="flex sm:gap-2">
            <p className="text-blue-700 font-semibold mt-2">Share this Article</p>
            
             <SocialLinks
              shareText={post.title}
              fallbackUrl={`/blog/${post.slug}`}
              ariaPrefix="Share this article"
            />
            </div>
            <nav aria-label="Blog post navigation" className="flex items-center gap-4 text-sm font-semibold text-[#0b5e8e]">
              {previousPost ? <Link href={`/blog/${previousPost.slug}`} className="inline-flex items-center gap-1 hover:text-[#078c88]"><ArrowLeft className="h-4 w-4" />Previous Post</Link> : <span className="text-slate-400">Previous Post</span>}
              <span className="h-5 w-px bg-slate-200" />
              {nextPost ? <Link href={`/blog/${nextPost.slug}`} className="inline-flex items-center gap-1 hover:text-[#078c88]">Next Post<ArrowRight className="h-4 w-4" /></Link> : <span className="text-slate-400">Next Post</span>}
            </nav>
          </footer>
        </article>

        <aside className="min-w-0 space-y-3 lg:sticky lg:top-6">
          <section className="rounded-md border border-[#e0eaf2] bg-white p-3">
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-[#0066cc]">{sidebar.searchTitle}</h2>
            <form role="search" onSubmit={(event) => event.preventDefault()} className="mt-2 flex min-h-10 overflow-hidden rounded border border-slate-200 focus-within:border-[#0b9b9a]">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={sidebar.searchPlaceholder}
                aria-label={sidebar.searchTitle}
                className="min-w-0 flex-1 px-3 text-sm text-slate-700 outline-none placeholder:text-slate-500"
              />
              <button type="submit" aria-label="Search blog posts" className="flex w-10 shrink-0 items-center justify-center bg-[#119f9e] text-white transition-colors hover:bg-[#087f80]"><Search className="h-5 w-5" /></button>
            </form>
          </section>

          <section className="rounded-md border border-[#e0eaf2] bg-white p-3">
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-[#0066cc]">{sidebar.categoriesTitle}</h2>
            <div className="mt-2 space-y-1">
              {categories.map((category) => {
                const count = posts.filter((item) => item.category === category).length;
                const selected = activeCategory === category;
                return (
                  <button key={category} type="button" aria-pressed={selected} onClick={() => setActiveCategory(selected ? null : category)} className={`flex min-h-8 w-full items-center justify-between gap-2 rounded px-2 text-left text-sm transition-colors ${selected ? "bg-[#dff5f2] text-[#087f80]" : "text-slate-600 hover:bg-[#f0f6fb]"}`}>
                    <span className="inline-flex min-w-0 items-center gap-2"><ChevronRight className="h-4 w-4 shrink-0 text-[#0b5e8e]" />{category}</span>
                    <span>{count}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-md border border-[#e0eaf2] bg-white p-3">
            <h2 className="border-b border-[#e6edf3] pb-2 text-base md:text-lg lg:text-xl font-bold text-[#0066cc]">{sidebar.recentTitle}</h2>
            <div className="divide-y divide-[#e6edf3]">
              {recentPosts.length ? recentPosts.map((recentPost) => (
                <Link key={recentPost.slug} href={`/blog/${recentPost.slug}`} className="flex min-w-0 gap-3 py-2.5">
                  <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded bg-[#e8eff4]">
                    <Image src={recentPost.image} alt="" fill sizes="80px" className="object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-bold leading-5 text-[#002da8]">{recentPost.title}</span>
                    <span className="mt-1 block text-sm text-slate-700">{recentPost.date}</span>
                  </span>
                </Link>
              )) : <p className="py-3 text-sm text-slate-600">No matching posts found.</p>}
            </div>
          </section>

          <section className="relative isolate md:min-h-56 overflow-hidden rounded-md bg-[#063b67] text-white">
            <Image src={sidebar.promoImage} alt="Edusity student" fill sizes="340px" className="-z-20 object-cover object-center" />
            <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#063b67] via-[#063b67]/90 to-[#063b67]/20" />
            <div className="relative md:max-w-57.5 px-4 py-5">
              <p className="text-sm font-bold uppercase text-[#19c2a1]">{sidebar.promoEyebrow}</p>
              <h2 className="mt-2 text-xl font-bold leading-tight">{sidebar.promoTitle}</h2>
              <p className="mt-2 text-sm leading-5 text-white/90">{sidebar.promoDescription}</p>
              <Link href={sidebar.promoHref} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-[#0b3158] transition-colors hover:bg-[#dff5f2]">
                {sidebar.promoButton}<ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

function Highlights({ labels }: { labels: string[] }) {
  return (
    <div className="mt-3 grid grid-cols-2 divide-x divide-slate-300 rounded-md bg-[#eef6fb] px-2 py-3 sm:grid-cols-4">
      {labels.map((label, index) => {
        const Icon = HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length];
        return (
          <div key={label} className="flex min-h-16 flex-col items-center justify-center gap-1 px-2 text-center text-[#17395d]">
            <Icon className="h-7 w-7 text-[#0355c0]" />
            <span className="text-sm font-semibold leading-5">{label}</span>
          </div>
        );
      })}
    </div>
  );
}