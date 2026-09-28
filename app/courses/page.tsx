import { site } from "@/data";
import Course from "../components/homelayout/Course";
import BannerPage from "../components/shared/BannerPage";

export default function CoursesPage() {
  const banner = site.courses.banner;

  return (
    <>
      <BannerPage
        title={banner.title}
        home={banner.home}
        current={banner.current}
        bgImage={banner.bgImage}
      />
      <Course layout="grid" showHeader={false} pageSize={8} />
    </>
  );
}
