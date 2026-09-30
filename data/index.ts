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
export type EducationCourseDetailPageData = EducationCoursesData["detailPage"];
export type EducationCourseDetail = EducationCourseDetailPageData["courses"][number];

export type EducationStatItem = EducationStatsData["stats"][number];

export type EducationChooseFeatureItem = EducationChooseData["features"][number];

export type EducationTestimonialItem =
  EducationTestimonialData["testimonialItems"][number];
export type EducationTestimonialBannerData = EducationTestimonialData["banner"];

export type EducationCtaButton = EducationCtaBannerData["buttons"][number];

export type EducationBlogPost = EducationBlogData["posts"][number];
export type EducationBlogBannerData = EducationBlogData["banner"];
export type EducationBlogDetailPageData = EducationBlogData["detailPage"];
export type EducationBlogArticle = EducationBlogDetailPageData["articles"][number];

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

export type EducationFacultyData =
  typeof educationData.EducationIndustries.sections.Faculty.variants.EducationFaculty1;
export type EducationFacultyDetailPageData = EducationFacultyData["detailPage"];
export type EducationFacultyProfile = EducationFacultyDetailPageData["profiles"][number];
export type EducationFacultyItem = EducationFacultyData["facultyItems"][number];
export type EducationFacultyBannerData = EducationFacultyData["banner"];
export type EducationFacultyCarousel = EducationFacultyData["carousel"];

export type EducationEventData =
  typeof educationData.EducationIndustries.sections.Event.variants.EducationEvent1;
export type EducationEventItem = EducationEventData["eventItems"][number];
export type EducationEventDate = EducationEventItem["date"];
export type EducationEventBannerData = EducationEventData["banner"];
export type EducationEventCategory = EducationEventData["categories"][number];
export type EducationEventDetailPageData = EducationEventData["detailPage"];
export type EducationEventContactData = EducationEventDetailPageData["contact"];

export type EducationNewsData =
  typeof educationData.EducationIndustries.sections.News.variants.EducationNews1;
export type EducationNewsItem = EducationNewsData["newsItems"][number];
export type EducationNewsDate = EducationNewsItem["date"];
export type EducationNewsBannerData = EducationNewsData["banner"];
export type EducationNewsDetailPageData = EducationNewsData["detailPage"];
export type EducationNewsArticleDetail = EducationNewsDetailPageData["articles"][number];

export type EducationFacilityData =
  typeof educationData.EducationIndustries.sections.Facility.variants.EducationFacility1;
export type EducationFacilityItem = EducationFacilityData["facilityItems"][number];
export type EducationFacilityBannerData = EducationFacilityData["banner"];

/** Lucide icon names the facility cards know how to render. */
export type EducationFacilityIcon =
  | "Users"
  | "Monitor"
  | "BookOpen"
  | "FlaskConical"
  | "Activity"
  | "Utensils"
  | "Home"
  | "Bus";

export type EducationAchievementData =
  typeof educationData.EducationIndustries.sections.Achievement.variants.EducationAchievement1;
export type EducationAchievementBannerData = EducationAchievementData["banner"];
export type EducationAchievementStat = EducationAchievementData["stats"][number];
export type EducationAchievementAward =
  EducationAchievementData["awardsSection"]["awards"][number];
export type EducationAchievementAwardsSectionData =
  EducationAchievementData["awardsSection"];
export type EducationAchievementMilestone =
  EducationAchievementData["journeySection"]["milestones"][number];
export type EducationAchievementJourneySectionData =
  EducationAchievementData["journeySection"];
export type EducationAchievementDifferenceSectionData =
  EducationAchievementData["differenceSection"];

/** Lucide icon names the stats bar knows how to render. */
export type EducationAchievementStatIcon =
  | "GraduationCap"
  | "Users"
  | "Award"
  | "Globe";

/** Lucide icon names the award laurels know how to render. */
export type EducationAchievementAwardIcon =
  | "Trophy"
  | "GraduationCap"
  | "Users"
  | "Globe";

