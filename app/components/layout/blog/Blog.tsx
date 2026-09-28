import { site } from "@/data";
import BlogSection from "../../homelayout/BlogSection";
import BannerPage from "../../shared/BannerPage";

export default function Blog() {
  const banner = site.blog.banner;

  return (
    <>
      <BannerPage
        title={banner.title}
        home={banner.home}
        current={banner.current}
        bgImage={banner.bgImage}
      />
      <BlogSection limit={site.blog.posts.length} />
    </>
  );
}
