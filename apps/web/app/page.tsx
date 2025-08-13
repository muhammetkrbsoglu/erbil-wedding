import { HeroSection } from "./_components/HeroSection";
import { BrandStorySection } from "../components/sections/BrandStorySection";
import { SalonShowcaseSection } from "../components/sections/SalonShowcaseSection";
import { RealWeddingStoriesSection } from "../components/sections/RealWeddingStoriesSection";
import { CTASection } from "../components/sections/CTASection";
import { SectionWrapper } from "../components/layout/SectionWrapper";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <SectionWrapper>
        <BrandStorySection />
      </SectionWrapper>
      <SectionWrapper>
        <SalonShowcaseSection />
      </SectionWrapper>
      <SectionWrapper>
        <RealWeddingStoriesSection />
      </SectionWrapper>
      <SectionWrapper>
        <CTASection />
      </SectionWrapper>
    </div>
  );
}