export type EducationProcessData =
  typeof educationData.EducationIndustries.sections.Process.variants.EducationProcess1;
export type EducationProcessBannerData = EducationProcessData["banner"];
export type EducationProcessStep = EducationProcessData["steps"][number];

/** Lucide icon names the process step cards know how to render. */
export type EducationProcessIcon =
  | "BookOpen"
  | "FileEdit"
  | "FileText"
  | "Users"
  | "Mail"
  | "CreditCard";

export type EducationContactData =
  typeof educationData.EducationIndustries.sections.Contact.variants.EducationContact1;
export type EducationContactBannerData = EducationContactData["banner"];
export type EducationContactCard = EducationContactData["getInTouch"]["cards"][number];
export type EducationContactGetInTouchData =
  EducationContactData["getInTouch"];
export type EducationContactFormData = EducationContactData["form"];
export type EducationContactMapInfo = EducationContactData["location"]["mapInfo"];
export type EducationContactLocationData = EducationContactData["location"];

/** Lucide icon names the contact info cards know how to render. */
export type EducationContactIcon = "Phone" | "Mail" | "MapPin" | "Clock";

export type EducationEnquiryData =
  typeof educationData.EducationIndustries.sections.Enquiry.variants.EducationEnquiry1;
export type EducationEnquiryBannerData = EducationEnquiryData["banner"];
export type EducationEnquiryFeature = EducationEnquiryData["getInTouch"]["features"][number];
export type EducationEnquiryGetInTouchData = EducationEnquiryData["getInTouch"];
export type EducationEnquiryFormData = EducationEnquiryData["form"];
export type EducationEnquiryContactCard = EducationEnquiryData["bottomContactCards"][number];

/** Lucide icon names the feature rows know how to render. */
export type EducationEnquiryFeatureIcon = "GraduationCap" | "FileText" | "Users";

/** Lucide icon names the bottom contact banner knows how to render. */
export type EducationEnquiryContactIcon = "Phone" | "Mail" | "MapPin";

export type EducationApplyData =
  typeof educationData.EducationIndustries.sections.Apply.variants.EducationApply1;
export type EducationApplyBannerData = EducationApplyData["banner"];
export type EducationApplyIntroData = EducationApplyData["admissionFormIntro"];
export type EducationApplyFeature = EducationApplyData["admissionFormIntro"]["features"][number];
export type EducationApplyNeedHelpData = EducationApplyData["needHelp"];
export type EducationApplyContact = EducationApplyData["needHelp"]["contacts"][number];
export type EducationApplyFormData = EducationApplyData["form"];
export type EducationApplyFormSections = EducationApplyData["form"]["sections"];

/** Lucide icon names the admission feature cards know how to render. */
export type EducationApplyFeatureIcon =
  | "GraduationCap"
  | "ShieldCheck"
  | "Clock"
  | "Users";

/** Lucide icon names the need-help contact rows know how to render. */
export type EducationApplyContactIcon = "Phone" | "Mail" | "MapPin";

export type EducationFaqData =
  typeof educationData.EducationIndustries.sections.Faq.variants.EducationFaq1;
export type EducationFaqItem = EducationFaqData["faqs"][number];
export type EducationFaqBannerData = EducationFaqData["banner"];
export type EducationFaqSidebarData = EducationFaqData["sidebar"];
export type EducationFaqPromoCard = EducationFaqSidebarData["promoCard"];
export type EducationFaqContactBox = EducationFaqSidebarData["contactBox"];
export type EducationFaqContact = EducationFaqContactBox["contacts"][number];

