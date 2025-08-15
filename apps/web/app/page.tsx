import { HeroSection } from "@/components/sections/HeroSection"
import { BrandStorySection } from "@/components/sections/BrandStorySection"
import { SalonShowcaseSection } from "@/components/sections/SalonShowcaseSection"
import { RealWeddingStoriesSection } from "@/components/sections/RealWeddingStoriesSection"
import { CTASection } from "@/components/sections/CTASection"
import { SectionWrapper } from "../apps/web/components/layout/SectionWrapper"
import { ScrollAnimation } from "@/components/animations/ScrollAnimation"
import { PageTransition } from "../apps/web/components/animations/PageTransition"

export default function Home() {
  return (
    <PageTransition>
      <div className="w-full">
        <HeroSection />

        <ScrollAnimation animation="slideUp" delay={100}>
          <SectionWrapper>
            <BrandStorySection />
          </SectionWrapper>
        </ScrollAnimation>

        <ScrollAnimation animation="slideLeft" delay={200}>
          <SectionWrapper>
            <div id="salonlar-section">
              <SalonShowcaseSection />
            </div>
          </SectionWrapper>
        </ScrollAnimation>

        <ScrollAnimation animation="slideRight" delay={300}>
          <SectionWrapper>
            <RealWeddingStoriesSection />
          </SectionWrapper>
        </ScrollAnimation>

        <ScrollAnimation animation="scaleIn" delay={400}>
          <SectionWrapper>
            <CTASection />
          </SectionWrapper>
        </ScrollAnimation>
      </div>
    </PageTransition>
  )
}
