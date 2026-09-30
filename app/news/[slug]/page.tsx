import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getNewsArticleDetailBySlug,
  getNewsBySlug,
  getNewsItems,
  getNewsItemsSorted,
  site,
} from "@/data";
import NewsArticleDetail from "./NewsArticleDetail";

type NewsPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getNewsItems().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = getNewsBySlug(slug);
  const article = getNewsArticleDetailBySlug(slug);

  return {
    title: news ? `${news.title} | Edusity News` : "News Details | Edusity",
    description: article?.intro ?? news?.desc,
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);
  const article = getNewsArticleDetailBySlug(slug);

  if (!news || !article) notFound();

  const latestNews = getNewsItemsSorted("desc")
    .filter((item) => item.slug !== news.slug)
    .slice(0, 5)
    .map((item) => ({
      ...item,
      image: getNewsArticleDetailBySlug(item.slug)?.image ?? "/education/3.png",
    }));

  return (
    <NewsArticleDetail
      news={news}
      article={article}
      banner={site.news.banner}
      sidebar={site.news.detailPage.sidebar}
      latestNews={latestNews}
    />
  );
}