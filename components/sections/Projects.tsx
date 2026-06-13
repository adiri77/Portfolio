import FadeInSection from "@/components/layout/FadeInSection";
import SectionTitle from "@/components/ui/SectionTitle";
import SubsectionTitle from "@/components/ui/SubsectionTitle";
import FeaturedProject from "@/components/ui/FeaturedProject";
import OtherProjectCard from "@/components/ui/OtherProjectCard";
import MotionGrid, { MotionGridItem } from "@/components/ui/MotionGrid";
import { projects } from "@/data/portfolio";

const FEATURED_COUNT = 3;
const featuredIcons = ["fa-robot", "fa-brain", "fa-user-tie"];

export default function Projects() {
  const featured = projects.slice(0, FEATURED_COUNT);
  const others = projects.slice(FEATURED_COUNT);

  return (
    <FadeInSection id="projects">
      <SectionTitle number="06">Featured Projects</SectionTitle>

      <div className="featured-list flex flex-col gap-8 md:gap-12 lg:gap-16">
        {featured.map((project, i) => (
          <FeaturedProject
            key={project.title}
            project={project}
            index={i}
            icon={featuredIcons[i] ?? "fa-code"}
            flip={i % 2 === 1}
          />
        ))}
      </div>

      {others.length > 0 ? (
        <div className="other-projects mt-14 sm:mt-16 md:mt-20">
          <SubsectionTitle>Other Noteworthy Projects</SubsectionTitle>
          <MotionGrid className="other-grid mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {others.map((project) => (
              <MotionGridItem key={project.title} className="h-full">
                <OtherProjectCard project={project} />
              </MotionGridItem>
            ))}
          </MotionGrid>
        </div>
      ) : null}
    </FadeInSection>
  );
}
