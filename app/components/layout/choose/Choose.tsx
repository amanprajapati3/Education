import Choose from "../../homelayout/Choose";
import Stats from "../../homelayout/Stats";
import BannerPage from "../../shared/BannerPage";
import { site } from "@/data";

export default function ChoosePage() {
  const banner = site.choose.banner;
  return (
    <>
      <BannerPage
        title={banner.title}
        home={banner.home}
        current={banner.current}
        bgImage={banner.bgImage}
      />
      <Choose/>
      <Stats/>
    </>
  );
}
