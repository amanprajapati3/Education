import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCourseBySlug,
  getCourseDetailBySlug,
  getCourses,
  site,
} from "@/data";
import CourseDetail from "./CourseDetail";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  return {
    title: course ? `${course.title} | Edusity` : "Course Details | Edusity",
    description: course?.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  const detail = getCourseDetailBySlug(slug);

  if (!course || !detail) notFound();

  const detailPage = site.courseDetailPage;

  return (
    <CourseDetail
      course={course}
      detail={detail}
      banner={detailPage.banner}
      instructor={detailPage.instructor}
      includes={detailPage.includes}
      help={detailPage.help}
      promo={detailPage.promo}
    />
  );
}