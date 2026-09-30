import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogArticleBySlug,
  getBlogPostBySlug,
  getBlogPostSlugs,
  site,
} from "@/data";
import BlogArticleDetail from "./BlogArticleDetail";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPostSlugs().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const article = getBlogArticleBySlug(slug);

  return {
    title: post ? `${post.title} | Edusity Blog` : "Blog Details | Edusity",
    description: article?.intro ?? post?.description,
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const article = getBlogArticleBySlug(slug);

  if (!post || !article) notFound();

  const posts = getBlogPostSlugs();
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);

  return (
    <BlogArticleDetail
      post={post}
      article={article}
      banner={site.blog.detailPage.banner}
      sidebar={site.blog.detailPage.sidebar}
      posts={posts}
      previousPost={posts[currentIndex + 1] ?? null}
      nextPost={currentIndex > 0 ? posts[currentIndex - 1] : null}
    />
  );
}