import AboutSection from "../../homelayout/AboutSection";
import Banner from "../../homelayout/Banner";
import BlogSection from "../../homelayout/BlogSection";
import Choose from "../../homelayout/Choose";
import Course from "../../homelayout/Course";
import JourneySection from "../../homelayout/JourneySection";
import Stats from "../../homelayout/Stats";
import TestimonialSection from "../../homelayout/TestimonialSection";

export default function HomeSection(){
    return(
        <>
        <Banner/>
        <AboutSection/>
        <Course/>
        <Stats/>
        <Choose/>
        <TestimonialSection/>
        <JourneySection/>
        <BlogSection/>
        </>
    )
}