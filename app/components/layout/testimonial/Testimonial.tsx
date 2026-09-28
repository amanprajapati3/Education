import { site } from "@/data";
import TestimonialSection from "../../homelayout/TestimonialSection";
import BannerPage from "../../shared/BannerPage";

export default function Testimonial() {
  const banner = site.testimonial.banner;

  return (
    <>
      <BannerPage
        title={banner.title}
        home={banner.home}
        current={banner.current}
        bgImage={banner.bgImage}
      />
      <TestimonialSection layout="centered" showButton={false} showArrows={false} />
    </>
  );
}
