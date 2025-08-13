import { HeroSection } from "../components/sections/HeroSection";
import { BrandStorySection } from "../components/sections/BrandStorySection";
import { SalonShowcaseSection } from "../components/sections/SalonShowcaseSection";
import { RealWeddingStoriesSection } from "../components/sections/RealWeddingStoriesSection";
import { CTASection } from "../components/sections/CTASection";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <BrandStorySection />
      <SalonShowcaseSection />
      <RealWeddingStoriesSection />
      <CTASection />
    </div>
  );
}