/** Lucide icon names the contact box knows how to render. */
export type EducationFaqContactIcon = "Phone" | "Mail" | "MapPin";

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
  courseDetailPage: sec.Courses.variants.EducationCourses1.detailPage,
  stats: sec.Stats.variants.EducationStats1,
  choose: sec.Choose.variants.EducationChoose1,
  testimonial: sec.Testimonial.variants.EducationTestimonial1,
  ctaBanner: sec.CtaBanner.variants.EducationCtaBanner1,
  blog: sec.Blog.variants.EducationBlog1,
  thankYou: sec.ThankYou.variants.EducationThankYou1,
  gallery: sec.Gallery.variants.EducationGallery1,
  faculty: sec.Faculty.variants.EducationFaculty1,
  facultyDetailPage: sec.Faculty.variants.EducationFaculty1.detailPage,
  events: sec.Event.variants.EducationEvent1,
  news: sec.News.variants.EducationNews1,
  facility: sec.Facility.variants.EducationFacility1,
  faq: sec.Faq.variants.EducationFaq1,
  achievement: sec.Achievement.variants.EducationAchievement1,
  process: sec.Process.variants.EducationProcess1,
  contact: sec.Contact.variants.EducationContact1,
  enquiry: sec.Enquiry.variants.EducationEnquiry1,
  apply: sec.Apply.variants.EducationApply1,
  legal: legalVariants,
  footer: sec.Footer.variants.EducationFooter1,
  mission: sec.Mission.variants.EducationMission1,
  error: sec.NotFound.variants.EducationNotFound1
};

const courseItems = sec.Courses.variants.EducationCourses1
  .courses as EducationCourseItem[];
const courseDetails = sec.Courses.variants.EducationCourses1
  .detailPage.courses as EducationCourseDetail[];

const blogPosts = sec.Blog.variants.EducationBlog1.posts as EducationBlogPost[];
const blogArticles = sec.Blog.variants.EducationBlog1.detailPage
  .articles as EducationBlogArticle[];

