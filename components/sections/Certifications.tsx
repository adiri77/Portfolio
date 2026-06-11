import FadeInSection from "@/components/layout/FadeInSection";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectLinks from "@/components/ui/ProjectLinks";
import SectionTitle from "@/components/ui/SectionTitle";
import MotionGrid, { MotionGridItem } from "@/components/ui/MotionGrid";
import { certifications } from "@/data/portfolio";

export default function Certifications() {
  return (
    <FadeInSection id="certifications">
      <SectionTitle>Certifications &amp; Awards</SectionTitle>
      <MotionGrid className="projects-grid grid-certifications grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {certifications.map((cert) => (
          <MotionGridItem key={cert.title} className="h-full">
            <ProjectCard title={cert.title} subtitle={cert.subtitle}>
              <p className="card-copy">{cert.description}</p>
              {cert.links?.length ? <ProjectLinks links={cert.links} /> : null}
            </ProjectCard>
          </MotionGridItem>
        ))}
      </MotionGrid>
    </FadeInSection>
  );
}
