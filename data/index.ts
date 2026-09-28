import educationData from "./siteData.json";

export type RawEducationData = typeof educationData;

export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

export type EducationTopbarData =
  typeof educationData.EducationIndustries.sections.Topbar.variants.EducationTopbar1;
export type EducationHeaderData =
  typeof educationData.EducationIndustries.sections.Header.variants.EducationHeader1;
export type EducationBannerData =
  typeof educationData.EducationIndustries.sections.Banner.variants.EducationBanner1;
export type EducationAboutData =
  typeof educationData.EducationIndustries.sections.About.variants.EducationAbout1;
export type EducationCoursesData =
  typeof educationData.EducationIndustries.sections.Courses.variants.EducationCourses1;
export type EducationStatsData =
  typeof educationData.EducationIndustries.sections.Stats.variants.EducationStats1;
export type EducationChooseData =
  typeof educationData.EducationIndustries.sections.Choose.variants.EducationChoose1;
export type EducationTestimonialData =
  typeof educationData.EducationIndustries.sections.Testimonial.variants.EducationTestimonial1;
export type EducationCtaBannerData =
  typeof educationData.EducationIndustries.sections.CtaBanner.variants.EducationCtaBanner1;
export type EducationBlogData =
  typeof educationData.EducationIndustries.sections.Blog.variants.EducationBlog1;
export type EducationFooterData =
  typeof educationData.EducationIndustries.sections.Footer.variants.EducationFooter1;

export type EducationHeaderNavChild = {
  label: string;
  href: string;
};

export type EducationHeaderNavItem = {
  label: string;
  href: string;
  children?: EducationHeaderNavChild[];
};
export type EducationHeaderButton = EducationHeaderData["buttons"][number];

export type EducationBannerStat = EducationBannerData["stats"][number];
export type EducationBannerButton = EducationBannerData["buttons"][number];

export type EducationAboutFeatureItem = EducationAboutData["features"][number];
export type EducationAboutBannerData = EducationAboutData["banner"];

export type EducationCourseItem = EducationCoursesData["courses"][number];

export type EducationStatItem = EducationStatsData["stats"][number];

export type EducationChooseFeatureItem = EducationChooseData["features"][number];

export type EducationTestimonialItem =
  EducationTestimonialData["testimonialItems"][number];
export type EducationTestimonialBannerData = EducationTestimonialData["banner"];

export type EducationCtaButton = EducationCtaBannerData["buttons"][number];

export type EducationBlogPost = EducationBlogData["posts"][number];
export type EducationBlogBannerData = EducationBlogData["banner"];

export type EducationThankYouData =
  typeof educationData.EducationIndustries.sections.ThankYou.variants.EducationThankYou1;
export type EducationGalleryData =
  typeof educationData.EducationIndustries.sections.Gallery.variants.EducationGallery1;

export type EducationGalleryFilter = EducationGalleryData["imageGallery"]["filters"][number];
export type EducationGallerySortOption =
  EducationGalleryData["videoGallery"]["sortOptions"][number];
export type EducationGalleryImageItem = EducationGalleryData["images"][number];
export type EducationGalleryVideoItem = EducationGalleryData["videos"][number];
export type EducationGalleryControls = EducationGalleryData["controls"];

const legalVariants = educationData.EducationIndustries.sections.Legal.variants;

export type EducationLegalVariantKey = keyof typeof legalVariants;
export type EducationLegalData = (typeof legalVariants)[EducationLegalVariantKey];
export type EducationLegalPoint = EducationLegalData["points"][number];

export type EducationFooterColumn = EducationFooterData["columns"][number];
export type EducationFooterLink = EducationFooterColumn["links"][number];
export type EducationLegalLink = EducationFooterData["legalLinks"][number];
export type EducationFooterHour = EducationFooterData["footerContact"]["hours"][number];

const sec = educationData.EducationIndustries.sections;

export const site = {
  topbar: sec.Topbar.variants.EducationTopbar1,
  header: sec.Header.variants.EducationHeader1,
  banner: sec.Banner.variants.EducationBanner1,
  about: sec.About.variants.EducationAbout1,
  courses: sec.Courses.variants.EducationCourses1,
  stats: sec.Stats.variants.EducationStats1,
  choose: sec.Choose.variants.EducationChoose1,
  testimonial: sec.Testimonial.variants.EducationTestimonial1,
  ctaBanner: sec.CtaBanner.variants.EducationCtaBanner1,
  blog: sec.Blog.variants.EducationBlog1,
  thankYou: sec.ThankYou.variants.EducationThankYou1,
  gallery: sec.Gallery.variants.EducationGallery1,
  legal: legalVariants,
  footer: sec.Footer.variants.EducationFooter1,
  mission: sec.Mission.variants.EducationMission1,
  error: sec.NotFound.variants.EducationNotFound1
};

const courseItems = sec.Courses.variants.EducationCourses1
  .courses as EducationCourseItem[];

const blogPosts = sec.Blog.variants.EducationBlog1.posts as EducationBlogPost[];

export function getCourseBySlug(slug: string): EducationCourseItem | null {
  const cleanSlug = slug.replace(/^courses\//, "");
  return (
    courseItems.find(
      (course) => course.slug === cleanSlug || course.slug.endsWith(cleanSlug),
    ) || null
  );
}

export function getCourses(): EducationCourseItem[] {
  return courseItems;
}

export function getBlogPostBySlug(slug: string): EducationBlogPost | null {
  const cleanSlug = slug.replace(/^blog\//, "");
  return (
    blogPosts.find(
      (post) => post.slug === cleanSlug || post.slug.endsWith(cleanSlug),
    ) || null
  );
}

export function getBlogPostSlugs(): EducationBlogPost[] {
  return blogPosts;
}

const galleryImages = sec.Gallery.variants.EducationGallery1
  .images as EducationGalleryImageItem[];

const galleryVideos = sec.Gallery.variants.EducationGallery1
  .videos as EducationGalleryVideoItem[];

export function getGalleryImages(): EducationGalleryImageItem[] {
  return galleryImages;
}

export function getGalleryVideos(): EducationGalleryVideoItem[] {
  return galleryVideos;
}

export function getGalleryFilters(): EducationGalleryFilter[] {
  return sec.Gallery.variants.EducationGallery1.imageGallery.filters;
}

/** Sorts by the `publishedAt` field already present on every video item. */
export function getGalleryVideosSorted(
  direction: EducationGallerySortOption["id"] = "desc",
): EducationGalleryVideoItem[] {
  const factor = direction === "asc" ? 1 : -1;
  return [...galleryVideos].sort(
    (a, b) => factor * a.publishedAt.localeCompare(b.publishedAt),
  );
}

export default educationData;