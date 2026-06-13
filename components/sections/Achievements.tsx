import FadeInSection from "@/components/layout/FadeInSection";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionTitle from "@/components/ui/SectionTitle";
import MotionGrid, { MotionGridItem } from "@/components/ui/MotionGrid";
import { achievements } from "@/data/portfolio";

export default function Achievements() {
  return (
    <FadeInSection id="achievements">
      <SectionTitle number="07">Achievements</SectionTitle>
      <MotionGrid className="projects-grid grid-info grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item) => (
          <MotionGridItem key={item.title}>
            <ProjectCard
              title={
                <>
                  <i className="fas fa-trophy card-icon" />
                  {item.title}
                </>
              }
            >
              <p className="card-copy">{item.content}</p>
            </ProjectCard>
          </MotionGridItem>
        ))}
      </MotionGrid>
    </FadeInSection>
  );
}