export function getCourseBySlug(slug: string): EducationCourseItem | null {
  const cleanSlug = slug.replace(/^courses\//, "");
  return (
    courseItems.find(
      (course) => course.slug === cleanSlug || course.slug.endsWith(cleanSlug),
    ) || null
  );
}

export function getCourseDetailBySlug(slug: string): EducationCourseDetail | null {
  const cleanSlug = slug.replace(/^courses\//, "");
  return courseDetails.find((course) => course.slug === cleanSlug) || null;
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

export function getBlogArticleBySlug(slug: string): EducationBlogArticle | null {
  const cleanSlug = slug.replace(/^blog\//, "");
  return blogArticles.find((article) => article.slug === cleanSlug) || null;
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

const facultyItems = sec.Faculty.variants.EducationFaculty1
  .facultyItems as EducationFacultyItem[];
const facultyProfiles = sec.Faculty.variants.EducationFaculty1
  .detailPage.profiles as EducationFacultyProfile[];

export function getFacultyMembers(): EducationFacultyItem[] {
  return facultyItems;
}

export function getFacultyMemberBySlug(
  slug: string,
): EducationFacultyItem | null {
  const cleanSlug = slug.replace(/^faculty\//, "");
  return (
    facultyItems.find(
      (member) => member.slug === cleanSlug || member.slug.endsWith(cleanSlug),
    ) || null
  );
}

export function getFacultyProfileBySlug(slug: string): EducationFacultyProfile | null {
  const cleanSlug = slug.replace(/^faculty\//, "");
  return facultyProfiles.find((profile) => profile.slug === cleanSlug) || null;
}

export function getFacultyMemberSlugs(): EducationFacultyItem[] {
  return facultyItems;
}

const eventItems = sec.Event.variants.EducationEvent1
  .eventItems as EducationEventItem[];

const eventCategories = sec.Event.variants.EducationEvent1
  .categories as EducationEventCategory[];

/**
 * Month abbreviations used by the event/news badges. They are not all real
 * calendar months ("MAI" instead of "MAY"), so tokens are mapped by hand and
 * unknown values fall back to January.
 */
const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAI",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

/** Maps a badge month token to a 1-based month number. Accepts "MAR" / "MAR 2026". */
function toMonthNumber(month: string): number {
  const index = MONTHS.indexOf(
    month.trim().toUpperCase().slice(0, 3) as (typeof MONTHS)[number],
  );
  return index === -1 ? 1 : index + 1;
}

/** Builds a sortable timestamp from the split badge fields used across the data. */
function toTimestamp(year: string, month: string, day: string): number {
  return Date.parse(
    `${year}-${String(toMonthNumber(month)).padStart(2, "0")}-${day}T00:00:00Z`,
  );
}

/** Sorts by the two date components used across the data, returning a copy. */
function sortByDate<T>(
  items: T[],
  getDate: (item: T) => { day: string; month: string; year?: string },
  direction: "asc" | "desc",
): T[] {
  const factor = direction === "asc" ? 1 : -1;
  return [...items].sort((a, b) => {
    const first = getDate(a);
    const second = getDate(b);
    return (
      factor *
      (toTimestamp(first.year ?? "1970", first.month, first.day) -
        toTimestamp(second.year ?? "1970", second.month, second.day))
    );
  });
}

export function getEventItems(): EducationEventItem[] {
  return eventItems;
}

export function getEventCategories(): EducationEventCategory[] {
  return eventCategories;
}

export function getEventBySlug(slug: string): EducationEventItem | null {
  const cleanSlug = slug.replace(/^events\//, "");
  return (
    eventItems.find(
      (item) => item.slug === cleanSlug || item.slug.endsWith(cleanSlug),
    ) || null
  );
}

export function getEventItemSlugs(): EducationEventItem[] {
  return eventItems;
}

/** Pass `"All Events"` (or omit it) to get every event back. */
export function getEventItemsByCategory(
  category: EducationEventCategory = "All Events",
): EducationEventItem[] {
  if (category === "All Events") {
    return eventItems;
  }
  return eventItems.filter((item) => item.category === category);
}

/** Sorts by event date, earliest first by default. */
export function getEventItemsSorted(
  direction: "asc" | "desc" = "asc",
): EducationEventItem[] {
  return sortByDate(eventItems, (item) => item.date, direction);
}

const newsItems = sec.News.variants.EducationNews1.newsItems as EducationNewsItem[];
const newsArticleDetails = sec.News.variants.EducationNews1.detailPage
  .articles as EducationNewsArticleDetail[];

export function getNewsItems(): EducationNewsItem[] {
  return newsItems;
}

export function getNewsArticleDetailBySlug(
  slug: string,
): EducationNewsArticleDetail | null {
  const cleanSlug = slug.replace(/^news\//, "");
  return newsArticleDetails.find((article) => article.slug === cleanSlug) || null;
}

export function getNewsBySlug(slug: string): EducationNewsItem | null {
  const cleanSlug = slug.replace(/^news\//, "");
  return (
    newsItems.find(
      (item) => item.slug === cleanSlug || item.slug.endsWith(cleanSlug),
    ) || null
  );
}

export function getNewsItemSlugs(): EducationNewsItem[] {
  return newsItems;
}

/**
 * The news payload has no `categories` array, so the distinct tags are derived
 * from the items themselves, ordered newest category first.
 */
export function getNewsCategories(): string[] {
  return [...new Set(newsItems.map((item) => item.category))];
}

export function getNewsItemsByCategory(category: string): EducationNewsItem[] {
  return newsItems.filter((item) => item.category === category);
}

/**
 * News badges store the year inside the month field (`"MAR 2026"`) instead of a
 * separate `year` key, so it is lifted back out before sorting.
 */
export function getNewsItemsSorted(
  direction: "asc" | "desc" = "desc",
): EducationNewsItem[] {
  return sortByDate(
    newsItems,
    (item) => ({
      day: item.date.day,
      month: item.date.month,
      year: item.date.month.match(/\d{4}/)?.[0],
    }),
    direction,
  );
}

const facilityItems = sec.Facility.variants.EducationFacility1
  .facilityItems as EducationFacilityItem[];

export function getFacilityItems(): EducationFacilityItem[] {
  return facilityItems;
}

export function getFacilityBySlug(
  slug: string,
): EducationFacilityItem | null {
  const cleanSlug = slug.replace(/^facility\//, "");
  return (
    facilityItems.find(
      (item) => item.slug === cleanSlug || item.slug.endsWith(cleanSlug),
    ) || null
  );
}

export function getFacilityItemSlugs(): EducationFacilityItem[] {
  return facilityItems;
}

/** Distinct icon names in use, so a card list can be grouped by facility type. */
export function getFacilityIcons(): string[] {
  return [...new Set(facilityItems.map((item) => item.icon))];
}

const faqItems = sec.Faq.variants.EducationFaq1.faqs as EducationFaqItem[];

const faqSidebar = sec.Faq.variants.EducationFaq1
  .sidebar as EducationFaqSidebarData;

export function getFaqItems(): EducationFaqItem[] {
  return faqItems;
}

/** FAQ entries have no slug, so the numeric `id` is the lookup key. */
export function getFaqById(id: number): EducationFaqItem | null {
  return faqItems.find((item) => item.id === id) || null;
}

export function getFaqByQuestion(question: string): EducationFaqItem | null {
  const clean = question.trim().toLowerCase();
  return (
    faqItems.find((item) => item.question.toLowerCase() === clean) || null
  );
}

export function getFaqSidebar(): EducationFaqSidebarData {
  return faqSidebar;
}

export function getFaqContacts(): EducationFaqContact[] {
  return faqSidebar.contactBox.contacts;
}

const achievementStats = sec.Achievement.variants.EducationAchievement1
  .stats as EducationAchievementStat[];

const achievementAwards = sec.Achievement.variants.EducationAchievement1
  .awardsSection.awards as EducationAchievementAward[];

const achievementMilestones = sec.Achievement.variants.EducationAchievement1
  .journeySection.milestones as EducationAchievementMilestone[];

export function getAchievementStats(): EducationAchievementStat[] {
  return achievementStats;
}

export function getAchievementAwards(): EducationAchievementAward[] {
  return achievementAwards;
}

/** Awards have no slug, so the numeric `id` is the lookup key. */
export function getAchievementAwardById(
  id: number,
): EducationAchievementAward | null {
  return achievementAwards.find((award) => award.id === id) || null;
}

/** Milestones have no slug, so the `year` is the lookup key. */
export function getAchievementMilestoneByYear(
  year: string,
): EducationAchievementMilestone | null {
  return achievementMilestones.find((item) => item.year === year) || null;
}

export function getAchievementMilestones(): EducationAchievementMilestone[] {
  return achievementMilestones;
}

/** Orders the timeline oldest first by default, since the years are `YYYY`. */
export function getAchievementMilestonesSorted(
  direction: "asc" | "desc" = "asc",
): EducationAchievementMilestone[] {
  const factor = direction === "asc" ? 1 : -1;
  return [...achievementMilestones].sort(
    (a, b) => factor * a.year.localeCompare(b.year),
  );
}

export function getAchievementYears(): string[] {
  return [...new Set(achievementMilestones.map((item) => item.year))];
}

const processSteps = sec.Process.variants.EducationProcess1
  .steps as EducationProcessStep[];

export function getProcessSteps(): EducationProcessStep[] {
  return processSteps;
}

/** Steps have no slug, so the numeric `id` is the lookup key. */
export function getProcessStepById(id: number): EducationProcessStep | null {
  return processSteps.find((step) => step.id === id) || null;
}

/** Steps have no slug, so the zero-padded `number` badge is the lookup key. */
export function getProcessStepByNumber(
  number: string,
): EducationProcessStep | null {
  const clean = number.trim();
  return processSteps.find((step) => step.number === clean) || null;
}

export function getProcessStepSlugs(): EducationProcessStep[] {
  return processSteps;
}

/** Orders the steps by their numeric `id`, so `"01"` → `"02"` → `"03"`. */
export function getProcessStepsSorted(
  direction: "asc" | "desc" = "asc",
): EducationProcessStep[] {
  const factor = direction === "asc" ? 1 : -1;
  return [...processSteps].sort((a, b) => factor * (a.id - b.id));
}

/** Distinct icon names in use, in first-seen order. */
export function getProcessIcons(): string[] {
  return [...new Set(processSteps.map((step) => step.icon))];
}

/** Only the steps that carry a call-to-action, for rendering the CTA links. */
export function getProcessStepsWithLink(): EducationProcessStep[] {
  return processSteps.filter((step) => Boolean(step.linkText && step.linkUrl));
}

const contactCards = sec.Contact.variants.EducationContact1.getInTouch
  .cards as EducationContactCard[];

const contactMapInfo = sec.Contact.variants.EducationContact1
  .location.mapInfo as EducationContactMapInfo;

export function getContactCards(): EducationContactCard[] {
  return contactCards;
}

/** Cards have no slug, so the numeric `id` is the lookup key. */
export function getContactCardById(id: number): EducationContactCard | null {
  return contactCards.find((card) => card.id === id) || null;
}

/** Distinct icon names in use, so the cards can be grouped by contact type. */
export function getContactIcons(): string[] {
  return [...new Set(contactCards.map((card) => card.icon))];
}

export function getContactMapInfo(): EducationContactMapInfo {
  return contactMapInfo;
}

/** The first card carrying the given icon, for pulling out phone/email/address. */
export function getContactCardByIcon(
  icon: EducationContactIcon,
): EducationContactCard | null {
  return contactCards.find((card) => card.icon === icon) || null;
}

const enquiryFeatures = sec.Enquiry.variants.EducationEnquiry1.getInTouch
  .features as EducationEnquiryFeature[];

const enquiryContactCards = sec.Enquiry.variants.EducationEnquiry1
  .bottomContactCards as EducationEnquiryContactCard[];

export function getEnquiryFeatures(): EducationEnquiryFeature[] {
  return enquiryFeatures;
}

/** Features have no slug, so the numeric `id` is the lookup key. */
export function getEnquiryFeatureById(id: number): EducationEnquiryFeature | null {
  return enquiryFeatures.find((feature) => feature.id === id) || null;
}

export function getEnquiryContactCards(): EducationEnquiryContactCard[] {
  return enquiryContactCards;
}

/** Cards have no slug, so the numeric `id` is the lookup key. */
export function getEnquiryContactCardById(
  id: number,
): EducationEnquiryContactCard | null {
  return enquiryContactCards.find((card) => card.id === id) || null;
}

/** The card carrying the given icon, for pulling out phone/email/address. */
export function getEnquiryContactCardByIcon(
  icon: EducationEnquiryContactIcon,
): EducationEnquiryContactCard | null {
  return enquiryContactCards.find((card) => card.icon === icon) || null;
}

const applyFeatures = sec.Apply.variants.EducationApply1.admissionFormIntro
  .features as EducationApplyFeature[];

const applyContacts = sec.Apply.variants.EducationApply1.needHelp
  .contacts as EducationApplyContact[];

export function getApplyFeatures(): EducationApplyFeature[] {
  return applyFeatures;
}

/** Features have no slug, so the numeric `id` is the lookup key. */
export function getApplyFeatureById(id: number): EducationApplyFeature | null {
  return applyFeatures.find((feature) => feature.id === id) || null;
}

export function getApplyContacts(): EducationApplyContact[] {
  return applyContacts;
}

/** Contacts have no slug or id, so the `icon` is the lookup key. */
export function getApplyContactByIcon(
  icon: EducationApplyContactIcon,
): EducationApplyContact | null {
  return applyContacts.find((contact) => contact.icon === icon) || null;
}

/** The form's section headings, in the order the form renders them. */
export function getApplyFormSections(): string[] {
  return Object.values(sec.Apply.variants.EducationApply1.form.sections);
}

export default educationData;