import FadeInSection from "@/components/layout/FadeInSection";
import BulletList from "@/components/ui/BulletList";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionTitle from "@/components/ui/SectionTitle";
import MotionGrid, { MotionGridItem } from "@/components/ui/MotionGrid";
import { experiences } from "@/data/portfolio";

export default function Experience() {
  return (
    <FadeInSection id="experience">
      <SectionTitle>Experience</SectionTitle>
      <MotionGrid className="projects-grid grid-single grid grid-cols-1 gap-5 md:gap-6">
        {experiences.map((exp) => (
          <MotionGridItem key={`${exp.company}-${exp.period}`}>
            <ProjectCard title={exp.role} subtitle={`${exp.company} | ${exp.period}`}>
              <BulletList items={exp.bullets} className="content-list experience-list" />
            </ProjectCard>
          </MotionGridItem>
        ))}
      </MotionGrid>
    </FadeInSection>
  );
}
