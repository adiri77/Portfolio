import FadeInSection from "@/components/layout/FadeInSection";
import BulletList from "@/components/ui/BulletList";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectLinks from "@/components/ui/ProjectLinks";
import SectionTitle from "@/components/ui/SectionTitle";
import MotionGrid, { MotionGridItem } from "@/components/ui/MotionGrid";
import { projects } from "@/data/portfolio";

export default function Projects() {
  return (
    <FadeInSection id="projects">
      <SectionTitle>Featured Projects</SectionTitle>
      <MotionGrid className="projects-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:gap-8">
        {projects.map((project) => (
          <MotionGridItem key={project.title} className="h-full">
            <ProjectCard title={project.title} subtitle={project.tech}>
              <BulletList items={project.bullets} className="content-list project-list" />
              {project.links.length > 0 ? <ProjectLinks links={project.links} /> : null}
            </ProjectCard>
          </MotionGridItem>
        ))}
      </MotionGrid>
    </FadeInSection>
  );
}
