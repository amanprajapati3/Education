import { site } from "@/data";
import AboutSection from "../../homelayout/AboutSection";
import BannerPage from "../../shared/BannerPage";
import Stats from "../../homelayout/Stats";
import Choose from "../../homelayout/Choose";

export default function About() {
  const banner = site.about.banner;

  return (
    <>
      <BannerPage
        title={banner.title}
        home={banner.home}
        current={banner.current}
        bgImage={banner.bgImage}
      />
      <AboutSection
        showAllParagraphs
        showFeatures={false}
        showButton={false}
        showPhoneBlock={false}
      />
      <Stats/>
      <Choose/>
    </>
  );
}
